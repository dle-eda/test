const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  type Participant {
    id: Int
    email: String
    phoneNumber: String
    phoneCountry: String
    firstName: String
    lastName: String
    group: String
  }

  type Group {
    id: Int
    name: String
  }

  type Query {
    participants: [Participant]
    groups: [Group]
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
    participants: () => participants,
    groups: () => groups
  }
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
  console.log(`listening on ${url}`)
})