import { model, Schema, Document } from 'mongoose'

interface InterfaceAuthor extends Document {
    name : string
    age : number
}

const AuthorSchema = new Schema({
    name : { type : String, required : true },
    age : { type : Number, required : true }
})

export default model<InterfaceAuthor>('author', AuthorSchema)