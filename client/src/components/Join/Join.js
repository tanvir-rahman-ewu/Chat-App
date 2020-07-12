import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Join.css'
import 'bootstrap/dist/css/bootstrap.min.css'

let Join = () => {

    const [name, setName] = useState('');
    const [room, setRomm] = useState('');

    const check = (event) => {

        if(!name || !room){
            alert('You must fill both name and room');
            event.preventDefault() 
        }
    }

    return (
        <div className="main">
            <div className="joinOuter">
            <div className="joinInner">
                <div className="heading">
                    <h1>Free Chat</h1>
                </div>

                <div className="inputBox">

                    <div><input placeholder="Enter Name" className="joinInput" type="text"
                        onChange={event => { setName(event.target.value) }} /></div>

                    <div><input placeholder="Enter Room" className="joinInput" type="text"
                        onChange={event => { setRomm(event.target.value) }} /></div>
                        
                    <Link onClick={ (event) => check(event) } to={`/chat?name=${name}&room=${room}`}>
                        <button className="button" type="submit">Let's Go</button>
                    </Link>
                </div>

            </div>
        </div>
        </div>
        
    )
}

export default Join;