import React, { Component } from 'react';
import {MdDelete, MdEdit} from 'react-icons/md';
import {Button, Fab} from '@material-ui/core';

class Client extends Component {
    constructor(props){
        super(props);

        this.editClient = this.editClient.bind(this);
        this.deleteClient = this.deleteClient.bind(this);
    }

    editClient = () => this.props.onChange(this.props.index);

    deleteClient = () => this.props.onDelete(this.props.index);

    render() {
         return <>
                  {this.props.children}
                    <span>
                        <Button onClick={this.editClient}><Fab size="small" color="secondary" aria-label="edit"><MdEdit/></Fab></Button> 
                        <Button onClick={this.deleteClient}><Fab size="small" color="secondary" aria-label="delete"><MdDelete/></Fab></Button>
                    </span>
                </>
    }
}

export default Client;