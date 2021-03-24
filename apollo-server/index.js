const { ApolloServer, gql } = require('apollo-server')
const ParticipantsAPI = require('./datasources/participant')
const { createStore } = require('./utils')
const typeDefs = gql`
  type Participant {
    id: Int
    email: String
    phone: String
    country_code: String
    first_name: String
    last_name: String
    group: String
  }

  type Group {
    id: Int
    name: String
  }

  type Response {
    message: String
  }

  type Query {
    participant: [Participant]
    group: [Group]
  }

  type Mutation {
    createParticipant(email: String, phone: Int, country_code: String, first_name: String, last_name: String, group: String): Response
    updateParticipant(id: Int, email: String, phone: Int, country_code: String, first_name: String, last_name: String, group: String): Response
    deleteParticipant(email: String): Response
  }
`

const groups = [
  {
    id: 1,
    name: 'group 1'
  },
  {
    id: 2,
    name: 'group 2'
  },
  {
    id: 3,
    name: 'group 3'
  },
  {
    id: 4,
    name: 'group 4'
  }
]

const resolvers = {
  Query: {
    group: () => groups,
    participant: async (_source, _args, { dataSources }) => {
      return dataSources.participantsAPI.getParticipants()
    }
  },
  Mutation: {
    createParticipant: async (_source, _args, { dataSources }) => {
      return dataSources.participantsAPI.createParticipant(_args)
    },
    updateParticipant: async (_source, _args, { dataSources }) => {
      return dataSources.participantsAPI.updateParticipant(_args)
    },
    deleteParticipant: async (_source, _args, { dataSources }) => {
      return dataSources.participantsAPI.deleteParticipant(_args)
    },
  }
}

const store = createStore()

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  dataSources: () => {
    return {
      participantsAPI: new ParticipantsAPI({ store })
    }
  }
})
server.listen().then(({ url }) => {
  store.testConnection()
  store.synchronize()
  console.log(`listening on ${url}`)
})