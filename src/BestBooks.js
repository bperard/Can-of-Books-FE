import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import BookModal from './BookModal';
import { Button } from 'react-bootstrap';
import UpdateBook from './UpdateBook';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  // React Lifecycle

  componentDidMount() {
    this.getBooks();
  }

  // Modal

  handleOpenModal = () => {
    this.setState({
      showModal: true
    });
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false
    });
  }

  // Intial DB GET

  getBooks = async () => {
    try {
      // DB GET books endpoint
      let url = `${process.env.REACT_APP_SERVER}/books`;

      const bookData = await axios.get(url);

      // Set initial books state
      this.setState({
        books: bookData.data
      });

    } catch (error) {
      console.log(error.response);
    }
  }

  // Create & POST book handler

  handleBookSubmit = (event) => {
    event.preventDefault();

    // Create book from form fields
    let newBook = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.value,
    }
    console.log('Book obj created from form', newBook);

    // Post book to DB
    this.postBook(newBook);
  }

  // POST book

  postBook = async (bookObj) => {
    try {
      // DB POST endpoint url
      let url = `${process.env.REACT_APP_SERVER}/books`;

      // Axios POST with url & request.body
      let createdBook = await axios.post(url, bookObj);

      // Spread current array & add new book with id to state
      this.setState({
        books: [...this.state.books, createdBook.data]
      })

    } catch (error) {
      console.log(error.message);
    }
  }

  // DELETE book

  deleteBook = async (bookId) => {
    try {
      
      // DB DELETE books endpoint
      let url = `${process.env.REACT_APP_SERVER}/books/${bookId}`;

      await axios.delete(url);

      const booksArray = this.state.books;

      const updatedBooks = booksArray.filter(book => book._id !== bookId);

      this.setState({
        books: updatedBooks
      });

    } catch (error) {
      console.log(error.response);
    }
  }

  // UPDATE book

  updateBook = async (bookToUpdate) => {
    try {

      // DB PUT books endpoint
      let url = `${process.env.REACT_APP_SERVER}/books/${bookToUpdate._id}`;
      console.log(url, bookToUpdate);
      const updatedBook = await axios.put(url, bookToUpdate);
      
      const booksArray = this.state.books;

      const newBookArray = booksArray.map(book => updatedBook.data._id === book._id ?  // if updatedBook id is same as current book id
        updatedBook.data : // return updated book if true
        book // return current book if false
        );

      this.setState({
        books: newBookArray
      });

    } catch (error) {
      console.log(error.response);
    }
  }

  render() {

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <Carousel>
            {this.state.books.map(book => ( // Container above & items below, key use unique string(id, index, etc)
              <Carousel.Item key={book._id}>
                <img
                  alt="book cat"
                  src="http://placekitten.com/200/300"
                />
                <Carousel.Caption className="carousel">
                  <h2>
                    {book.title}
                  </h2>
                  <p>
                    {book.description}
                  </p>
                  <p>
                    {book.status}
                  </p>
                  <Button
                    variant="dark"
                    onClick={() => { this.deleteBook(book._id) }}
                  >
                    DELETE
                  </Button>
                  <UpdateBook 
                    book={book}
                    updateBook={this.updateBook}
                  />
                </Carousel.Caption>
              </Carousel.Item>
            ))
            }
          </Carousel>
        ) : (
          <h3>Book Collection is empty</h3>
        )
        }

        <BookModal
          showModal={this.state.showModal}
          handleCloseModal={this.handleCloseModal}
          handleBookSubmit={this.handleBookSubmit}
        />
        <button onClick={this.handleOpenModal}>
          Add New Book
        </button>

      </>
    )
  };
}

export default BestBooks;