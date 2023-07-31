import 'regenerator-runtime/runtime';
import React from 'react';

//react bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//import bootstrap navbar

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Card, Button, Row} from'react-bootstrap';


//react router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";

//Custom Components 
import Home from "./Components/Home";
import NewPoll  from './Components/NewPoll';
import PollingStation from './Components/PollingStation';


import { EducationalText, SignInPrompt, SignOutButton } from './ui-components';


export default function App({ isSignedIn, contractId, wallet }) {
  
  const signInFun=()=> {
    wallet.signIn();
  }
  const signOutFun=()=>{
    wallet.signOut();
  }

  const displayHome=()=>{
    if(isSignedIn){
      return(
        <Routes>
            <Route path="/" element={<Home/> }></Route>
            <Route path="/newPoll" element={ <NewPoll/>}></Route>
            <Route path="/PollingStation" element={< PollingStation/> }></Route>
        </Routes>
      )
    } else { 
      return(
      <Container>
          <Row classname='justify-content-center d-flex'>
              <Card style= {{margintop:"5vh", width: "30vh" }}>
                <Container>
                  <Row> Sign in to vote!</Row>
                  <Row classname='justify-content-center d-flex'>
                    <Button onClick={signInFun}>Login</Button>
                  </Row>
                </Container>
                </Card>
          </Row>
      </Container>
      );
    }
    
  };
  
  return(
  <Router>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Honduvoto</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <Nav.Link disabled={!isSignedIn} href="#newpoll">New Elections</Nav.Link>
            <Nav.Link onClick={isSignedIn? signOutFun: signInFun}>
              {isSignedIn ? wallet.accountId: "Login"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {displayHome()}
  </Router>
  );
}