import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import * as dotenv from 'dotenv';
import { RESTDataSource } from '@apollo/datasource-rest';
dotenv.config();
class ExchangeRatesAPI extends RESTDataSource {
    constructor(options) {
        super(options);
        this.baseURL = 'https://api.apilayer.com/exchangerates_data/';
        this.token = options.token;
    }
    willSendRequest(_path, request) {
        request.headers['apikey'] = this.token;
    }
    async getLatestCurrencyRates(base, symbols) {
        const data = await this.get(`latest?symbols=${symbols}&base=${base}`);
        return data;
    }
}
const typeDefs = `#graphql
  type Rate {
    GBP: Float
    EUR: Float
    JPY: Float
    CHF: Float
    CAD: Float
    AUD: Float
    CNY: Float
    ZAR: Float
    RUB: Float
    BRL: Float
    HKD: Float
    MXN: Float
  }

  type Currency {
    success: Boolean!
    timestamp: Int!
    base: String!
    date: String!
    rates: Rate
  }

  type Query {
    getExchangeRates(base: String!, symbols: String!): Currency
  }
`;
const resolvers = {
    Query: {
        getExchangeRates: async (_source, _args, { dataSources }) => {
            return dataSources.ExchangeRatesAPI.getLatestCurrencyRates(_args.base, _args.symbols);
        },
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    context: async () => {
        const { cache } = server;
        return {
            dataSources: {
                ExchangeRatesAPI: new ExchangeRatesAPI({ token: process.env.API_KEY, cache }),
            },
        };
    },
});
console.log(`🚀  Server ready at: ${url}`);
