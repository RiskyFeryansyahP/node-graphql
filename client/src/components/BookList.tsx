import * as React from 'react'
import { Query } from 'react-apollo'

// Import Query
import { getBooksQuery } from '../queries/query'

// import component
import BookDetails from './BookDetails'

// const getBooks = gql`
//     {
//         books{
//             name
//             id
//         }
//     }
// `

interface IBooks {
    books : any[]
    name : string
}

// interface IResponse {
//     book : IBooks[]
// }

// type UserChildProps = ChildDataProps<{}, Response>;

// const withBook = graphql<{}, IResponse>(getBooks)

interface IProps {
    nama : string
}

class BookList extends React.Component<IProps> {

    public state = {
        selected : null
    }

    public handleClick = (book : any) =>
    {
        this.setState({ selected : book.id })
        // console.log(book)
    }

    public render()
    {
        console.log(this.state)
        return(
            <React.Fragment>
                <Query<IBooks> query={getBooksQuery} >
                {({loading, data}) => {
                    console.log(loading)
                    if(loading || !data) {
                        return(
                            <div>Loading....!</div>
                        )
                    }
                    console.log(this.props.nama)
                    return (<ul> {data.books.map(book => {
                        return(
                            <li key={book.id} value={book.id} onClick={() => this.handleClick(book)}> {book.name} </li>
                        )
                    })} </ul>)
                }}
                </Query>
                <BookDetails bookId={this.state.selected} />
            </React.Fragment>
        )
    }
}

export default BookList
