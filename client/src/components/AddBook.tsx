import * as React from 'react'
// import { gql } from 'apollo-boost'
import { Query, Mutation } from 'react-apollo'

// Import Component
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/query'

// const getAuthors = gql`
//     {
//         authors{
//             name
//             id
//         }
//     }
// `

interface IGetAuthors {
    id : string
    name : string
    age : number
}

interface IAuthors {
    authors : [IGetAuthors]
}


class AddBook extends React.Component {

    public state = {
        name : '',
        genre : '',
        authorId : ''
    }

    public submitForm = (event : React.SyntheticEvent, addBook : any) : void => {
        event.preventDefault()
        addBook({
            variables : {
                name : this.state.name,
                genre : this.state.genre,
                authorId : this.state.authorId,
            },
            refetchQueries  : [{ query : getBooksQuery }]
        })
        // console.log(this.state)
        // <Mutation mutation={addBookMutation}>
        //     {(addBook, {data, loading}) => {
        //         e.preventDefault()
        //         addBook({variables : {
        //             name : this.state.name,
        //             genre : this.state.genre,
        //             authorId : this.state.authorId
        //         } })
        //         return true
        //     }}
        // </Mutation>
    }

    public handleChangeInput = (e : any) => {
        this.setState({ [e.target.name] : e.target.value })
    }

    public render()
    {
        return(
            <Mutation mutation={addBookMutation}>
            {(addBook) => {
                // menggunakan onSubmitBook variabel agar tidak terkena warning jsx-no-lambda
                const onSubmitBook = (e : any) => this.submitForm(e, addBook) 
                console.log(addBook)
                return(
                        <form onSubmit={onSubmitBook}>

                        <div className='field'>
                            <label htmlFor="name"> Book Name :  </label>
                            <input name='name' type="text" onChange={this.handleChangeInput} />
                        </div>
        
                        <div className='field'>
                            <label htmlFor="name"> Genre :  </label>
                            <input name='genre' type="text" onChange={this.handleChangeInput} />
                        </div>
        
                        <div className='field'>
                            <label htmlFor="name"> Author :  </label>
                            <select name='authorId' onChange={this.handleChangeInput}>
                                <option value="">Select Author</option>
                                <Query<IAuthors> query={getAuthorsQuery}>
                                    {({ loading, data }) => {
                                        if(loading || !data)
                                        {
                                            return(
                                                <option>Loading Authors...</option>
                                            )
                                        }
        
                                        return data.authors.map(author => (
                                            <option key={author.id} value={author.id}> {author.name} </option>
                                        ))
                                    }}
                                </Query>
                            </select>
                        </div>
        
                        <button>+</button>
                    </form>
                )
            }}
            </Mutation>

        )
    }
}

export default AddBook