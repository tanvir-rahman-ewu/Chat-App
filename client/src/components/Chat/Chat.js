import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages'

let socket;

let Chat = ({ location }) => {

    const [name, setName] = useState(''); //state
    const [room, setRoom] = useState(''); //state
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const ENDPOINT = 'localhost:5000' //server end point 

    useEffect( () => {

        socket = io(ENDPOINT)

        const {name, room} = queryString.parse(location.search) 

        setName(name); //setState
        setRoom(room); //setState

        socket.emit('join', {name, room}, () => {

        })

        return () => {
            socket.emit('disconnect');

            socket.off();
        }

    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message) => {

            setMessages([...messages, message])

            socket.on("roomData", ({ users }) => {
                setUsers(users);
              });
        })
    }, [messages]);

    //function for sending messages
    const sendMessage = (event) => {

        event.preventDefault(); //prevents page refresh

        if(message){
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    //console.log(messages);

    return(
       <div className="outerContainer">
           <div className="container">
               <InfoBar room={room}/>
               <Messages messages = {messages} name={name} />
               <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
           </div>
       </div>
    )
}

export default Chat;