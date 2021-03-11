const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  type Participant {
    email: String
    phoneNumber: String
    firstName: String
    lastName: String
    group: String
  }

  type Query {
    participants: [Participant]
  }
`

const participants = [
  {
    email: 'abc@gmail.com',
    phoneNumber: '+841234555555',
    firstName: 'first Name 1',
    lastName: 'last Name 1',
    group: 'group 1',
  },
  {
    email: 'def@gmail.com',
    phoneNumber: '+84123466666',
    firstName: 'first Name 2',
    lastName: 'last Name 2',
    group: 'group 2',
  },
  {
    email: 'ghi@gmail.com',
    phoneNumber: '+84123477777',
    firstName: 'first Name 3',
    lastName: 'last Name 3',
    group: 'group 3',
  }
]

const resolvers = {
  Query: {
    participants: () => participants
  }
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
  console.log(`listiening on ${url}`)
})