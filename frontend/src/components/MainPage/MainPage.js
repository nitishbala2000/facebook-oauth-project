import React, { Component } from 'react';
import { Table, Container, Button } from "react-bootstrap";

class MainPage extends Component {
    render() {
        return (
            
            <Container style={{marginTop : "30vh"}}>

                <h3 style={{marginBottom: "20px"}}>Your info:</h3>
               

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
                            <td>1213213213213</td>
                            <td>Nitish Bala</td>
                            <td>nitishbala2000@gmail.com</td>
                            <td>I am indian</td>
                            <td><Button variant="primary">Edit</Button></td>
                        </tr>
                    </tbody>
                </Table>
                
            </Container>
        );
    }
}

export default MainPage;