const axios = require('axios');

const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema } = require('graphql');

// Joe Type
const JokeType = new GraphQLObjectType({
    name: 'Jokes',
    fields: () => ({
        id: { type: GraphQLInt},
        type: { type: GraphQLString},
        setup: { type: GraphQLString },
        punchline: { type: GraphQLString}
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        jokes: {
            type: new GraphQLList(JokeType),
            resolve(parent, args) {
                return axios
                    .get('https://official-joke-api.appspot.com/random_ten')
                    .then(res => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});