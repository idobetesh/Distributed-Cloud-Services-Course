import React, {Component} from 'react';
import background from '../Images/background.png';
import truck from '../Images/truck.png';

class Background extends Component {
    render() {
        return (
                <div style={{marginLeft: '15%'}}>
                    <img src={background} style={{display: 'block' ,position: 'absolute', height: '80%'}} alt="background"/>
                    <img src={truck} style={{display: 'block', position: 'absolute', height: '40%', top: 450}} alt="truck"/>
                </div>
        )
              
    }
}

export default Background;