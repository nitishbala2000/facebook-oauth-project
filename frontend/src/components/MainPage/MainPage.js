import React, { Component } from 'react';
import { Table, Container, Button } from "react-bootstrap";
import CustomSpinner from "../CustomSpinner/CustomSpinner";
import {connect} from "react-redux";
import axios from "../../axios_instance";

class MainPage extends Component {

    state = {
        user : null
    }

    componentDidMount() {
        const params = {jwtToken : this.props.jwtToken};

        axios.get("/getUserInfo", {params : params})
        .then(res => {
            this.setState({user : res.data})
        })
        .catch(err => {
            console.log(err);
        })
    }


    render() {

        let pageBody = <CustomSpinner/>;
        if (this.state.user) {
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
                            <td>{this.state.user.extraInfo}</td>
                            <td><Button variant="primary">Edit</Button></td>
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