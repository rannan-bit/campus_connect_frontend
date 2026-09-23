import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function ReportItem() {
    const navigate = useNavigate()

    const [reportType, setReportType] = useState("lost");

    const [formData, setFormData] = useState({
        itemName: "",
        category: "",
        location: "",
        userName: "",
        email: "",
        description: "",
        image: ""
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            navigate("/login");
            return;
        }

        const newItem = {
            name: formData.itemName,
            category: formData.category,
            location: formData.location,
            description: formData.description,
            type: reportType,
            image: formData.image,
            userId: user.id,
            userName: user.name,
            email: user.email
        };

        try {
            const response = await axios.post(
                "http://localhost:3000/items",
                newItem
            );

            console.log("Saved item:", response.data);

            alert("Item reported successfully!");

            navigate("/");
        } catch (error) {
            console.error("POST ERROR:", error);
            console.log("Response:", error.response);
            console.log("Data:", error.response?.data);

            alert(
                error.response?.data?.message ||
                "Failed to report item"
            );
        }
    };

    const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
        const img = new Image();

        img.onload = () => {
            const canvas = document.createElement("canvas");

            const maxWidth = 150;
            const maxHeight = 150;

            let width = img.width;
            let height = img.height;

            if (width > height) {
                height = height * (maxWidth / width);
                width = maxWidth;
            } else {
                width = width * (maxHeight / height);
                height = maxHeight;
            }

            canvas.width = Math.round(width);
            canvas.height = Math.round(height);

            const ctx = canvas.getContext("2d");

            ctx.drawImage(
                img,
                0,
                0,
                canvas.width,
                canvas.height
            );

            const compressedImage = canvas.toDataURL(
                "image/jpeg",
                0.2
            );

            console.log(
                "Base64 size:",
                Math.round(compressedImage.length / 1024),
                "KB"
            );

            setFormData({
                ...formData,
                image: compressedImage
            });
        };

        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
};

    return (
        <div className="report-page">

            <Container>

                <Row className="justify-content-center">

                    <Col lg={8}>

                        <Card className="report-card">

                            <Card.Body>

                                <div className="report-header">
                                    <span>Campus Connect</span>

                                    <h1>
                                        Report {reportType === "lost" ? "Lost" : "Found"} Item
                                    </h1>

                                    <p>
                                        Help connect lost belongings with their rightful owners.
                                    </p>
                                </div>


                                {/* Report Type */}

                                <div className="report-type">

                                    <button
                                        type="button"
                                        className={
                                            reportType === "lost"
                                                ? "type-btn active"
                                                : "type-btn"
                                        }
                                        onClick={() => setReportType("lost")}
                                    >
                                        🔴 Lost Item
                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            reportType === "found"
                                                ? "type-btn active found-active"
                                                : "type-btn"
                                        }
                                        onClick={() => setReportType("found")}
                                    >
                                        🟢 Found Item
                                    </button>

                                </div>


                                <Form onSubmit={handleSubmit}>

                                    <Row>

                                        {/* Item Name */}

                                        <Col md={6}>
                                            <Form.Group className="mb-4">

                                                <Form.Label>
                                                    Item Name
                                                </Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    name="itemName"
                                                    placeholder="Eg: Black Wallet"
                                                    value={formData.itemName}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </Form.Group>
                                        </Col>


                                        {/* Category */}

                                        <Col md={6}>
                                            <Form.Group className="mb-4">

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
                                        </Col>


                                        {/* Location */}

                                        <Col md={12}>
                                            <Form.Group className="mb-4">

                                                <Form.Label>
                                                    {reportType === "lost"
                                                        ? "Where did you lose it?"
                                                        : "Where did you find it?"
                                                    }
                                                </Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    name="location"
                                                    placeholder="Eg: College Library"
                                                    value={formData.location}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </Form.Group>
                                        </Col>


                                        {/* User Name */}

                                        <Col md={6}>
                                            <Form.Group className="mb-4">

                                                <Form.Label>
                                                    Your Name
                                                </Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    name="userName"
                                                    placeholder="Enter your name"
                                                    value={formData.userName}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </Form.Group>
                                        </Col>


                                        {/* Email */}

                                        <Col md={6}>
                                            <Form.Group className="mb-4">

                                                <Form.Label>
                                                    Email Address
                                                </Form.Label>

                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    placeholder="example@gmail.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </Form.Group>
                                        </Col>


                                        {/* Description */}

                                        <Col md={12}>
                                            <Form.Group className="mb-4">

                                                <Form.Label>
                                                    Description
                                                    <span className="optional">
                                                        Optional
                                                    </span>
                                                </Form.Label>

                                                <Form.Control
                                                    as="textarea"
                                                    rows={4}
                                                    name="description"
                                                    placeholder="Add any details that can help identify the item..."
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                />

                                            </Form.Group>
                                        </Col>


                                        {/* Image */}

                                        {/* <Col md={12}>

                                            <Form.Group className="mb-4">

                                                <Form.Label>
                                                    Item Image
                                                </Form.Label>

                                                <div className="image-upload">

                                                    <Form.Control
                                                        type="file"
                                                        name="image"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        required

                                                    />
                                                    {formData.image && (
                                                        <div className="mt-3">
                                                            <img
                                                                src={formData.image}
                                                                alt="Preview"
                                                                style={{
                                                                    width: "200px",
                                                                    height: "150px",
                                                                    objectFit: "cover",
                                                                    borderRadius: "10px"
                                                                }}
                                                            />
                                                        </div>
                                                    )}

                                                    <p>
                                                        📷 Upload a clear image of the item
                                                    </p>

                                                    <small>
                                                        JPG, JPEG or PNG • Max 5MB
                                                    </small>

                                                </div>

                                            </Form.Group>

                                        </Col> */}

                                    </Row>


                                    {/* Submit */}

                                    <Button
                                        type="submit"
                                        className="submit-btn"
                                        variant="primary"
                                    >
                                        {reportType === "lost"
                                            ? "Report Lost Item"
                                            : "Report Found Item"
                                        }
                                    </Button>

                                </Form>

                            </Card.Body>

                        </Card>

                    </Col>

                </Row>

            </Container>

        </div>
    );
}

export default ReportItem;