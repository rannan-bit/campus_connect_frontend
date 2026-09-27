import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";


function ItemDetails() {

    const { id } = useParams();
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem("user"))

    const [item, setItem] = useState(null)

    useEffect(() => {
        getItem()
    }, [id])

    const getItem = async () => {
        try {
            const response = await axios.get(
                `https://campus-connect-server-1.onrender.com/items/${id}`
            )
            setItem(response.data)
        }
        catch (error) {
            console.error(error);

        }
    }



    const isOwner = user && item && String(user.id) === String(item.userId)


    const handleDelete = async () => {
        try {
            await axios.delete(`https://campus-connect-server-1.onrender.com/items/${item.id}`)
            alert("Item deleted successfully")
            navigate("/")
        }
        catch (error) {
            console.error(error);
            alert("Failed to delete item")

        }
    }



    // Temporary data
    // Later this will come from your backend using the id
    //   const item = {
    //     id: id,
    //     name: "Black Wallet",
    //     image: "/images/wallet.jpg",
    //     location: "College Library",
    //     category: "Accessories",
    //     type: "lost",
    //     userName: "Rahul",
    //     email: "rahul@gmail.com"
    //   };

    const handleContact = () => {
        window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${item.email}`;
    };
    if (!item) {
       return(
         <Container className="py-5 text-center">
            <p>Loading item...</p>
        </Container>
       )
    }

    return (
        <div className="item-details-page">

            <Container className="py-4 py-md-5">

                {/* Back Button */}
                <div className="mb-4">
                    <Link
                        to="/"
                        className="text-decoration-none text-primary fw-semibold"
                    >
                        ← Back to items
                    </Link>
                </div>


                {/* Main Details Card */}
                <Card className="border-0 shadow-sm rounded-4">

                    <Card.Body className="p-3 p-sm-4 p-md-5">

                        {/* Header */}
                        <div className="mb-4">

                            <span
                                className={`badge rounded-pill px-3 py-2 ${item.type === "lost"
                                    ? "bg-danger"
                                    : "bg-success"
                                    }`}
                            >
                                {item.type === "lost"
                                    ? "LOST ITEM"
                                    : "FOUND ITEM"}
                            </span>

                            <h1 className="fw-bold mt-3 mb-2">
                                {item.name}
                            </h1>

                            <p className="text-muted mb-0">
                                {item.type === "lost"
                                    ? "This item has been reported as lost."
                                    : "This item has been reported as found."}
                            </p>

                        </div>


                        <hr />


                        {/* Item Information */}
                        <Row className="g-4 mt-1">

                            {/* Location */}
                            <Col xs={12} md={6}>

                                <div className="p-3 bg-light rounded-3 h-100">

                                    <small className="text-muted d-block mb-1">
                                        Location
                                    </small>

                                    <h6 className="fw-semibold mb-0">
                                        📍 {item.location}
                                    </h6>

                                </div>

                            </Col>


                            {/* Category */}
                            <Col xs={12} md={6}>

                                <div className="p-3 bg-light rounded-3 h-100">

                                    <small className="text-muted d-block mb-1">
                                        Category
                                    </small>

                                    <h6 className="fw-semibold text-capitalize mb-0">
                                        🏷️ {item.category}
                                    </h6>

                                </div>

                            </Col>

                        </Row>


                        {/* Description */}
                        {item.description && (

                            <div className="mt-4">

                                <h5 className="fw-bold mb-2">
                                    Description
                                </h5>

                                <div className="bg-light rounded-3 p-3">

                                    <p className="text-secondary mb-0 lh-lg">
                                        {item.description}
                                    </p>

                                </div>

                            </div>

                        )}


                        <hr className="my-4" />


                        {/* Posted By */}
                        <div>

                            <h5 className="fw-bold mb-3">
                                Posted By
                            </h5>

                            <div className="d-flex align-items-center">

                                {/* Avatar */}
                                <div
                                    className="bg-primary text-white rounded-circle
                         d-flex align-items-center
                         justify-content-center
                         fw-bold flex-shrink-0"
                                    style={{
                                        width: "50px",
                                        height: "50px"
                                    }}
                                >
                                    {item.userName
                                        ?.charAt(0)
                                        .toUpperCase()}
                                </div>


                                {/* User Details */}
                                <div className="ms-3">

                                    <h6 className="fw-bold mb-1">
                                        {item.userName}
                                    </h6>

                                    <small className="text-muted">
                                        {item.email}
                                    </small>

                                </div>

                            </div>

                        </div>


                        {/* Actions */}
                        <div className="mt-4">

                            {/* Other logged-in user */}
                            {user && !isOwner && (

                                <Button
                                    onClick={handleContact}
                                    variant="primary"
                                    size="lg"
                                    className="w-100 rounded-3"
                                >
                                    ✉️ Contact {item.userName}
                                </Button>

                            )}


                            {/* Owner */}
                            {isOwner && (

                                <div>
                                    <Button
                                        as={Link}
                                        to={`/edit/${item.id}`}
                                        variant="primary"
                                        className="w-100 rounded-3 my-2"
                                    >
                                    Edit Post
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="lg"
                                        onClick={handleDelete}
                                        className="w-100 rounded-3"
                                    >
                                    Delete Post
                                    </Button>
                                </div>



                            )}


                            {/* Logged-out user */}
                            {!user && (

                                <div className="text-center">

                                    <p className="text-muted mb-3">
                                        Login to contact the person who
                                        posted this item.
                                    </p>

                                    <Button
                                        as={Link}
                                        to="/login"
                                        variant="outline-primary"
                                        size="lg"
                                        className="w-100 rounded-3"
                                    >
                                        Login to Contact
                                    </Button>

                                </div>

                            )}

                        </div>

                    </Card.Body>

                </Card>

            </Container>

        </div>

    );

}

export default ItemDetails;