

import React, { Component } from "react";
import axios from 'axios';

export default class StudentsList extends Component {

    constructor(props) {
        super(props)
        this.deleteStudent = this.deleteStudent.bind(this);
        this.state = {
            students: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/students')
            .then(response => {
                this.setState({ students: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    deleteStudent (e){
        axios({
            method:'delete',
            url:("http://localhost:4000/students/delete-student/"+e.target.name)
        }).then((response)=>{
            alert("success")
            window.location.reload();
        })
    }

    render() {
        return (
            <div>
                <h3>School Students List</h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.students.map(student => (
                        <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.age}</td>
                            <td><button type='button' className='btn btn-danger' name={student._id} onClick={this.deleteStudent}>Supprimer</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}