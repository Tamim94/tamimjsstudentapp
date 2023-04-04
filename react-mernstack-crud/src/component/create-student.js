import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateStudent extends Component {

    constructor(props) {
        super(props)

        // Setting up functions
        this.onChangeStudentName = this.onChangeStudentName.bind(this);
        this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
        this.onChangeStudentage = this.onChangeStudentage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            name: '',
            email: '',
            age: ''
        }
    }

    onChangeStudentName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeStudentEmail(e) {
        this.setState({ email: e.target.value })
    }

    onChangeStudentage(e) {
        this.setState({ age: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const studentObject = {
            name: this.state.name,
            email: this.state.email,
            age: this.state.age
        };
        axios.post('http://localhost:4000/students/create-student/', studentObject) // it worked 1 times, but I don't know why it doesn't change anything on the MongoDB compass after!!
            .then(res => alert("étudiant ajouté"));

        this.setState({ name: '', email: '', age: '' })
    }

    render() {
        return (<div className="form-wrapper">
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={this.state.name} onChange={this.onChangeStudentName} />
                </Form.Group>

                <Form.Group controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={this.state.email} onChange={this.onChangeStudentEmail} />
                </Form.Group>

                <Form.Group controlId="Name">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="text" value={this.state.age} onChange={this.onChangeStudentage} />
                </Form.Group>

                <Button variant="dark" size="sm" block="block" type="submit"  style={{marginBottom:"-10px" }}>
                    Create Student
                </Button>
            </Form>
        </div>);
    }
}