import * as React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

// import component
import BookList from './components/BookList'
import AddBook from './components/AddBook'

const client = new ApolloClient({
  uri : 'http://localhost:3000/graphql'
})

/**
 * ApolloClient berfungsi untuk menghubungkan antarah server dan client
 * ApolloProvider berfungsi agar si React dapat mengerti si GraphQL
 */

class App extends React.Component {
  public render() {
    const name = 'risky'
    return (
      <ApolloProvider client={client}>
        <div className="main">
          <h1>Tutorial GraphQL</h1>
          <BookList nama={name} />
          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
