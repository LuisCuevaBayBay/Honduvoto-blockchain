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

export default function App({ isSignedIn, contractId, wallet }) {
  
  const signInFun=()=> {
    wallet.signIn();
  }
  const signOutFun=()=>{
    wallet.signOut();
  }

  const callMethod = async(methodName, args ={})=>{
    await wallet.callMethod({
      contractId: contractId,
      method:methodName,
      args:args,
    });
  };

  const viewMethod = async(methodName, args={})=>{
    return await wallet.viewMethod({
      contractId: contractId,
      method: methodName,
      args: args,
    });
  };

  const getPrompts = async() =>{
    return await viewMethod("getAllPrompts");
    console.log(output);
    return output;
    }

  const displayHome=()=>{
    if(isSignedIn){
      return(
        <Routes>
            <Route path="/" 
            element={<Home
              callMethod={callMethod} 
              viewMethod ={viewMethod}
              getPrompts = {getPrompts}
              /> }></Route>
            <Route path="/newPoll" 
            element={ <NewPoll
            callMethod={callMethod} 
            viewMethod ={viewMethod}
            getPrompts = {getPrompts}

            />}></Route>
            <Route path="/PollingStation" 
            element={< PollingStation
            callMethod=   {callMethod} 
            viewMethod=   {viewMethod}
            getPrompts=   {getPrompts}
            /> }></Route>
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