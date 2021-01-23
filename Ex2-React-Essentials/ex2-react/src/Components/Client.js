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
                    <div style={{marginLeft:'48%', paddingTop:'1%'}}>
                        <Button style={{paddingTop:'3.5%'}} onClick={this.editClient}><Fab size="small" color="secondary" aria-label="edit"><MdEdit/></Fab></Button> 
                        <Button style={{paddingTop:'3.5%'}} onClick={this.deleteClient}><Fab size="small" color="secondary" aria-label="delete"><MdDelete/></Fab></Button>
                    </div>
                </>
    }
}

export default Client;