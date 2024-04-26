import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styles from '../styles/login.module.css'

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const logInUser = () => {
        if (username.length === 0) {
            alert("Username cannot be left blank!");
        }
        else if (password.length === 0) {
            alert("Password cannot be left blank.");
        }
        else {
            axios.post('http://127.0.0.1:5000/', {
                username: username,
                password: password
            })
            .then(function (response) {
                console.log(response);
                navigate("/");
            })
            .catch(function (error) {
                console.log(error, 'error');
                if (error.response.status === 401) {
                    alert("Login failed! Make sure to double check that your username and password is correct.");
                }
            });
        }
    }

    return (
      <html lang="en">
          <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <link rel="preconnect" href="https://fonts.gstatic.com" />
              <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet" />
              <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js"></script>
              <link rel="icon" type="image/png" href="Pngtree.jpg" />
              <title>Grabbi Login</title>
          </head>
          <body>
              <h1>Grabbi</h1>
              <img src="../menu.png" alt="Logo" />
              <div className={styles.container}>
                  <form>
                      <p>Login</p>
                      <div className="input-container">
                          <i className="fas fa-user" style={{ color: 'white' }}></i>
                          <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="User ID" />
                      </div>
                      <div className="input-container">
                          <i className="fas fa-lock" style={{ color: 'white' }}></i>
                          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" id="password" />
                      </div>
                      <a href="#">Forgot Password or Username?</a><br />
                      <a href="UserSignUp.html">New Member? Sign up</a><br />
                      <input type="button" onClick={logInUser} value="Sign in" /><br />
                  </form>
                  <div className="drops">
                      <div className="drop drop-1"></div>
                      <div className="drop drop-2"></div>
                      <div className="drop drop-3"></div>
                      <div className="drop drop-4"></div>
                  </div>
              </div>
              <footer>
                  <p><a href="#">Go back to the Homepage</a></p>
              </footer>
          </body>
      </html>
  );
}