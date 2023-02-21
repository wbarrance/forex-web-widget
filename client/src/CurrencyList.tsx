import { Currency } from './Currencies'

interface CurrencyListProps {
  currencies: [Currency]
}

const CurrencyList = ({ currencies}: CurrencyListProps) => (
  <ul>
    {currencies?.map((currency) => (
      <li key={currency.id}>
        <h3>{currency.base}</h3>
        <ul>{currency.rates.map((rate) => (
          <li key={rate.currency}>{rate.currency} {rate.value}</li>
        ))}</ul>
      </li>
    ))}
  </ul>
);


export default CurrencyList;

