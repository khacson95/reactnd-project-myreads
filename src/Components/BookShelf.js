import React from "react";
import Header from "./Header";
import Shelf from "./Shelf";
import OpenSearchButton from "./OpenSearchButton";
import PropTypes from "prop-types";

class BookShelf extends React.Component {
  // Get props
  static propTypes = {
    books: PropTypes.array.isRequired,
    handleMoveBook: PropTypes.func.isRequired,
  };

  render() {
    // Book shelf info array
    const bookShelfArray = [
      {
        shelfId: "currentlyReading",
        shelfName: "Currently Reading",
      },
      {
        shelfId: "wantToRead",
        shelfName: "Want to Read",
      },
      {
        shelfId: "read",
        shelfName: "Read",
      },
    ];

    return (
      <div className="list-books">
        <Header />
        <div className="list-books-content">
          <div>
            {bookShelfArray.map((bookShelf) => (
              <Shelf
                key={bookShelf.shelfId}
                shelfName={bookShelf.shelfName}
                books={this.props.books.filter(
                  (book) => book.shelf === bookShelf.shelfId
                )}
                handleMoveBook={this.props.handleMoveBook}
              />
            ))}
          </div>
        </div>
        <OpenSearchButton />
      </div>
    );
  }
}

export default BookShelf;
