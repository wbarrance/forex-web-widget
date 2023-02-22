import { Container, Row, Col } from 'react-bootstrap'
import CurrencyWidget from './CurrencyWidget'

const App = () => {
  return (
    <Container fluid>
      <Row>
        <Col as="header" xs="12" className="my-4 text-center">
          <h1>Forex Widget</h1>
        </Col>
        <CurrencyWidget />
      </Row>
    </Container>
  )
}

export default App
