import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

function ItemCard({ item }) {
  return (
    <Card className="h-100 border-0 shadow-sm rounded-4">

      <Card.Body className="p-4 d-flex flex-column">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">

          <Badge
            bg={item.type === "lost" ? "danger" : "success"}
            className="px-3 py-2 rounded-pill"
          >
            {item.type === "lost" ? "LOST" : "FOUND"}
          </Badge>

          <small className="text-muted text-capitalize">
            {item.category}
          </small>

        </div>

        {/* Item Name */}
        <Card.Title className="fw-bold mb-3">
          {item.name}
        </Card.Title>

        {/* Location */}
        <div className="mb-2">
          <small className="text-muted">
            Location
          </small>

          <div className="fw-semibold text-dark">
            {item.location}
          </div>
        </div>

        {/* Description */}
        {item.description && (
          <div className="mb-4">

            <small className="text-muted">
              Description
            </small>

            <p className="text-secondary mb-0 mt-1">
              {item.description}
            </p>

          </div>
        )}

        {/* Button */}
        <Button
          as={Link}
          to={`/item/${item.id}`}
          variant="primary"
          className="w-100 mt-auto rounded-3"
        >
          See Details
        </Button>

      </Card.Body>

    </Card>
  );
}

export default ItemCard;
