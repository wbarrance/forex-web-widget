import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
const currencies = [
    {
        id: "1",
        success: true,
        timestamp: 1676964831,
        base: "USD",
        date: "2023-02-21",
        rates: [
            {
                currency: "GBP",
                value: 0.83091
            },
            {
                currency: "JPY",
                value: 134.173
            },
            {
                currency: "EUR",
                value: 0.93577
            }
        ]
    },
    {
        id: "2",
        success: true,
        timestamp: 1676964831,
        base: "GBP",
        date: "2023-02-21",
        rates: [
            {
                currency: "USD",
                value: 1.20327
            },
            {
                currency: "JPY",
                value: 161.457
            },
            {
                currency: "EUR",
                value: 1.12605
            }
        ]
    },
    {
        id: "3",
        success: true,
        timestamp: 1676964831,
        base: "EUR",
        date: "2023-02-21",
        rates: [
            {
                currency: "USD",
                value: 1.06848
            },
            {
                currency: "JPY",
                value: 143.371
            },
            {
                currency: "GBP",
                value: 0.88787
            }
        ]
    },
    {
        id: "4",
        success: true,
        timestamp: 1676964831,
        base: "JPY",
        date: "2023-02-21",
        rates: [
            {
                currency: "USD",
                value: 0.00745
            },
            {
                currency: "GBP",
                value: 0.00619
            },
            {
                currency: "EUR",
                value: 0.00697
            }
        ]
    },
];
const typeDefs = `#graphql
  type Rate {
    currency: String!
    value: Float!
  }

  type Currency {
    id: ID!
    success: Boolean!
    timestamp: Int!
    base: String!
    date: String!
    rates: [Rate!]!
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
