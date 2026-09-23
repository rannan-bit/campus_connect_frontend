import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      `http://localhost:3000/users?email=${encodeURIComponent(email)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const users = await response.json();

    console.log("Users found:", users);

    if (users.length === 0) {
      alert("Email not registered");
      return;
    }

    const user = users[0];

    if (user.password !== password) {
      alert("Incorrect password");
      return;
    }

    // Don't store password
    const loggedInUser = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    localStorage.setItem(
      "user",
      JSON.stringify(loggedInUser)
    );

    alert("Login successful!");
    

    navigate("/");

  } catch (error) {
    console.error(error);
    alert("Login failed");
  }
};

  return (
    <Container className="auth-page">

      <Card className="auth-card">

        <Card.Body>

          <h2>Welcome Back</h2>

          <p className="text-muted">
            Login to Campus Connect
          </p>

          <Form onSubmit={handleLogin}>

            <Form.Group className="mb-3">

              <Form.Label>
                Email
              </Form.Label>

              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </Form.Group>


            <Form.Group className="mb-4">

              <Form.Label>
                Password
              </Form.Label>

              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

            </Form.Group>


            <Button
              type="submit"
              variant="primary"
              className="w-100"
            >
              Login
            </Button>

          </Form>


          <p className="text-center mt-3">

            Don't have an account?{" "}

            <Link to="/register">
              Register
            </Link>

          </p>

        </Card.Body>

      </Card>

    </Container>
  );
}

export default Login;