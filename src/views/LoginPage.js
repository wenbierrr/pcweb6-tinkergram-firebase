import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { GoogleLogin } from '@react-oauth/google';
import './LoginPage.css'; // Import custom CSS file

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    // Handle Google login success
    navigate("/");
  };

  const handleGoogleLoginFailure = () => {
    console.log('Login Failed');
    setError('Google login failed. Please try again.');
  };

  return (
    <Container className="login-container">
      <h1 className="my-3 text-center">Login to your account</h1>
      <Form className="login-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="/signup" className="signup-link">Sign up for an account</a>
        </Form.Group>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button
            variant="primary"
            onClick={async (e) => {
              setError(""); // set error text to empty
              const canLogin = username && password;
              if (canLogin) {
                try {
                  await signInWithEmailAndPassword(auth, username, password);
                  navigate("/");
                } catch (error) {
                  setError(error.message);
                }
              }
            }}
          >
            Login
          </Button>
        </div>

        <div className="google-login-button">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
          />
        </div>

        {error && <p className="text-danger mt-3">{error}</p>}
      </Form>
    </Container>
  );
}
