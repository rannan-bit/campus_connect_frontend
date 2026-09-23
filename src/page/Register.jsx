import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      // Check if email already exists
      const response = await fetch(
        `http://localhost:3000/users?email=${formData.email}`
      );

      const users = await response.json();

      if (users.length > 0) {
        alert("Email already registered");
        return;
      }

      // Create user
      const registerResponse = await fetch(
        "http://localhost:3000/users",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }
      );

      if (!registerResponse.ok) {
        throw new Error("Registration failed");
      }

      alert("Registration successful!");

      navigate("/login");

    } catch (error) {

      console.error(error);
      alert("Something went wrong");

    }
  };

  return (
    <Container className="auth-page">

      <Card className="auth-card">

        <Card.Body>

          <h2>Create Account</h2>

          <p className="text-muted">
            Join Campus Connect
          </p>

          <Form onSubmit={handleRegister}>

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>

              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>


            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>

              <Form.Control
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>


            <Button
              type="submit"
              variant="primary"
              className="w-100"
            >
              Register
            </Button>

          </Form>


          <p className="text-center mt-3">

            Already have an account?{" "}

            <Link to="/login">
              Login
            </Link>

          </p>

        </Card.Body>

      </Card>

    </Container>
  );
}

export default Register;