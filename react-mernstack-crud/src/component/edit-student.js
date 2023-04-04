import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateStudent extends Component {

    constructor(props) {
        super(props)

        // functions
        this.onChangeStudentName = this.onChangeStudentName.bind(this);
        this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
        this.onChangeStudentage = this.onChangeStudentage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);

        //  state
        this.state = {
            name: '',
            email: '',
            age: '',
            studentList: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:27017/studentdb/students')
            .then(response => {
                this.setState({ studentList: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
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
        axios.post('http://localhost:27017/studentdb/students', studentObject)
            .then(res => {
                console.log(res.data);
                this.setState({
                    name: '',
                    email: '',
                    age: '',
                    studentList: [...this.state.studentList, studentObject]
                })
            });

    }

    onDelete(name, age) {
        axios.delete('http://localhost:4000', {
            data: { name, age }
        })
            .then(res => {
                console.log(res.data);
                this.setState({
                    studentList: this.state.studentList.filter(student => student.name !== name || student.age !== age)
                })
            });
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


                <Button variant="dark" size="sm" block="block" type="submit" style={{marginBottom:"-10px" }}>
                    Update Student
                </Button>

                <Button
                    variant="dark"
                    size="sm"
                    block="block"
                    type="button"
                    style={{marginLeft: "20px", marginBottom:"-10px" }}
                    onClick={() => this.onDelete(this.state.name, this.state.age)}>
                    Delete
                </Button>


            </Form>

        </div>);
    }
}
