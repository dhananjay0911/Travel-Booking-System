// import React from "react";
// import { useQuery, gql } from "@apollo/client";
// import { Button, Table, Container } from "react-bootstrap";

// const GET_BOOKINGS = gql`
//     query {
//         getBookings {
//             id
//             name
//             email
//             pickupPoint
//             destination
//             date
//         }
//     }
// `;

// const BookingList = () => {
//     const { loading, error, data } = useQuery(GET_BOOKINGS, {
//         fetchPolicy: "network-only",
//     });

//     console.log("Fetched Bookings:", data); // ✅ Debugging step

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error loading bookings.</p>;

//     if (!data || !data.getBookings || data.getBookings.length === 0) {
//         return <p>No bookings found.</p>;
//     }

//     return (
//         <Container>
//             <h2 className="text-center my-3">Booking List</h2>
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Pickup</th>
//                         <th>Destination</th>
//                         <th>Date</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.getBookings.map((booking) => (
//                         <tr key={booking.id}>
//                             <td>{booking.name}</td>
//                             <td>{booking.email}</td>
//                             
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </Container>
//     );
// };

// export default BookingList;

// import React from "react";
// import { useQuery, useMutation, gql } from "@apollo/client";
// import { Button, Table } from "react-bootstrap";
// import { toast } from "react-toastify";

// const GET_BOOKINGS = gql` query { getBookings { id name email pickupPoint destination date } } `;
// const DELETE_BOOKING = gql` mutation DeleteBooking($id: ID!) { deleteBooking(id: $id) } `;

// const BookingList = () => {
//     const { loading, error, data } = useQuery(GET_BOOKINGS, { fetchPolicy: "network-only" });
//     const [deleteBooking] = useMutation(DELETE_BOOKING, { refetchQueries: [{ query: GET_BOOKINGS }] });

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error loading bookings.</p>;

//     return (
//         <Table striped bordered hover>
//             <thead>
//                 <tr><th>Name</th><th>Email</th> <th>Pickup</th>
//                          <th>Destination</th>
//                          <th>Date</th> <th>Actions</th> </tr>
//             </thead>
//             <tbody>
//                 {data.getBookings.map((booking) => (
//                     <tr key={booking.id}>
//                         <td>{booking.name}</td>
//                         <td>{booking.email}</td>
//                         <td>{booking.pickupPoint}</td>
//                         <td>{booking.destination}</td>
//                         <td>{booking.date}</td>
//                         <td>
//                             <Button variant="danger" onClick={() => {
//                                 deleteBooking({ variables: { id: booking.id } });
//                                 toast.success("Booking Deleted!");
//                             }}>Delete</Button>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </Table>
//     );
// };

// export default BookingList;

import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";

// GraphQL Queries and Mutations
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

const DELETE_BOOKING = gql`
  mutation DeleteBooking($id: ID!) {
    deleteBooking(id: $id)
  }
`;

const UPDATE_BOOKING = gql`
  mutation UpdateBooking($id: ID!, $name: String!, $email: String!, $pickupPoint: String!, $destination: String!, $date: String!) {
    updateBooking(id: $id, name: $name, email: $email, pickupPoint: $pickupPoint, destination: $destination, date: $date) {
      id
      name
      email
      pickupPoint
      destination
      date
    }
  }
`;

const BookingList = () => {
  const { loading, error, data } = useQuery(GET_BOOKINGS, { fetchPolicy: "network-only" });
  const [deleteBooking] = useMutation(DELETE_BOOKING, { refetchQueries: [{ query: GET_BOOKINGS }] });
  const [updateBooking] = useMutation(UPDATE_BOOKING, { refetchQueries: [{ query: GET_BOOKINGS }] });

  const [show, setShow] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading bookings.</p>;

  const handleDelete = (id) => {
    deleteBooking({ variables: { id } });
    toast.success("Booking Deleted!");
  };

  const handleUpdate = (booking) => {
    setSelectedBooking(booking);
    setShow(true);
  };

  const handleSave = () => {
    updateBooking({ variables: { ...selectedBooking } });
    toast.success("Booking Updated Successfully!");
    setShow(false);
  };

  return (
    <div className="container mt-4">
      <Table responsive="lg" striped bordered hover className="table-sm">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Pickup</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.getBookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.name}</td>
              <td>{booking.email}</td>
              <td>{booking.pickupPoint}</td>
              <td>{booking.destination}</td>
              <td>{booking.date}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleUpdate(booking)}>
                  Update
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(booking.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Update Booking Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking && (
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedBooking.name}
                  onChange={(e) => setSelectedBooking({ ...selectedBooking, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={selectedBooking.email}
                  onChange={(e) => setSelectedBooking({ ...selectedBooking, email: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Pickup Point</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedBooking.pickupPoint}
                  onChange={(e) => setSelectedBooking({ ...selectedBooking, pickupPoint: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Destination</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedBooking.destination}
                  onChange={(e) => setSelectedBooking({ ...selectedBooking, destination: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedBooking.date}
                  onChange={(e) => setSelectedBooking({ ...selectedBooking, date: e.target.value })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookingList;
