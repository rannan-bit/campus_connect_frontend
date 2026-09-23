import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // Expanded state control for mobile menu collapse on link navigation
  const [expanded, setExpanded] = useState(false);

  // User state
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Sync state with localStorage changes across tabs/components
  useEffect(() => {
    const handleAuthChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("authChange", handleAuthChange);
    window.addEventListener("storage", handleAuthChange); // Catches changes from other browser tabs

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setExpanded(false);

    // Dispatch custom event so rest of app stays in sync
    window.dispatchEvent(new Event("authChange"));

    navigate("/");
  };

  return (
    <Navbar
      expanded={expanded}
      onToggle={setExpanded}
      expand="lg"
      bg="dark"
      variant="dark"
      sticky="top"
      className="shadow-sm border-bottom border-secondary border-opacity-25 py-2"
    >
      <Container>
        {/* Brand / Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          onClick={() => setExpanded(false)}
          className="fw-bold fs-4 d-flex align-items-center gap-1"
        >
          <span>Campus</span>
          <span className="text-info">Connect</span>
        </Navbar.Brand>

        {/* Mobile Toggle Button */}
        <Navbar.Toggle aria-controls="campus-navbar" className="border-0 shadow-none" />

        {/* Collapsible Content */}
        <Navbar.Collapse id="campus-navbar" className="mt-2 mt-lg-0">
          {/* Main Navigation Links */}
          <Nav className="mx-auto align-items-lg-center">
            <Nav.Link
              as={Link}
              to="/"
              active={location.pathname === "/"}
              onClick={() => setExpanded(false)}
              className="px-3 fw-medium"
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/report"
              active={location.pathname === "/report"}
              onClick={() => setExpanded(false)}
              className="px-3 fw-medium"
            >
              Report Item
            </Nav.Link>
          </Nav>

          {/* Right Action / Auth Buttons */}
          <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-2 pt-3 pt-lg-0 border-top border-secondary border-opacity-25 border-lg-0">
            {user ? (
              <div className="d-flex align-items-center justify-content-between justify-content-lg-end gap-3 w-100">
                {/* User Greeting */}
                <div className="text-white small">
                  <span className="text-muted">Welcome, </span>
                  <span className="fw-semibold text-info">
                    {user.name || user.displayName || "User"}
                  </span>
                </div>

                {/* Logout Button */}
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleLogout}
                  className="px-3 rounded-pill fw-semibold"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="d-flex flex-column flex-sm-row gap-2 w-100 w-lg-auto">
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-info"
                  size="sm"
                  onClick={() => setExpanded(false)}
                  className="px-3 rounded-pill fw-semibold"
                >
                  Log In
                </Button>

                <Button
                  as={Link}
                  to="/register"
                  variant="info"
                  size="sm"
                  onClick={() => setExpanded(false)}
                  className="px-3 rounded-pill fw-semibold text-dark"
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;