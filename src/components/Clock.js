import React from 'react';
import horse from '../assets/horse.mp3';
import '../index.css';

let startSeconds = 0;

let audio = new Audio();

class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            seconds: 0,
            fit: true,
            play: false,
            userInterval: 10

        };
        this.userSetInterval = this.userSetInterval.bind(this);
        startSeconds = this.state.date.getTime();
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
        console.log('didMount');
    }

    componentWillUnmount() {
        console.log('didUnmount');
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date(),
            seconds: Math.round(((new Date().getTime()) - (startSeconds)) / 1000)
        });
        this.checkDecenials();
    }

    reset() {
        this.setState({
            seconds: 0,
            fit: true
        });
        startSeconds = this.state.date.getTime();
    }

    userSetInterval(event) {
        let number = parseInt(event.target.value);
        console.log(number);
        console.log(parseInt(event.target.value));
        this.setState({ userInterval: number });
        console.log(this.state.userInterval);
    }

    killlHorse() {
        console.log("horse off");
        audio = new Audio();
    }

    startHorse() {
        console.log("horse on");
        audio = new Audio(horse);
    }

    checkDecenials() {
        if ((this.state.seconds + 1) % this.state.userInterval === 0) {
            this.setState({
                fit: true
            });
            audio.play();
        } else {
            this.setState({
                fit: false
            });
        }
    }

    toggleHorse = () => {
        this.setState({ play: !this.state.play }, () => {
            this.state.play ? this.startHorse() : this.killlHorse();
        });
    }

    render() {
        return (
            <div>
                <h1>{this.state.date.toLocaleDateString()}</h1>
                <h2>{this.state.date.toLocaleTimeString()}</h2>
                <div className='container' style={{ display: 'flex', flexdirection: 'row', gap: '1ch' }}>
                    <div>
                        <h3>Seconds since start:</h3>
                    </div>
                    <div
                        style={{
                            color: this.state.fit === true ? 'red' : 'black'
                        }}
                    >
                        <h3> {this.state.seconds}</h3></div>
                </div>
                <button onClick={() => this.reset()}>reset Timer</button>
                <br />
                <br />
                <input type="range" value={this.state.userInterval} min="4" max="300" onChange={this.userSetInterval}></input>
                <br />
                <br />
                <h4>click to activate the horse</h4>
                <button onClick={this.toggleHorse}>{this.state.play ? 'Stop Horse' : 'Start Horse'}</button>
                <h4>Horse neighing every {this.state.userInterval} seconds</h4>
            </div>

        );
    }
}
export default Clock;