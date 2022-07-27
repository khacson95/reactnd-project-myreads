import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class BookSearch extends Component {
  // State init
  state = {
    query: "",
    results: [],
  };

  // Get props
  static propTypes = {
    handleMoveBook: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
  };

  // Clear query and result search
  clearQuery = () => {
    this.setState({
      query: "",
      results: [],
    });
  };

  // Update
  updateQuery(query) {
    if (query.length > 0) {
      this.setState(() => ({
        results: [],
        query: query,
      }));
      this.bookSearch(query);
    } else {
      this.clearQuery();
    }
  }

  // Search book process
  bookSearch(query) {
    if (query.length > 0)
      BooksAPI.search(query).then((searchResults) => {
        if (query === this.state.query)
          this.setState(() => ({
            results: this.handleBooksOnCurrentShelves(searchResults),
          }));
      });
  }

  // Handle books on current shelves
  handleBooksOnCurrentShelves(searchResults) {
    if (!searchResults.error) {
      const myBooks = this.props.books;
      const addState = searchResults.filter((result) =>
        myBooks.find((item) => {
          if (item.id === result.id) {
            result.shelf = item.shelf;
            return result;
          }
        })
      );
      myBooks.concat(addState);
      return searchResults;
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" onClick={this.clearQuery}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author or subject"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results.map((book) => (
              <li key={book.id}>
                <Book book={book} handleMoveBook={this.props.handleMoveBook} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookSearch;
