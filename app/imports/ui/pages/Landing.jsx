import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { PageIDs } from '../utilities/ids';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div id={PageIDs.landingPage}>
    <div className="landing-green-background">
      <Container>
        <Row>
          <Col xs={6}>
            <Container>
              <h1 style={{ paddingTop: '150px', paddingBottom: '10px', color: 'white', fontSize: '36pt' }}>
                Ready to Jam With Jamb-UH-ree?
              </h1>
              <h3 style={{ paddingBottom: '70px', color: 'white' }}>
                Find musicians and plan jam sessions at UH Manoa
              </h3>
              <Button as={NavLink} to="/signup">Create an account and start jamming today!</Button>
              <p style={{ paddingTop: '5px', paddingBottom: '150px', color: 'white' }}>
                Already have an account? <NavLink as={NavLink} to="/signin">Log In</NavLink>
              </p>
            </Container>
          </Col>
          <Col>
            <Image src="/images/musician-clipart.png" width={600} />
          </Col>
        </Row>
      </Container>
    </div>
    <div className="landing-white-background">
      <Container>
        <Row md={10} lg={3}>
          <Col>
            <h3 style={{ paddingTop: '50px' }}>
              Customize your profile
            </h3>
            <p style={{ paddingBottom: '50px' }}>
              Provide information about your favorite genres, what instruments you play, and your skill level so others can discover and learn more about your talents.
            </p>
          </Col>
          <Col>
            <h3 style={{ paddingTop: '50px' }}>
              Browse artists and jam sessions
            </h3>
            <p style={{ paddingBottom: '50px' }}>
              Search through the various artists and jam session at UH Manoa using filters to find the right matches for you.
            </p>
          </Col>
          <Col>
            <h3 style={{ paddingTop: '50px' }}>
              Start your own jam sessions
            </h3>
            <p style={{ paddingBottom: '50px' }}>
              Create a jam session with a description, time, date, and place to find others who would like to have a jam session with you.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  </div>
);

export default Landing;
