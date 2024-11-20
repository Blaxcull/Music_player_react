
import React from 'react';

function RepeatButton({ isRepeating, toggleRepeat }) {
    return (
        <button onClick={toggleRepeat}>
            {isRepeating ? "Stop Repeat" : "Repeat Same Song"}
        </button>
    );
}

export default RepeatButton;
