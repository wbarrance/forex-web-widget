import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
const currencies = [
    {
        id: "1",
        success: true,
        timestamp: 1676964831,
        base: "USD",
        date: "2023-02-21",
        rates: {
            GBP: 0.83091,
            JPY: 134.173,
            EUR: 0.93577,
        }
    },
    {
        id: "2",
        success: true,
        timestamp: 1676964831,
        base: "GBP",
        date: "2023-02-21",
        rates: {
            USD: 1.20327,
            JPY: 161.457,
            EUR: 1.12605,
        }
    },
    {
        id: "3",
        success: true,
        timestamp: 1676964831,
        base: "EUR",
        date: "2023-02-21",
        rates: {
            USD: 1.06848,
            JPY: 143.371,
            GBP: 0.88787,
        }
    },
    {
        id: "4",
        success: true,
        timestamp: 1676964831,
        base: "JPY",
        date: "2023-02-21",
        rates: {
            USD: 0.00745,
            GBP: 0.00619,
            EUR: 0.00697,
        }
    },
];
const typeDefs = `#graphql
  type Rates {
    GBP: Int
    JPY: Int
    EUR: Int
  }

  type Currency {
    id: ID!
    success: Boolean
    timestamp: Int
    base: String
    date: String
    rates: Rates
  }

  type Query {
    currencies: [Currency]
  }
`;
const resolvers = {
    Query: {
        currencies: () => currencies,
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
