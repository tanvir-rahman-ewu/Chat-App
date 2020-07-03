import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

let socket;

let Chat = ({ location }) => {

    const [name, setName] = useState('');
    const [room, steRoom] = useState('');
    const ENDPOINT = 'localhost:5000'

    useEffect( () => {
        socket = io(ENDPOINT)
        const {name, room} = queryString.parse(location.search) 
        setName(name);
        steRoom(room);  
    })

    return(
        <div>
            chat
        </div>
    )
}

export default Chat;