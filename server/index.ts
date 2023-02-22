import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import * as dotenv from 'dotenv';
import { RESTDataSource, AugmentedRequest } from '@apollo/datasource-rest';
import type { KeyValueCache } from '@apollo/utils.keyvaluecache';
import { Currency } from './types';

dotenv.config();

class ExchangeRatesAPI extends RESTDataSource {
  override baseURL = 'https://api.apilayer.com/exchangerates_data/';
  private token: string;

  constructor(options: { token: string, cache: KeyValueCache }) {
    super(options);
    this.token = options.token;
  }

  override willSendRequest(_path: string, request: AugmentedRequest) {
    request.headers['apikey'] = this.token;
  }


  async getLatestCurrencyRates(base: string, symbols: string): Promise<Currency> {
    const data = await this.get(`latest?symbols=${symbols}&base=${base}`);
    return data
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

interface ContextValue {
  dataSources: {
    ExchangeRatesAPI: ExchangeRatesAPI;
  };
}

const resolvers = {
  Query: {
    getExchangeRates: async (_source: any, _args: any, { dataSources }) => {
      return dataSources.ExchangeRatesAPI.getLatestCurrencyRates(_args.base, _args.symbols);
    },
  },
};

const server = new ApolloServer<ContextValue>({
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
