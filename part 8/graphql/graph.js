var { find, filter } = require('lodash');
const { ApolloServer, gql } = require('apollo-server-express');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var temp_dir = path.join(__dirname, 'templates');

app.use(express.static(temp_dir + '/'));
app.use(bodyParser.urlencoded({extended:true}));

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');
app.set('views', temp_dir);

const typeDefs = `
    type Query {
        post(id: Int!): Post
                user(id: Int!): User
    },
        type Post {
            id: Int
            user: User
            title: String
            body: String
        },
        type User {
            id: Int
            name: String
            email: String
            posts: [Post]
        },
`;
var postsData = [
    {
    id: 1,
    userId: 1,
    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipitsuscipit recusandae consequuntur expedita et cumreprehenderit molestiae ut ut quas totamnostrum rerum est autem sunt rem eveniet architecto'
  },
  {
    userId: 2,
    id: 2,
    title: 'qui est esse',
    body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
  },
  {
    userId: 1,
    id: 3,
    title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut'
  },
  {
    userId: 2,
    id: 4,
    title: 'eum et est occaecati',
    body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit'
  }
];
var usersData = [
  {
    id: 1,
    name: 'Leanne Graham',
    email: 'Sincere@april.biz'
  },
  {
    id: 2,
    name: 'Ervin Howell',
    email: 'Shanna@melissa.tv'
  }
];
var getPost = function(root, {id}) { 
    return postsData.filter(post => {
        return post.id === id;
    })[0];
};
var getUser = function(root, {id}) {
      return usersData.filter(user => {
          return user.id === id;
    })[0];
};
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    post: getPost,
    user: getUser,
  },
    User: {
    posts: (user) => filter(postsData, { userId: user.id }),
  },
  Post: {
    user: (post) => find(usersData, { id: post.userId }),
  },
};

var server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

var PORT = 8081;

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:8081${server.graphqlPath}`)
)

console.log('Server running at http://127.0.0.1:8081/');