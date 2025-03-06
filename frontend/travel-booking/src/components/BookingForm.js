import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Modal, Button, Form, Container } from "react-bootstrap";

const ADD_BOOKING = gql`
    mutation AddBooking($name: String!, $email: String!, $pickupPoint: String!, $destination: String!, $date: String!) {
        addBooking(name: $name, email: $email, pickupPoint: $pickupPoint, destination: $destination, date: $date) {
            id
            name
            email
            pickupPoint
            destination
            date
        }
    }
`;

const GET_BOOKINGS = gql`
    query {
        getBookings {
            id
            name
            email
            pickupPoint
            destination
            date
        }
    }
`;

const BookingForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        pickupPoint: "",
        destination: "",
        date: "",
    });

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const [addBooking, { loading, error }] = useMutation(ADD_BOOKING, {
        refetchQueries: [{ query: GET_BOOKINGS }], // ✅ Refetch booking list after mutation
        onCompleted: () => {
            setModalMessage("Booking Successful!");
            setShowModal(true);
            setFormData({ name: "", email: "", pickupPoint: "", destination: "", date: "" });
        },
        onError: () => {
            setModalMessage("Booking Failed. Please try again.");
            setShowModal(true);
        }
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addBooking({ variables: formData });
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center">Book Your Trip</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Pickup Point</Form.Label>
                    <Form.Control type="text" name="pickupPoint" value={formData.pickupPoint} onChange={handleChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Destination</Form.Label>
                    <Form.Control type="text" name="destination" value={formData.destination} onChange={handleChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
                </Form.Group>
                <Button className="mt-3 w-100" variant="primary" type="submit" disabled={loading}>
                    {loading ? "Booking..." : "Book Now"}
                </Button>
            </Form>

            {/* ✅ Success/Error Dialog Box */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Booking Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default BookingForm;
