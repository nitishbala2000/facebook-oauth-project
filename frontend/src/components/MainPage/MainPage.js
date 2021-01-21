import React, { Component, Fragment } from 'react';
import { Table, Container, Button, Form, Spinner } from "react-bootstrap";
import CustomSpinner from "../CustomSpinner/CustomSpinner";
import {connect} from "react-redux";
import classes from "./MainPage.module.css";
import axios from "../../axios_instance";

const statusses = {
    READING : 0,
    EDITING : 1,
    SUBMITTING : 2
}

class MainPage extends Component {

    state = {
        user : null,
        exteredText : null,
        status : statusses.READING
    }


    componentDidMount() {
        const params = {jwtToken : this.props.jwtToken};

        axios.get("/getUserInfo", {params : params})
        .then(res => {
            this.setState({user : res.data, enteredText : res.data.extraInfo})
        })
        .catch(err => {
            console.log(err);
        })
    }

    onTextAreaChange = (event) => {
        this.setState({enteredText : event.target.value});
    }

    saveUser = () => {

        const newVal = this.state.enteredText;
        this.setState({status : statusses.SUBMITTING});

        const params = {jwtToken : this.props.jwtToken, extraInfo : newVal};

        axios.post("/updateExtraInfo", params)
        .then(res => {

            const newUser = {...this.state.user, extraInfo : newVal};
            this.setState({user : newUser, status : statusses.READING});
        })
        .catch(err => {
            console.log(err);
        })
    }

    cancel = () => {
        this.setState({status : statusses.READING, enteredText : this.state.user.extraInfo});
    }

    render() {

        let pageBody = <CustomSpinner/>;
        if (this.state.user) {

            let extraInfoCell, finalCell;

            if (this.state.status === statusses.READING) {
                extraInfoCell = this.state.user.extraInfo;
                finalCell = <Button 
                                variant="primary"
                                onClick={() => this.setState({status : statusses.EDITING})}>Edit</Button>;
            } else if (this.state.status === statusses.EDITING) {
             
                extraInfoCell = (
                    <textarea
                        rows={4} 
                        className={classes.TextArea}
                        value={this.state.enteredText}
                        onChange={this.onTextAreaChange}/>
                );

                finalCell = (
                    <Fragment>
                        <Button 
                            variant="success" 
                            style={{marginRight: "5px"}}
                            onClick={this.saveUser}>Save</Button>

                        <Button 
                            variant="danger"
                            onClick={this.cancel}>Cancel</Button>
                    </Fragment>
                )
            } else {
                //Submitting
                extraInfoCell = this.state.exteredText;
                finalCell = <p style={{textAlign: "center"}}>
                    <Spinner animation="border" role="status" style={{margin: "auto"}}/>
                </p>
            }

            pageBody = (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Facebook Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Extra Info</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.user.id}</td>
                            <td>{this.state.user.name}</td>
                            <td>{this.state.user.email}</td>
                            <td>{extraInfoCell}</td>
                            <td>{finalCell}</td>
                        </tr>
                    </tbody>
                </Table>
            )
        }
        return (
            
            <Container style={{marginTop : "30vh"}}>

                <h3 style={{marginBottom: "20px"}}>Your info:</h3>
               

               {pageBody}
                
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        jwtToken : state.jwtToken
    }
}

export default connect(mapStateToProps)(MainPage);