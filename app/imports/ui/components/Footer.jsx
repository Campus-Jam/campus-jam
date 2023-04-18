import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

/* The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="footer mt-auto py-3 bg-dark">
    <Container className="ps-5">
      <Row>
        <Col xs={2}>
          <Container>
            <Image className="ps-0" src="/images/logo-transparent.png" width={125} />
            <h5 className="fw-bolder" style={{ color: 'white' }}>jamb-UH-ree</h5>
          </Container>
        </Col>
        <Col xs={3} style={{ color: 'white' }}>
          <h2 className="pt-2">Visit Us</h2>
          <hr style={{ border: '3px solid' }} />
          University of Hawaii
          <br />
          Honolulu, HI 96822
          {' '}
        </Col>
        <Col xs={3} style={{ color: 'white' }}>
          <h2 className="pt-2">Important Links</h2>
          <hr style={{ border: '3px solid' }} />
          <a style={{ color: 'white', textDecoration: 'none' }} href="https://jamb-uh-ree.github.io/">Project Home page</a>
          <br />
          <a style={{ color: 'white', textDecoration: 'none' }} href="https://docs.google.com/document/d/1RjHlU3JCVSA35spR8NsnANxm8wTX9YFo0xGyXEpNkgY/edit?usp=sharing">Team Contract</a>
          <br />
          <a style={{ color: 'white', textDecoration: 'none' }} href="https://github.com/jamb-uh-ree">View On GitHub</a>
        </Col>
        <Col xs={3} style={{ color: 'white' }}>
          <h2 className="pt-2">Meet the Team</h2>
          <hr style={{ border: '3px solid' }} />
          <a style={{ color: 'white', textDecoration: 'none' }} href="https://calebmueller-uh.github.io/">Caleb Mueller</a>
          <br />
          <a style={{ color: 'white', textDecoration: 'none' }} href="https://elisdiep.github.io/">Elis Diep</a>
          <br />
          <a style={{ color: 'white', textDecoration: 'none' }} href="https://jaedench.github.io/">Jaeden Chang</a>
          <br />
          <a style={{ color: 'white', textDecoration: 'none' }} href="https://reidlum.github.io/">Reid Lum</a>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
