import React, { Component , Fragment} from 'react';
import {NavLink} from "react-router-dom";
import {Navbar, Nav} from "react-bootstrap";
import {connect} from "react-redux";
import * as actionCreators from "../../store/actionCreators";
import {withRouter} from "react-router-dom";


class CustomNavBar extends Component {

    onLogoutClicked = () => {
        this.props.logout();
        this.props.history.push("/");
    }
    
    render() {

        let extraLinks = null;

        if (this.props.jwtToken) {
            extraLinks = (
                <Fragment>
                    <Nav.Link as={NavLink} to="/mainPage" exact>Main Page</Nav.Link>
                    <Nav.Link as="span" style={{cursor: "pointer"}} onClick={this.onLogoutClicked}>Log out</Nav.Link>
                </Fragment>
            )
        }

        return (
            <Navbar bg="dark" variant="dark">
    
                <Nav className="mr-auto">
                    <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
                    {extraLinks}
                </Nav>

            </Navbar>
        );
    }
}

const mapStateToProps = state => {
    return {
      jwtToken: state.jwtToken
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      logout: () => dispatch(actionCreators.logout())
    }
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CustomNavBar));