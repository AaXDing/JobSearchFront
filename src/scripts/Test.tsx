import React from 'react';
import { getUser } from './helper/localUser';


const Test: React.FC = () => {
    const userId = getUser();

    var Success = 0;
    var Failed = 0;

    const get = () => {
        fetch('http://localhost:8080/JobSearch_war_exploded/history?user_id=' + userId, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json;charset=utf-8',
            },
        }).then((response) => response.json())
            .then((data) => {
                Success++;
            }).catch((error) => {
                Failed++;
            })
    }

    const qps = 5; // Set your desired QPS

    // Calculate the interval in milliseconds based on QPS
    const interval = 1000 / 1000;

    // Start sending requests at the specified QPS
    const requestInterval = setInterval(get, interval);
    // Stop sending requests after a certain duration (e.g., 10 seconds)
    const testDuration = 1000;
    setTimeout(() => clearInterval(requestInterval), testDuration);
    setTimeout(() => console.log('Success: ' + Success + ' Failed: ' + Failed), testDuration);

    return <span>Test</span>;
}

export default Test;