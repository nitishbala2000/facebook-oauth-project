import React, { Component, Fragment } from 'react';
import classes from "./HomePage.module.css";
import { Container, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import * as actionCreators from "../../store/actionCreators";
import {connect} from "react-redux";


library.add(faFacebookF); 

class HomePage extends Component {

    componentDidUpdate(prevProps) {
        if (!prevProps.jwtToken && this.props.jwtToken) {
            this.props.history.push("/mainPage");
        }
    }


    render() {

        const facebookIcon = <FontAwesomeIcon 
                                icon={['fab', 'facebook-f']} 
                                style={{marginRight: "10px"}}/>
                                
        const buttonClasses = ["btn", classes.btnFacebook].join(" ");

        let button;
        if (!this.props.jwtToken) {
            button = (
                <button 
                    className={buttonClasses}
                    onClick={() => this.props.login()}>

                    {facebookIcon}
                    Log in with facebook
                </button>
            );
        } else {
            button = (
                <button 
                    className={buttonClasses}
                    onClick={() => this.props.logout()}>

                    {facebookIcon}
                    Log out
                </button>
            )
        }



        return (
            <Fragment>
                <Container>
                    <div className={classes.WrapperDiv}>
                        <Card className={classes.Card}>
                            <Card.Header as="h5">Facebook Oauth Project</Card.Header>
                            <Card.Body>
                                {button}
                            </Card.Body>
                        </Card>

                        <p style={{marginTop : "10px"}}>
                            Project inspired by <a href="https://jasonwatmore.com/post/2020/10/25/react-facebook-login-tutorial-example">Jason Watmore</a>
                        </p>
                    </div>
                    
                </Container>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        jwtToken : state.jwtToken
    }
} 

const mapDispatchToProps = dispatch => {
    return {
        login: () => dispatch(actionCreators.login()),
        logout: () => dispatch(actionCreators.logout())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);