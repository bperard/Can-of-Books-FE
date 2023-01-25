import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import BookModal from './BookModal';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [
        {
          title: 'Code 101',
          description: 'hello world!',
          status: 'checked out'
        },
        {
          title: 'Code 102',
          description: 'hello class',
          status: 'checked in'
        },
      ]
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  getBooks = async () => {
    try {
      const url = `${process.env.REACT_APP_SERVER}/books`;

      const bookData = await axios.get(url);

      this.setState({
        books: bookData.data
      });

    } catch (error) {
      console.log(error.response);
    }
  }

  componentDidMount() {
    this.getBooks();
  }

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

  handleBookSubmit = (event) => {
    event.preventDefault();

    // TODO: BUILD A BOOK OBJECT FROM MY FORM VALUES
    let newBook = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.value,
    }
    console.log('new Book from form>>>', newBook);

    // TODO: post my book to DB using my 2nd handler
    this.postBook(newBook);
  }

  // *** 2nd Handler to post to DB

  postBook = async (bookObj) => {
    try {
      // TODO: Create the url for axios to send book obj to server
      let url = `${process.env.REACT_APP_SERVER}/books`;

      // 2 args on a post: 1st is the url, 2nd is the data to send
      let createdBook = await axios.post(url, bookObj);

      this.setState({
        books: [...this.state.books, createdBook.data]
      })


      // TODO: receive a created book and add it to state
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {

    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <Carousel>
            {this.state.books.map(book => (
              <Carousel.Item >
                <img
                  alt="book cat"
                  src="http://placekitten.com/200/300"
                />
                <Carousel.Caption>
                  <h2>
                    {book.title}
                  </h2>
                  <p>
                    {book.description}
                  </p>
                  <p>
                    {book.status}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            ))
            }
          </Carousel>
        ) : (
          <h3>Book Collection is empty</h3>
        )
        }
           <BookModal showModal={this.state.showModal} handleCloseModal={this.handleCloseModal}
           handleBookSubmit = {this.handleBookSubmit}/>
      <button onClick = {this.handleOpenModal}>New Book</button>
      </>
    )
  };
}


export default BestBooks;
