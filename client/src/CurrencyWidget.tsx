import { useQuery, NetworkStatus } from '@apollo/client'
import { GET_EXCHANGE_RATES } from './queries'
import { Currency } from './types'
import { Row, Col, Button } from 'react-bootstrap'
import CurrencyList from './CurrencyList'

const CurrencyWidget = () => {
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_EXCHANGE_RATES,
    {
      variables: {
        base: 'USD',
        symbols: 'GBP,EUR,JPY,CHF,CAD,AUD,CNY,ZAR,RUB,BRL,HKD,MXN',
      },
      pollInterval: 1000 * 60 * 2, // polls API every 2 minutes
      notifyOnNetworkStatusChange: true,
    }
  )

  const currency: Currency = data ? data.getExchangeRates : null

  const handleRefresh = () => refetch()

  const handleDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000)

    return date.toDateString()
  }

  if (networkStatus === NetworkStatus.refetch) {
    return (
      <Col as="main" xs="12" className="text-center">
        <p>Refetching!</p>
      </Col>
    )
  }

  if (loading) {
    return (
      <Col as="main" xs="12" className="text-center">
        <p>Loading...</p>
      </Col>
    )
  }

  if (error) {
    return (
      <Col as="main" xs="12" className="text-center">
        <p>Error fetching data</p>
      </Col>
    )
  }

  return (
    <Col
      as="main"
      xs="12"
      sm={{ span: 8, offset: 2 }}
      md={{ span: 6, offset: 3 }}
    >
      {currency ? (
        <Row as="section" className="align-items-center">
          <Col xs="8" className="mb-2">
            <h2 className="fs-4">{currency.base} Exchange Rates</h2>
          </Col>
          <Col xs="4" className="text-end mb-2">
            <Button onClick={handleRefresh}>Refresh</Button>
          </Col>
          <Col xs="12" className="text-end">
            <p>1 {currency.base} =</p>
          </Col>
          <CurrencyList rates={currency.rates} />
          <Col xs="12" className="text-end">
            <p>Rates on {handleDate(currency.timestamp)}</p>
          </Col>
        </Row>
      ) : (
        <main className="text-center">
          <p>No data</p>
        </main>
      )}
    </Col>
  )
}

export default CurrencyWidget
