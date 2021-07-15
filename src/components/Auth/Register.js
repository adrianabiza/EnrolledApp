import React, { useRef, useState } from "react";
import {
  Form,
  Button,
  Card,
  Alert,
  Container,
  FormCheck,
} from "react-bootstrap";
import { useAuth } from "./Auth";
import { Link, useHistory } from "react-router-dom";
import "./Auth.css";
import FirstNav from "../common/Navbar/FirstNav";
import firebase from "../../firebase";

export default function Register() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isProf, setIsProf] = useState(false);
  const history = useHistory();

  const userRef = firebase.firestore().collection("Users");

  async function handleSubmit(e) {
    e.preventDefault();

    register();

    addUser();

    setLoading(false);
  }

  async function register() {
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/dashboard");
    } catch {
      setError("Failed to create an account");
    }
  }

  async function addUser() {
    const newUser = {
      firstName: `${firstNameRef.current.value}`,
      lastName: `${lastNameRef.current.value}`,
      email: `${emailRef.current.value}`,
      isProf: `${isProf}`,
    };
    userRef
      .doc(emailRef.current.value)
      .set(newUser)
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <FirstNav />
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="w-100"
          style={{ maxWidth: "400px", marginTop: 75, marginBottom: 30 }}
        >
          <Card className="container">
            <Card.Body>
              <h2 className="text-center mb-4">Register</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" ref={firstNameRef} required />
                </Form.Group>
                <Form.Group id="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" ref={lastNameRef} required />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>
                {/* <FormCheck label='I am a proffesor' name='isProf' onChange={()=>setIsProf(!isProf)}/> */}
                <Button disabled={loading} className="w-100" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2 switch-form">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
