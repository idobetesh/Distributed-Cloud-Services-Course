import React, { Component} from 'react';
import background from '../Images/background.png';
import truck from '../Images/truck.png';

const bgStyle = {
    backgroundRepeat: 'no-repeat',
    height: '584.2475559923341px',
}

const truckStyle = {
    left: '0%',
    right: '49.44%',
    top: '65.38%',
    bottom: '0.04%',
}
class Background extends Component {
    render() {
        return  <>
                <img src={background} style={bgStyle} alt="background"/>
                <img src={truck} style={truckStyle} alt="truck"/>
                </>
    }
}

export default Background;