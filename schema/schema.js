const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList, GraphQLSchema } = graphql;

const users = [
    { id: 1, name: 'Leanne Graham', username: 'Bret', age: 25 },
    { id: 2, name: 'Ervin Howell', username: 'Antonette', age: 21 },
    { id: 3, name: 'Clementine Bauch', username: 'Samantha', age: 19 },
    { id: 4, name: 'Chelsey Dietrich', username: 'Kamren', age: 29 },
];

const posts = [
    { id: 1, userId: 1, title: 'totam at voluptas', body: 'Non velit est in distinctio voluptates alias iure. Ut non iste animi at. In dolorum omnis. Ipsam rerum porro iste aliquam.' },
    { id: 2, userId: 2, title: 'rerum dolor ea', body: 'Laborum quis qui nisi. Quos quae qui eos similique. Est quia itaque iste neque sed excepturi in aspernatur. Consequatur numquam quis qui quae sint rerum est aut.' },
    { id: 3, userId: 3, title: 'sit error dolor', body: 'Aut quasi qui. Unde laboriosam suscipit. Sapiente possimus consequatur. Soluta non ullam sint voluptas architecto.' },
    { id: 4, userId: 4, title: 'qui incidunt vitae', body: 'Et veritatis aut perferendis consequuntur natus explicabo dolores minima cum. Et consequuntur repudiandae quibusdam ut omnis architecto sit eum repellendus. Aliquam expedita aut atque dicta. Et qui qui aut dolorum laudantium. Voluptatum itaque vitae sit vitae id. Est non quis qui.' },
    { id: 5, userId: 1, title: 'ut dolor dolores', body: 'Quas est aut voluptates maiores dolores sit. Cumque velit quod aut ut quia excepturi consequatur est soluta. Est magnam quasi aliquid deleniti. Aliquam illo fuga in quia officiis rerum. Tempora hic provident quia distinctio quis veniam quis sit.' },
    { id: 6, userId: 3, title: 'velit doloribus aut', body: 'Distinctio dolorem aut deserunt facere. Sint pariatur consequatur similique animi. Rem et sunt omnis. Error tempore omnis provident temporibus. Architecto dolorem sunt doloremque praesentium itaque.' },
    { id: 7, userId: 3, title: 'sit dignissimos iure', body: 'Aliquid soluta dolores quisquam laboriosam magnam laudantium repellat molestiae neque. Animi praesentium provident sint reprehenderit quidem. Pariatur culpa quasi modi. Id esse iusto magnam mollitia repellat nisi tenetur consequatur. Et qui consectetur rerum et aut debitis excepturi aliquam. Ex voluptatibus at vel ipsam in veritatis commodi.' },
]
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        age: { type: GraphQLInt },
        posts: {
            type: new GraphQLList(PostsType),
            resolve(parent, args) {
                return posts.filter(post => post.userId === parent.id)
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
        user: {
            type: UserType,
            resolve(parent, args) {
                return users.find(user => parent.userId === user.id)
            }
        }
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
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return users;
            }
        },
        posts: {
            type: new GraphQLList(PostsType),
            resolve(parent, args) {
                return posts;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query,
});