import React, {useState, useEffect} from 'react'
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import app from "./base";
import './App.css';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        app.auth().onAuthStateChanged(user => {
            setUser(user);
        })
    }, [])

  return (
    <div className="App">
        {user ? <Home user={user} /> : <Login />}
    </div>
  );
}

export default App;
