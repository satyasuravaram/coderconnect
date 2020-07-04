import React, {useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from '../context/UserContext';


export default function Home () {

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        const checkLoggedIn = async () => {
          let token = localStorage.getItem("auth-token");
    
          if (token === null) {
            localStorage.setItem("auth-token", "");
            token = "";
          }
    
          const tokenRes = await Axios.post(
            "http://localhost:5000/users/isTokenValid",
            null,
            { headers: { "x-auth-token": token } }
          );
    
          if (tokenRes.data) {
            const userRes = await Axios.get("http://localhost:5000/users/", {
              headers: { "x-auth-token": token },
            });
    
            setUserData({
              token: token,
              user: userRes.data,
            });
            history.push("/app/dashboard");
          }
        };
    
        checkLoggedIn();
      });
    return (
    <div>
        <h2>Home</h2>
        <br/>
        <p>Welcome to CoderConnect!</p>
        <a href="/users/register"> Register here</a>
        <br/>
        <a href="/users/login"> Login here</a>
    </div>)
}