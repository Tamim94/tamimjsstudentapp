import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//added bootstrap to make the page bit beautiful
import "bootstrap/dist/css/bootstrap.css";
import backgroundImage from './img.jpg';
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



import CreateStudent from "./component/create-student.js";
import EditStudent from "./component/edit-student.js";
import StudentList from "./component/student-list.js";

function App() {
  return (<Router>
    <div className="App background">
    <header>
        <Navbar  >
          <Container>

            <Navbar.Brand>
              <Link to={"./create-student"} className="nav-link">
                Tamim Student App
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav>
                <Link to={"./create-student"} className="nav-link">
                  Create Student
                </Link>
              </Nav>

               <Nav>
                <Link to={"/edit-student"} className="nav-link">
                  Edits/Delete students
                </Link>
              </Nav>

              <Nav>
                <Link to={"/student-list"} className="nav-link">
                  Student List
                </Link>
              </Nav>
            </Nav>

          </Container>
        </Navbar>
      </header>
<body className="App background">
      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path='/' component={CreateStudent} />
                <Route path="/create-student" component={CreateStudent} />
                <Route path="/edit-student/" component={EditStudent} />
                <Route path="/student-list" component={StudentList} />
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
</body>
    </div>
  </Router>);
}

export default App;