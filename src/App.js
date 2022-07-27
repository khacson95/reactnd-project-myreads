import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookSearch from "./Components/BookSearch";
import BookShelf from "./Components/BookShelf";
import { BrowserRouter, Routes, Route } from "react-router-dom";

class BooksApp extends React.Component {
  // State init
  state = {
    books: [],
  };

  // Get all books to display on the BookShelf
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books,
      });
    });
  }

  // Handle move book process
  handleMoveBook = (book, shelfNew) => {
    const bookCheck = this.state.books.find((item) => item.id === book.id);
    if (bookCheck) {
      bookCheck.shelf = shelfNew;
      BooksAPI.update(book, shelfNew).then(
        this.setState((currentState) => ({
          books: currentState.books,
        }))
      );
    } else {
      book.shelf = shelfNew;
      BooksAPI.update(book, shelfNew).then(
        this.setState((prevState) => ({
          books: prevState.books.concat(book),
        }))
      );
    }
  };

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <BookShelf
                  books={this.state.books}
                  handleMoveBook={this.handleMoveBook}
                />
              }
            />
            <Route
              path="/search"
              element={
                <BookSearch
                  books={this.state.books}
                  handleMoveBook={this.handleMoveBook}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default BooksApp;
