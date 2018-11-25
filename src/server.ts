import * as express from 'express'
import * as mongoose from 'mongoose'
import * as graphqlHTTP from 'express-graphql'
import * as cors from 'cors'
import * as morgan from 'morgan'

// Import Schema from GraphQL
import schema from './graphql/schema/schema'

class Server {

    public app : express.Application

    constructor() 
    {
        this.app = express()
        this.config()
        this.routes()
    }

    config()
    {
        const MONGOOSE_URI : string = 'mongodb://localhost:27017/graphql'
        mongoose.connect(MONGOOSE_URI || process.env.MONGODB_URI, {useNewUrlParser : true})
        mongoose.connection.once('open', () => console.log('Connected to Database'))

        this.app.use('*', cors())

        this.app.use('/graphql', graphqlHTTP({
            schema,
            graphiql : true
        }))
    }

    routes()
    {

    }
}

export default new Server().app