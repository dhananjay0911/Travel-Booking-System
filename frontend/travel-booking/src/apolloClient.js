import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:5000/graphql", // Change this if your backend URL is different
    cache: new InMemoryCache(),
});

export default client;
