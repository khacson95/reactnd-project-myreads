import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

class Shelf extends React.Component {
  // Get props
  static propTypes = {
    shelfName: PropTypes.string.isRequired,
    handleMoveBook: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
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

export default Shelf;
