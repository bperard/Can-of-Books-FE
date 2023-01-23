import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

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
      </>
    )
  }
}

export default BestBooks;
