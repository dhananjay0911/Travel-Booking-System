const Booking = require("../models/Booking");

const resolvers = {
    Query: {
        getBookings: async () => await Booking.find(),
    },
    Mutation: {
        addBooking: async (_, { name, email, pickupPoint, destination, date }) => {
            const newBooking = new Booking({ name, email, pickupPoint, destination, date });
            return await newBooking.save();
        },
        updateBooking: async (_, { id, name, email, pickupPoint, destination, date }) => {
            return await Booking.findByIdAndUpdate(id, { name, email, pickupPoint, destination, date }, { new: true });
        },
        deleteBooking: async (_, { id }) => {
            await Booking.findByIdAndDelete(id);
            return "Booking deleted successfully";
        },
    }
};

module.exports = resolvers;
