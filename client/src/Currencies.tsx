import { useQuery, gql } from '@apollo/client';
import CurrencyList from './CurrencyList'

const GET_CURRENCIES = gql`
  query GetCurrencies {
    currencies {
      id
      success
      timestamp
      base
      date
      rates {
        currency
        value
      }
    }
  }
`;

type Rate = {
  currency: string
  value: number
}

export type Currency = {
  id: string
  success: boolean
  timestamp: number
  base: string
  date: string
  rates: [Rate]
}

const Currencies = () => {
  const { loading, error, data, refetch } = useQuery(GET_CURRENCIES, {
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;
  const currencies: [Currency] = data.currencies

  const handleRefresh = () => refetch()

  return (
    <div>
      <button onClick={handleRefresh}>Refresh</button>
      {currencies ? (
        <CurrencyList currencies={currencies} />
      ) : (
        <p>No data</p>
      )}
    </div>
  )
}

export default Currencies