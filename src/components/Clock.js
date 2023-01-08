import React from 'react';
import horse from '../../public/audio/horse.mp3';
import Sound from '../components/Audio';
import '../../src/index.css';

let startSeconds = 0;

const audio = new Audio(horse);

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            seconds: 0,
            dec: true,
        };

        // console.log(`clock initialized on ${this.state.date.toLocaleTimeString()}`);
        startSeconds = this.state.date.getTime();
        // console.log(startSeconds);
    };

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
        console.log('didMount');
    };

    componentWillUnmount() {
        console.log('didUnmount');
        clearInterval(this.timerID);
    };

    tick() {
        this.setState({
            date: new Date(),
            seconds: Math.round(((new Date().getTime()) - (startSeconds)) / 1000)
        });
        // console.log(this.state.seconds + 1)
        this.checkDecenials();
    };

    reset() {
        this.setState({
            seconds: 0,
            dec: true
        });
        startSeconds = this.state.date.getTime();
    };

    checkDecenials() {
        if ((this.state.seconds + 1) % 10 === 0) {
            // console.log(`it is a decenial: ${this.state.seconds+1}`);
            this.setState({
                dec: true
            });
            audio.play();
            // console.log(this.state.dec)
        } else {
            this.setState({
                dec: false
            })
            // console.log(this.state.dec)
        }
    }

    render() {
        return (
            <div>
                <Sound></Sound>
                <h1>{this.state.date.toLocaleDateString()}</h1>
                <h2>{this.state.date.toLocaleTimeString()}</h2>
                <div className='container' style={{ display: 'flex', flexdirection: 'row', gap: '1ch' }}>
                    <div>
                        <h3>Sekunden seit Start:</h3>
                    </div>
                    <div
                        style={{
                            color: this.state.dec === true ? 'red' : 'black'
                        }}
                    >
                        <h3> {this.state.seconds}</h3></div>
                </div>
                <button onClick={() => this.reset()}>reset Timer</button>
            </div>

        );
    }
}
export default Clock;