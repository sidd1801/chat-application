import React, { useState } from "react";
import Chat from "./Chat";
import Login from "./Login";
import "./styles.css";

const App = () => {
    const [user, setUser] = useState(null);
    const [phone, setPhone] = useState("");
    const [receiver, setReceiver] = useState("");

    const handleLogin = () => {
        if (phone.trim() === "" || receiver.trim() === "") {
            alert("Enter valid phone numbers!");
            return;
        }

        alert("Login successful!");
        setUser({ phone, receiver });
    };

    return (
        <div className="container">
            {!user ? (
                <div className="login">
                    <h2>Enter Your Phone Number</h2>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Your Phone Number"
                    />
                    <input
                        type="text"
                        value={receiver}
                        onChange={(e) => setReceiver(e.target.value)}
                        placeholder="Receiver's Number"
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            ) : (
                <Chat user={user} />
            )}
        </div>
    );
};

export default App;
