import React, { Component, Fragment } from 'react';
import classes from "./HomePage.module.css";
import { Container, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

library.add(faFacebookF); 

class HomePage extends Component {


    render() {

        const facebookIcon = <FontAwesomeIcon 
                                icon={['fab', 'facebook-f']} 
                                style={{marginRight: "10px"}}/>
                                
        const buttonClasses = ["btn", classes.btnFacebook].join(" ");
        return (
            <Fragment>
                <Container>
                    <div className={classes.WrapperDiv}>
                        <Card className={classes.Card}>
                            <Card.Header as="h5">Facebook Oauth Project</Card.Header>
                            <Card.Body>
                            <button className={buttonClasses}>
                                {facebookIcon}
                                Log in with facebook
                                </button>
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

export default HomePage;