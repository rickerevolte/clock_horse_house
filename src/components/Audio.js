import React from 'react';
import horse from '../../public/audio/horse.mp3'

const Sound = () => {
    const audio = new Audio(horse);
    audio.loop = false;

    return (
        <div>
            <button
                onClick={() => {
                    // audio.loop = true;
                    audio.play();
                }}
            >
                start horse
            </button>
            <button
                onClick={() => {
                    audio.pause();
                }}
            >
                stop horse
            </button>
        </div>
    );
};

export default Sound;