import { model, Schema, Document } from 'mongoose'

interface InterfaceBook extends Document {
    name : string
    genre : string
    authorId : string
}

const BookSchema = new Schema({
    name : { type : String, required : true },
    genre : { type : String, required : true },
    authorId : { type : String}
})

export default model<InterfaceBook>('Book', BookSchema)