import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import {Navbar, Nav} from "react-bootstrap";


class CustomNavBar extends Component {
    
    render() {
        return (
            <Navbar bg="dark" variant="dark">
    
                <Nav className="mr-auto">
                    <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
                    <Nav.Link as={NavLink} to="/mainPage" exact>Main Page</Nav.Link>
                    <Nav.Link as="span" style={{cursor: "pointer"}}>Log out</Nav.Link>
                </Nav>

            </Navbar>
        );
    }
}

export default CustomNavBar;