import { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID, 
    GraphQLInt, 
    GraphQLList,
    GraphQLNonNull
} from 'graphql'
import * as _ from 'lodash'

// import mongodb
import Book from '../../models/BookSchema'
import Author from '../../models/AuthorSchema'

// Dummy Data
/*

const books = [
    { name : 'Name of the Wind', genre : 'Fantasy', id:'1', authodId : '1' },
    { name : 'The Final Empier', genre : 'Fantasy', id:'2', authodId : '2' },
    { name : 'The Long Earth', genre : 'Sci-Fi', id : '3', authodId : '3' },
    { name : 'The Hero of Ages', genre : 'Fantasy', id : '4', authodId : '2' },
    { name : 'The Colour of Magic', genre : 'Fantasy', id : '5', authodId : '3' },
    { name : 'The Light Fantastic', genre : 'Fantasy', id : '6', authodId : '3' }
]

const authors = [
    { name : 'Patrick Rothfuss', age : 44, id : '1' },
    { name : 'Brandon Sanderson', age : 42, id : '2' },
    { name : 'Terry Pratchett', age : 66, id : '3' }
] 

*/

/**
 * BookType : Nama variabel membuat schema 
 * GraphQLObjectType : berfungsi untuk menentukan type type dari field yang akan ditentukan
 * author disini dia akan merelasikan antara book dengan author dimana type dia akan memakai AuthorType
 * lalu direlove untuk mencocokan authodId dibuku dengan id author di Authors
 */
const BookType = new GraphQLObjectType({
    name : 'Book',
    fields : () => ({
        id : { type : GraphQLID },
        name : { type : GraphQLString },
        genre : { type : GraphQLString },
        author : {
            type : AuthorType,
            resolve(parent, args)
            {
                // console.log(parent)
                // const data = authors.find(author => author.id === parent.authodId)
                // return data
                return Author.findById(parent.authorId)
            },
        }
    })
})

/**
 * @AuthorType : nama variabel untuk mencatat schema apa aja yang akan diambil oleh GraphQL
 * @fields : field field yang akan ditampilkan dalam GraphQL
 * @name : nama dari schema itu sendiri
 * @books disana dia akan menampilkan buku yang authorId nya sama dengan id dari schema Author itu sendiri
 */

const AuthorType = new GraphQLObjectType({
    name : 'Author',
    fields : () => ({
        id : { type : GraphQLID },
        name : { type : GraphQLString },
        age : { type : GraphQLInt },
        books : {
            type : new GraphQLList(BookType),
            resolve(parent, args)
            {
                // const data = books.filter(book => book.authodId === parent.id)
                // return data
                return Book.find({authorId : parent.id})
            }
        }
    })
})

/**
 * @RootQuery Berfungsi untuk mengambil data yang sebagai schema sebelumnya
 * @type : mengambil schema yang akan ditampilkan disini contohnya seperti BookType
 * @args : argument yang akan dipassing kedalam BookType contoh Book(id:123)
 * @resolve : untuk menghubungkan kedalam database atau mengambil datanya kedalam database
 */

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        book : {
            type : BookType,
            args : { id : { type : GraphQLID } },
            resolve(parent, args)
            {
                //code to get data from db
                // return _.find(books, { id : args.id })
                //const data = books.find(book => book.id === args.id)
                //return data
                return Book.findById(args.id)
            }
        },
        author : {
            type : AuthorType,
            args : { id : { type : GraphQLID } },
            resolve(parent, args)
            {
                //const data = authors.find(author => author.id === args.id)
                //return data
                return Author.findById(args.id)
            }
        },
        books : {
            type : new GraphQLList(BookType),
            resolve(parent, args)
            {
                // return books
                return Book.find({})
            }
        },
        authors : {
            type : new GraphQLList(AuthorType),
            resolve(parent, args)
            {
                // return authors
                return Author.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields : {
        addAuthor : {
            type : AuthorType,
            args : {
                name : { type : new GraphQLNonNull(GraphQLString) },
                age : { type : new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args)
            {
                const author = new Author({
                    name : args.name,
                    age : args.age
                })
                return author.save()
            }
        },
        addBook : {
            type : BookType,
            args : {
                name : { type : new GraphQLNonNull(GraphQLString) },
                genre : { type : new GraphQLNonNull(GraphQLString) },
                authorId : { type : new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args)
            {
                const book = new Book({
                    name : args.name,
                    genre : args.genre,
                    authorId : args.authorId
                })
                return book.save()
            }
        }
    }
})

export default new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation
})