import React from 'react';

function User({ details }) {
    if (!details) {
        return <h3>Fetching your user details</h3>
    }

    return (
        <div className='friend container'>
            <h2>{details.name}</h2>
            <p>Email: {details.email}</p>
            <p>Password: {details.password}</p>
        </div>
    )
}

export default User