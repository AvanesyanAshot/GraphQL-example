const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLSchema } = graphql;

const users = [
    { id: 1, name: 'Leanne Graham', username: 'Bret', age: 25, postId: 1 },
    { id: 2, name: 'Ervin Howell', username: 'Antonette', age: 21, postId: 2 },
    { id: 3, name: 'Clementine Bauch', username: 'Samantha', age: 19, postId: 3 },
    { id: 4, name: 'Chelsey Dietrich', username: 'Kamren', age: 29, postId: 4 },
];

const posts = [
    { id: 1, title: 'totam at voluptas', body: 'Non velit est in distinctio voluptates alias iure. Ut non iste animi at. In dolorum omnis. Ipsam rerum porro iste aliquam.' },
    { id: 2, title: 'rerum dolor ea', body: 'Laborum quis qui nisi. Quos quae qui eos similique. Est quia itaque iste neque sed excepturi in aspernatur. Consequatur numquam quis qui quae sint rerum est aut.' },
    { id: 3, title: 'sit error dolor', body: 'Aut quasi qui. Unde laboriosam suscipit. Sapiente possimus consequatur. Soluta non ullam sint voluptas architecto.' },
    { id: 4, title: 'qui incidunt vitae', body: 'Et veritatis aut perferendis consequuntur natus explicabo dolores minima cum. Et consequuntur repudiandae quibusdam ut omnis architecto sit eum repellendus. Aliquam expedita aut atque dicta. Et qui qui aut dolorum laudantium. Voluptatum itaque vitae sit vitae id. Est non quis qui.' }
]
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        age: { type: GraphQLInt },
        post: {
            type: PostsType,
            resolve(parent, args) {
                return posts.find(post => post.id == parent.id)
            }
        }
    }),
});

const PostsType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLID },
        userId: { type: GraphQLID },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
    }),
});
const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return users.find(user => user.id == args.id)
            },
        },
        post: {
            type: PostsType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return posts.find(post => post.id == args.id)
            },
        },
    }
});

module.exports = new GraphQLSchema({
    query: Query,
});