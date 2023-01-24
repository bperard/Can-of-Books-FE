import React from "react";
import { Container, Form, Button } from 'react-bootstrap';

class UpdateBook extends React.Component {

  handleSubmit = (event) => {
    event.preventDefault();

    const bookToUpdate = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.value,
      _id: this.props.book._id
    }

    this.props.updateBook(bookToUpdate);
  }

  render (){
    return(
      <>
      <Container >
            <Form onSubmit={this.handleSubmit}>
              
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" defaultValue={this.props.book.title}/>
              </Form.Group>
              
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" defaultValue={this.props.book.description} />
              </Form.Group>
              
              <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Control type="text" defaultValue={this.props.book.status}/>
              </Form.Group>

              <Button type="submit">Update Book</Button>
            </Form>
          </Container>
      </>
    )
  }

}

export default UpdateBook;