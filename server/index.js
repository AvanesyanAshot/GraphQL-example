const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const cors = require('cors')

const app = express()
const PORT = 8000


//middleware
app.use(cors())
app.use(express.json())
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(PORT, err => {
    err ? console.log(err) : console.log(`Server has been started on ${PORT} in ${new Date().toLocaleDateString()}`)
})
