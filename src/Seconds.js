import React from 'react';
import './App.css';

export default function Seconds (props) {
    return (
        <p>
             <p class="text-secondary"><span class="glyphicon glyphicon-time"> {props.seconds} </span>  </p>
        </p>
    );
}
