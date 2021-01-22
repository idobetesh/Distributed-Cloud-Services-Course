import React, { Component } from 'react';
// import Background from './Background';
// import Truck from './Truck';
import ClientsData from '../Data/clientsData.json';
import Client from './Client';
import Registration from './Registration'
import Background from './Background';

class ClientsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clientsData: [],
            edit: false,
            formInputs: {
                id: null,
                date: "01.01.2021",
                name: 'John Doe',
                location: 'Tel Aviv'
            },
        }

        this.eachClient = this.eachClient.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
        this.add = this.add.bind(this)
        this.nextId = this.nextId.bind(this)
    }

    componentDidMount() {
        ClientsData.map(item => this.add({id: item.id, name: item.name, date: item.date, location: item.location}));
    }

    delete(id) {
        this.setState(prevState => ({
            clientsData: prevState.clientsData.filter((client, i) => i !== id)
        }))
    }

    add(newClient) {
        this.setState(prevState => ({
            clientsData: [
                ...prevState.clientsData, {
                    id: newClient.id !== null ? newClient.id : this.nextId(prevState.clientsData),
                    name: newClient.name,
                    date: newClient.date,
                    location: newClient.location
                }]
        }))
    }

    update(newClient, id) {
        this.setState(prevState => ({ edit: false, clientsData: prevState.clientsData.map( client => {
                        if (client.id === id) {
                            client.name = newClient.name
                            client.location = newClient.location
                            client.date = newClient.date
                        }
                        return client 
                    })
            }
        ))
    }

    nextId(clientsData = []) {
        let max = clientsData.reduce((prev, curr) => prev.id > curr.id ? prev.id : curr.id, 0);
        return ++max;
    }

    eachClient(item, index) {
        return (
            <Client key={item.id} index={index} onDelete={this.delete}>
                <div>
                    <span style={{marginLeft: '25px'}}> {++index + "."} </span>
                    <span style={{marginLeft: '25px'}}> {item.date} </span>
                    <span style={{marginLeft: '25px'}}> {item.name} </span>
                    <span style={{marginLeft: '25px'}}> {item.location} </span>
                </div>
            </Client>
        )
    }

    render() {
        return (
            <>
                <Background></Background>
                <div style={{background:'grey', height: '60%'}}>
                    <p>
                    {this.state.clientsData.map(this.eachClient)}
                    </p>
                </div>
                {/* <Truck></Truck> */}
                <Registration formInputs={this.state.formInputs} edit={this.state.edit} onAdd={this.add} onEdit={this.update}/>
            </>
        )
    }
}

export default ClientsList;