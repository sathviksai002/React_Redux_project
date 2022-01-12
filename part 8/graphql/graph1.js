const { ApolloServer, gql } = require('apollo-server-express');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
//var mysql = require('mysql');

var app = express();
var temp_dir = path.join(__dirname, 'templates');

app.use(express.static(temp_dir + '/'));
app.use(bodyParser.urlencoded({extended:true}));

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');
app.set('views', temp_dir);

/*app.get('/home', function(req, res){
    res.render('home.html', {user_name: "Balajee"});
});*/

/* var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydb"
}); */

/*con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table: " + result);
  });
});*/

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
    street: String!
    city: String! 
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons: [Person!]!
    findPerson(name: String!): Person
  }
`

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, args) =>
      persons.find(p => p.name === args.name)
  }
}

var server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

var PORT = 8081;

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:8081${server.graphqlPath}`)
)

console.log('Server running at http://127.0.0.1:8081/');