import React, { useState, useContext, useEffect } from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import UserContext from "../../context/UserContext";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";
import ErrorNotice from "../../components/misc/ErrorNotice";
import "./Login.css";
import Axios from "axios";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  const history = useHistory();

  const { setUserData } = useContext(UserContext);

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

  const LogInUser = async (e) => {
    e.preventDefault();

    try {
      const loginRes = await Axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      localStorage.setItem("auth-token", loginRes.data.token);

      history.push("/app/dashboard");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  const responseGoogle = async (res) => {
    try {
      const googleRes = await Axios.post(
        "http://localhost:5000/auth/googlelogin",
        {
          tokenId: res.tokenId,
        }
      );

      setUserData({
        token: googleRes.data.token,
        user: googleRes.data.user.id,
      });

      localStorage.setItem("auth-token", googleRes.data.token);

      history.push("/app/dashboard");
    } catch (error) {
      console.log("responseGoogle -> error", error);
    }
  };

  return (
    <div>
      <h2>Log In</h2>
      {error && <ErrorNotice message={error} />}
      <Form onSubmit={LogInUser}>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>

        <Button>Log In</Button>
      </Form>
      <br />
      <p>
        Don't have an account? <a href="/users/register">Sign up here</a>
      </p>
      <hr />
      <div className="google-login">
        <GoogleLogin
          clientId="679676510970-e025pl5387i4uc4gnohqn70ss5au4l2c.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
}
