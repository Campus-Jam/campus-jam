import React from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import './LoadingSpinnerStyle.css';

const LoadingSpinner = () => (
  <div className="loadingSpinnerStyle">
    <Container>
      <Col className="d-flex align-items-center justify-content-center">
        <Row className="justify-content-md-center align-items-center" style={{ color: 'var(--text-color1)' }}>
          <Spinner animation="border" />
          <br />
          Fetching Data...
        </Row>
      </Col>
    </Container>
  </div>
);

export default LoadingSpinner;
