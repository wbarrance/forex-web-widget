import { Rates } from './types'
import { Row, Col } from 'react-bootstrap'

interface CurrencyListProps {
  rates: Rates
}

const handleRates = (rates: Rates) => {
  const arr = []

  for (const [key, value] of Object.entries(rates)) {
    if (key !== '__typename') {
      arr.push({ symbol: key, value })
    }
  }

  return arr
}

const CurrencyList = ({ rates }: CurrencyListProps) => (
  <Col as="ul" xs="12">
    {handleRates(rates).map((rate) => (
      <Row as="li" key={rate.symbol}>
        <Col>{rate.symbol}</Col>
        <Col className="text-end">{rate.value}</Col>
      </Row>
    ))}
  </Col>
)

export default CurrencyList
