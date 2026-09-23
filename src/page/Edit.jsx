import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Edit() {
    const { id } = useParams()
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem("user"))

    const [formData, setFormData] = useState({
        itemName: "",
        category: "",
        location: "",
        description: "",
        type: ""
    });

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getItem()
    }, [id])

    const getItem = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/items/${id}`
            )
            const item = response.data

            if (!user || String(user.id) !== String(item.userId)) {
                alert("You are not allowed to edit this!")
                navigate("/")
                return

            }

            setFormData({
                itemName: item.name,
                category: item.category,
                location: item.location,
                description: item.description || "",
                type: item.type
            });
            setLoading(false)

        } catch (error) {

            console.error(error)

            alert("Failed to load item")

            navigate("/")
        }
    }

    const handleChange = (e) => {

        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedItem = {

                name: formData.itemName,
                category: formData.category,
                location: formData.location,
                description: formData.description,
                type: formData.type,
                userId: user.id,
                userName: user.name,
                email: user.email
            };


            await axios.put(
                `http://localhost:3000/items/${id}`,
                updatedItem
            );


            alert("Item updated successfully!")

            navigate(`/item/${id}`)

        } catch (error) {
            console.error(error)
            alert("Failed to update item")

        }

    };


    if (loading) {
        return (
            <Container className="py-5 text-center">
                <p>Loading item...</p>
            </Container>
        );

    }
    return (
        
        <Container className="py-4 py-md-5">

      <Card className="border-0 shadow-sm">

        <Card.Body className="p-4 p-md-5">

          <h2 className="fw-bold mb-4">
            Edit Item
          </h2>


          <Form onSubmit={handleSubmit}>

            {/* Item Name */}

            <Form.Group className="mb-3">

              <Form.Label>
                Item Name
              </Form.Label>

              <Form.Control
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                required
              />

            </Form.Group>


            {/* Category */}

            <Form.Group className="mb-3">

              <Form.Label>
                Category
              </Form.Label>

              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select category
                </option>

                <option value="electronics">
                  Electronics
                </option>

                <option value="documents">
                  Documents
                </option>

                <option value="accessories">
                  Accessories
                </option>

                <option value="bags">
                  Bags
                </option>

                <option value="books">
                  Books
                </option>

                <option value="clothing">
                  Clothing
                </option>

                <option value="other">
                  Other
                </option>

              </Form.Select>

            </Form.Group>


            {/* Location */}

            <Form.Group className="mb-3">

              <Form.Label>
                Location
              </Form.Label>

              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />

            </Form.Group>


            {/* Description */}

            <Form.Group className="mb-4">

              <Form.Label>
                Description
              </Form.Label>

              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />

            </Form.Group>


            {/* Buttons */}

            <div className="d-flex gap-2">

              <Button
                type="submit"
                variant="primary"
                className="flex-grow-1"
              >
                Save Changes
              </Button>

              <Button
                type="button"
                variant="outline-secondary"
                onClick={() => navigate(`/item/${id}`)}
                className="flex-grow-1"
              >
                Cancel
              </Button>

            </div>

          </Form>

        </Card.Body>

      </Card>

    </Container>

  );
}

export default Edit