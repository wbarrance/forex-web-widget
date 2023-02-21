import { useQuery, gql } from '@apollo/client';
import { Currency } from './types'
import CurrencyList from './CurrencyList'

const GET_EXCHANGE_RATES = gql`
  query GetExchangeRates {
    getExchangeRates {
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


const Currencies = () => {
  const { loading, error, data, refetch } = useQuery(GET_EXCHANGE_RATES, {
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;
  const currency: Currency = data.getExchangeRates
  console.log("DATA: ", data)
  const handleRefresh = () => refetch()

  return (
    <div>
      <button onClick={handleRefresh}>Refresh</button>
      {currency ? (
        <>
        <h2>{currency.base}</h2>
          <CurrencyList rates={currency.rates} />
        </>
      ) : (
        <p>No data</p>
      )}
    </div>
  )
}

export default Currencies