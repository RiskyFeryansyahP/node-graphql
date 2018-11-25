import * as React from 'react'
import { Query } from 'react-apollo'

// import queries

import { getBookQuery } from '../queries/query'

interface IProps {
    bookId : any
}

interface IBooks {
    id : string
    name : string
    genre : string
}

interface IBook {
    book : {
        id : string,
        name : string,
        genre : string,
        author : {
            name : string,
            age : number,
            books : [IBooks]
        }
    }
}

class BookDetails extends React.Component<IProps> {
    
    public render()
    {
        return(
            <div>
                <p>No Book Selected </p>
                {
                    this.props.bookId === null ? 
                    <p> Loading Data Clicked </p> : 
                    <Query<IBook> query={getBookQuery} variables={{ id : this.props.bookId }}>
                    {({ data, loading }) => {
                        if(loading || !data) {
                            return(
                                <div>Loading....!</div>
                            )
                        }
                        console.log(data)

                        return(
                            <React.Fragment>
                                <h2> {data.book.name} </h2>
                                <p> { data.book.genre } </p>
                                <p> { data.book.author.name } </p>
                                <p>All Book with this Author : </p>
                                {data.book.author.books.map(book => (
                                    <li key={book.id}> { book.name } </li>
                                ))}
                                <br/>
                            </React.Fragment>
                        )
                    }}
                </Query>
                }
            </div>
        )
    }

}

export default BookDetails