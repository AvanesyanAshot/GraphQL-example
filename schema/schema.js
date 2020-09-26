const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        age: { type: GraphQLInt },
    }),
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {

            },
        },
    }
});

module.exports = new GraphQLSchema({
    query: Query,
});