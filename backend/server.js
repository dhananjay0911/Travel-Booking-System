const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const typeDefs = require("./schema/bookingSchema");
const resolvers = require("./resolvers/bookingResolver");

dotenv.config();
connectDB();

const app = express();
app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers });
async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    app.listen(process.env.PORT || 5000, () => {
        console.log(`🚀 Server running at http://localhost:${process.env.PORT || 5000}/graphql`);
    });
}
startServer();
