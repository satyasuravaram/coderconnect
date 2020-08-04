import React, { useState, useContext, useEffect } from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import ErrorNotice from "../../components/misc/ErrorNotice";
import Axios from "axios";
import "./Register.css";

export default function Register() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
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

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        firstName,
        lastName,
        email,
        password,
        password2,
      };

      await Axios.post("http://localhost:5000/users/register", newUser);

      const loginRes = await Axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });

      console.log(loginRes);

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user.id,
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
  const responseFacebook = async (res) => {
    console.log(res);
    try {
      const facebookRes = await Axios.post(
        "http://localhost:5000/auth/facebooklogin",
        {
          accessToken: res.accessToken,
          userID: res.userID,
        }
      );
      console.log(facebookRes);
      setUserData({
        token: facebookRes.data.token,
        user: facebookRes.data.user.id,
      });

      localStorage.setItem("auth-token", facebookRes.data.token);

      history.push("/app/dashboard");
    } catch (error) {
      console.log("responseFacebook -> error", error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <ErrorNotice message={error} />}
      <Form onSubmit={registerUser}>
        <Row form>
          <Col md={3}>
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>

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

        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="password2">Confirm Password</Label>
              <Input
                type="password"
                name="password2"
                id="password2"
                placeholder="Confirm Password"
                onChange={(e) => setPassword2(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>

        <Button type="submit">Sign Up</Button>
      </Form>
      <br />
      <p>
        Already have an account? <a href="/users/login">Sign In here</a>
      </p>
      <hr />
      <div className="social-login">
        <GoogleLogin
          clientId="679676510970-e025pl5387i4uc4gnohqn70ss5au4l2c.apps.googleusercontent.com"
          buttonText="Sign up with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              class="social-btn loginBtn--google"
            >
              Login with Google
            </button>
          )}
        />
        <FacebookLogin
          appId="3479849305373234"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          cssClass="social-btn facebook-btn"
        />
      </div>
    </div>
  );
}
