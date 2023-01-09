import React from 'react'

class Music extends React.Component {
    state = {
        play: false
    }

    url = "http://streaming.tdiradio.com:8000/house.mp3";
    audio = new Audio(this.url);

    componentDidMount() {
        this.audio.addEventListener('ended', () => this.setState({ play: false }));
    }

    componentWillUnmount() {
        this.audio.removeEventListener('ended', () => this.setState({ play: false }));
    }

    togglePlay = () => {
        this.setState({ play: !this.state.play }, () => {
            this.state.play ? this.audio.play() : this.audio.pause();
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.togglePlay}>{this.state.play ? 'Pause House' : 'Play House'}</button>
            </div>
        );
    }
}

export default Music;
