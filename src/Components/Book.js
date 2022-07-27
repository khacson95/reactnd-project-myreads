import React from "react";
import PropTypes from "prop-types";

class Book extends React.Component {
  // Get props
  static propTypes = {
    book: PropTypes.object.isRequired,
    handleMoveBook: PropTypes.func.isRequired,
  };

  // Get book and execute move book process
  handleMoveBook = (e) => {
    this.props.handleMoveBook(this.props.book, e.target.value);
  };

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`,
              backgroundSize: "cover",
            }}
          />
          <div className="book-shelf-changer">
            <select onChange={this.handleMoveBook} defaultValue={this.props.book.shelf}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{'' || this.props.book.authors.join()}</div>
      </div>
    );
  }
}

export default Book;
