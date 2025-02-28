import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import './styles.css';

const socket = io('http://localhost:5000');

function Chat({ phone, receiver }) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/messages?sender=${phone}&receiver=${receiver}`)
            .then(res => setMessages(res.data));

        socket.on('message', (msg) => {
            if ((msg.sender === phone && msg.receiver === receiver) || (msg.sender === receiver && msg.receiver === phone)) {
                setMessages(prev => [...prev, msg]);
            }
        });

        return () => socket.off('message');
    }, [phone, receiver]);

    const sendMessage = () => {
        if (message.trim()) {
            axios.post('http://localhost:5000/send', { sender: phone, receiver, message });
            setMessage('');
        }
    };

    return (
        <div className="chat-container">
            <h2>Chat with {receiver}</h2>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`message ${msg.sender === phone ? 'my-message' : 'other-message'}`}
                    >
                        <span className="message-text">{msg.message}</span>
                    </div>
                ))}
            </div>
            <div className="input-area">
                <input 
                    type="text" 
                    value={message} 
                    onChange={e => setMessage(e.target.value)} 
                    placeholder="Type a message..." 
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
