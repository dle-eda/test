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
    id: Int
    message: String
  }

  type Query {
    participant: [Participant]
    group: [Group]
  }

  type Mutation {
    createParticipant(email: String, phone: Int, country_code: String, first_name: String, last_name: String, group: String): Participant
    updateParticipant(email: String, phone: Int, country_code: String, first_name: String, last_name: String, group: String): Participant
    deleteParticipant(email: String): Response
  }
`

const participants = [
  {
    id: 123,
    email: 'abc@gmail.com',
    phoneNumber: '01234555555',
    phoneCountry: 'vn',
    firstName: 'first Name 1',
    lastName: 'last Name 1',
    group: 'group 1',
  },
  {
    id: 124,
    email: 'def@gmail.com',
    phoneNumber: '0123466666',
    phoneCountry: 'us',
    firstName: 'first Name 2',
    lastName: 'last Name 2',
    group: 'group 2',
  },
  {
    id: 125,
    email: 'ghi@gmail.com',
    phoneNumber: '0123477777',
    phoneCountry: 'us',
    firstName: 'first Name 3',
    lastName: 'last Name 3',
    group: 'group 3',
  }
]

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