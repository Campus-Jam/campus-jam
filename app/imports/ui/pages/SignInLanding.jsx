import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ComponentIDs, PageIDs } from '../utilities/ids';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div id={PageIDs.signInLandingPage}>
    <div className="landing-green-background">
      <Container>
        <Row>
          <Col xs={6}>
            <Container id={ComponentIDs.signInLandingButtonCluster}>
              <h1 style={{ paddingTop: '150px', paddingBottom: '10px', color: 'white', fontSize: '36pt' }}>
                The Best and Easiest Way to Connect with Artists and Jam Out!
              </h1>
              <Row className="pt-5">
                <Col xs={6}>
                  <Button as={NavLink} to="/artists" className="m-2" variant="success" style={{ width: '100%' }}>Connect with Artists</Button>
                  <Button as={NavLink} to="/editProfile" className="m-2" variant="success" style={{ width: '100%' }}>Edit Your Profile</Button>
                </Col>
                <Col xs={6}>
                  <Button as={NavLink} to="/jamsessions" className="m-2" variant="success" style={{ width: '100%' }}>Join Jam Sessions</Button>
                  <Button as={NavLink} to="/addJamSessions" className="m-2" variant="success" style={{ width: '100%' }}>Add a Jam Session</Button>
                </Col>
              </Row>
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
