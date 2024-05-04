import { Col, Container, Row } from "react-bootstrap";

function Footer() {
  return (
    <div>
      <footer>
        <Container>
          <Row>
            <Col className="text-center py-3">copyright &copy; ProShop</Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default Footer;
