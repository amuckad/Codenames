import React from 'react';
import './App.css';

export default function Seconds (props) {
    return (
        <div>
            <span className='seconds'>{props.seconds}</span>
        </div>
    );
}
