import { Rates } from './types'

interface CurrencyListProps {
  rates: Rates
}

const handleRates = (rates: Rates) => {
  const arr = []

  for (const [key, value] of Object.entries(rates)) {
    if (key !== "__typename" ) {
      arr.push({ symbol: key, value })
    }
  }

  return arr
}

const CurrencyList = ({ rates }: CurrencyListProps) => (
  <ul>
    {handleRates(rates).map((rate) => (<li key={rate.symbol}>{rate.symbol} {rate.value}</li>))}
  </ul>
);


export default CurrencyList;

