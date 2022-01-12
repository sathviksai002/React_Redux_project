const { ApolloServer, UserInputError, gql } = require('apollo-server-express');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const { v1: uuid } = require('uuid')

var app = express();
var temp_dir = path.join(__dirname, 'templates');

app.use(express.static(temp_dir + '/'));
app.use(bodyParser.urlencoded({extended:true}));

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');
app.set('views', temp_dir);

let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: '3d599470-3436-11e9-bc57-8b80ba54c431'
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: '3d599471-3436-11e9-bc57-8b80ba54c431'
  },
]

const typeDefs = gql`

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Address {
    street: String!
    city: String! 
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
  }

  enum YesNo {
    YES
    NO
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }
`

const resolvers = {

  Query: {
    personCount: () => persons.length,
    allPersons: (root, args) => {
      if (!args.phone) {
        return persons
      }
      const byPhone = (person) =>
        args.phone === 'YES' ? person.phone : !person.phone
      return persons.filter(byPhone)
    },
    findPerson: (root, args) =>
      persons.find(p => p.name === args.name)
  },

  Person: {
    address: (root) => {
      return { 
        street: root.street,
        city: root.city
      }
    }
  },

  Mutation: {
    addPerson: (root, args) => {

      if (persons.find(p => p.name === args.name)) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.name,
        })
      }

      const person = { ...args, id: uuid() }
      persons = persons.concat(person)
      return person
    }
  }

}

var server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

var PORT = 8081;

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:8081${server.graphqlPath}`)
)

console.log('Server running at http://127.0.0.1:8081/');