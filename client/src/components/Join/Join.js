import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Join.css'

let Join = () => {
    const [name, setName] = useState('');
    const [room, setRomm] = useState('');

    return (
        <div className="joinOuter">
            <div className="joinInner">
                <div className="heading"><h1>JOIN</h1></div>
                <div className="inputBox">
                    <div><input placeholder="Enter Name" className="joinInput" type="text" onChange={event => { setName(event.target.value) }} /></div>
                    <div><input placeholder="Enter Room" className="joinInput" type="text" onChange={event => { setRomm(event.target.value) }} /></div>
                    <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                        <button className="button" type="submit">Sign In</button>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Join;