import React, { useState } from 'react';
import Chat from './Chat';
import './styles.css';

function App() {
    const [phone, setPhone] = useState('');
    const [receiver, setReceiver] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        if (phone) setLoggedIn(true);
    };

    return (
        <div className="container">
            {!loggedIn ? (
                <div className="login">
                    <h2>Enter Your Phone Number</h2>
                    <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Your Phone Number"/>
                    <input type="text" value={receiver} onChange={e => setReceiver(e.target.value)} placeholder="Receiver's Number"/>
                    <button onClick={handleLogin}>Login</button>
                </div>
            ) : (
                <Chat phone={phone} receiver={receiver} />
            )}
        </div>
    );
}

export default App;
