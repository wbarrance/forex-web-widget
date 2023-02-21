import { useQuery, NetworkStatus } from '@apollo/client';
import { GET_EXCHANGE_RATES } from './queries';
import { Currency } from './types';
import CurrencyList from './CurrencyList';

const CurrencyWidget = () => {
  const { loading, error, data, refetch, networkStatus } = useQuery(GET_EXCHANGE_RATES, {
    variables: { base: "USD", symbols: "GBP,EUR,JPY,CHF,CAD,AUD,CNY,ZAR,RUB,BRL,HKD,MXN" },
    pollInterval: 1000 * 60 * 2, // polls API every 2 minutes
    notifyOnNetworkStatusChange: true,
  });

  if (networkStatus === NetworkStatus.refetch) return <p>Refetching!</p>
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  const currency: Currency = data.getExchangeRates;

  const handleRefresh = () => refetch();

  const handleDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);

    return date.toDateString()
  }

  return (
    <div>
      <button onClick={handleRefresh}>Refresh</button>
      {currency ? (
        <>
        <h2>{currency.base} Exchange Rates</h2>
          <CurrencyList rates={currency.rates} />
        </>
      ) : (
        <p>No data</p>
      )}
      <p>Rates {handleDate(currency.timestamp)}</p>
    </div>
  )
}

export default CurrencyWidget