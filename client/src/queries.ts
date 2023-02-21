import { gql } from '@apollo/client';

export const GET_EXCHANGE_RATES = gql`
  query GetExchangeRates($base: String!, $symbols: String!) {
    getExchangeRates(base: $base, symbols: $symbols) {
      success
      timestamp
      base
      date
      rates {
        GBP
        EUR
        JPY
        CHF
        CAD
        AUD
        CNY
        ZAR
        RUB
        BRL
        HKD
        MXN
      }
    }
  }
`;

