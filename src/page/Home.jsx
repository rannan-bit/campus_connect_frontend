import React, { useEffect, useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Form,
  Badge,
  InputGroup
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import axios from "axios";

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all"); // 'all', 'lost', 'found'

  const getItems = async () => {
    try {
      const response = await axios.get("https://campus-connect-server-1.onrender.com/items");
      setItems(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  // Filter items dynamically based on search query and filter selection
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        filterType === "all" ||
        item.type?.toLowerCase() === filterType.toLowerCase();

      return matchesSearch && matchesType;
    });
  }, [items, searchQuery, filterType]);

  return (
    <div className="home-page bg-light min-vh-100">
      {/* ================= HERO SECTION ================= */}
      <section className="bg-dark text-white py-5 mb-5 shadow-sm">
        <Container className="py-4">
          <Row className="align-items-center gy-4">
            <Col lg={7}>
              <Badge bg="info" className="text-dark mb-3 px-3 py-2 rounded-pill fw-semibold fs-6">
                🎓 Campus Lost & Found Hub
              </Badge>

              <h1 className="display-4 fw-bold mb-3 lh-sm">
                Lost something on campus? <br />
                <span className="text-info">Let's help you find it.</span>
              </h1>

              <p className="lead text-secondary mb-4 col-lg-10">
                Campus Connect helps students report lost items, share found belongings,
                and reconnect items with their rightful owners effortlessly.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <Button
                  as={Link}
                  to="/report"
                  variant="info"
                  size="lg"
                  className="fw-bold px-4 py-2 rounded-pill"
                >
                  Report Lost / Found Item
                </Button>
                <a
                  href="#recent-items"
                  className="btn btn-outline-light size-lg px-4 py-2 rounded-pill fw-semibold"
                >
                  Browse Items
                </a>
              </div>
            </Col>
            
            <Col lg={5} className="d-none d-lg-block text-center">
              <div className="p-4 rounded-4 bg-secondary bg-opacity-10 border border-secondary border-opacity-25 shadow-lg">
                <div className="display-1">🔍 📦 🤝</div>
                <h5 className="mt-3 text-light">Reconnecting Campus</h5>
                <p className="small text-secondary mb-0">
                  Fast, direct, and safe way to find your missing items.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-4 mb-5">
        <Container>
          <div className="text-center mb-5">
            <span className="text-info fw-bold text-uppercase tracking-wider fs-6">
              How It Works
            </span>
            <h2 className="fw-bold fs-1 text-dark mt-1">Simple 3-Step Process</h2>
            <p className="text-muted">Connecting owners with their lost belongings quickly.</p>
          </div>

          <Row className="g-4">
            <Col xs={12} md={4}>
              <Card className="border-0 shadow-sm rounded-4 h-100 text-center py-3">
                <Card.Body>
                  <div className="badge bg-light text-primary rounded-circle p-3 mb-3 fs-3 shadow-sm">
                    📝
                  </div>
                  <h4 className="fw-bold">1. Report</h4>
                  <p className="text-muted small">
                    Post details and location about an item you have lost or found anywhere on campus.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={4}>
              <Card className="border-0 shadow-sm rounded-4 h-100 text-center py-3">
                <Card.Body>
                  <div className="badge bg-light text-primary rounded-circle p-3 mb-3 fs-3 shadow-sm">
                    🔍
                  </div>
                  <h4 className="fw-bold">2. Search</h4>
                  <p className="text-muted small">
                    Browse recent reports using search keywords or filter by lost/found category.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={4}>
              <Card className="border-0 shadow-sm rounded-4 h-100 text-center py-3">
                <Card.Body>
                  <div className="badge bg-light text-primary rounded-circle p-3 mb-3 fs-3 shadow-sm">
                    🤝
                  </div>
                  <h4 className="fw-bold">3. Reconnect</h4>
                  <p className="text-muted small">
                    Directly contact the reporter to verify ownership and arrange a safe return.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= RECENT ITEMS ================= */}
      <section id="recent-items" className="py-4 mb-5">
        <Container>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <span className="text-info fw-bold text-uppercase fs-6">Live Feed</span>
              <h2 className="fw-bold fs-2 text-dark m-0">Recent Reports</h2>
            </div>

            {/* Search and Filter Controls */}
            <div className="d-flex flex-column flex-sm-row gap-2">
              <InputGroup style={{ maxWidth: "300px" }}>
                <Form.Control
                  type="text"
                  placeholder="Search item or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-start-pill border-end-0"
                />
                <Button variant="outline-secondary" className="rounded-end-pill bg-white">
                  🔍
                </Button>
              </InputGroup>

              <div className="btn-group" role="group">
                <Button
                  variant={filterType === "all" ? "info" : "outline-secondary"}
                  size="sm"
                  onClick={() => setFilterType("all")}
                >
                  All
                </Button>
                <Button
                  variant={filterType === "lost" ? "info" : "outline-secondary"}
                  size="sm"
                  onClick={() => setFilterType("lost")}
                >
                  Lost
                </Button>
                <Button
                  variant={filterType === "found" ? "info" : "outline-secondary"}
                  size="sm"
                  onClick={() => setFilterType("found")}
                >
                  Found
                </Button>
              </div>
            </div>
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="text-center py-5">
              <Spinner animation="border" variant="info" />
              <p className="text-muted mt-3 fw-medium">Loading reported items...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredItems.length === 0 && (
            <Card className="border-0 shadow-sm text-center py-5 rounded-4">
              <Card.Body>
                <div className="display-3 mb-3">🔎</div>
                <h4 className="fw-bold text-dark">No items found</h4>
                <p className="text-muted">
                  {searchQuery || filterType !== "all"
                    ? "Try adjusting your search query or filters."
                    : "Be the first person to report a lost or found item."}
                </p>
                <Button
                  as={Link}
                  to="/report"
                  variant="info"
                  className="rounded-pill px-4 fw-semibold mt-2"
                >
                  Report an Item
                </Button>
              </Card.Body>
            </Card>
          )}

          {/* Items Grid */}
          {!loading && filteredItems.length > 0 && (
            <Row className="g-4">
              {filteredItems.map((item) => (
                <Col key={item.id || item._id} xs={12} sm={6} md={4} lg={3}>
                  <ItemCard item={item} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section className="py-5 bg-dark text-white">
        <Container>
          <div className="bg-gradient p-4 p-md-5 rounded-4 border border-secondary border-opacity-25 d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4">
            <div>
              <span className="badge bg-info text-dark mb-2">Help Your Peers</span>
              <h2 className="fw-bold m-0">Found something on campus?</h2>
              <p className="text-secondary mt-2 mb-0">
                Help return belongings to their rightful owners by submitting a quick report.
              </p>
            </div>

            <Button
              as={Link}
              to="/report"
              variant="info"
              size="lg"
              className="px-4 rounded-pill fw-bold text-nowrap"
            >
              Report Found Item
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Home;