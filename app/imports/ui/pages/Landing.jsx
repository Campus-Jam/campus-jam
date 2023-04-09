import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Image, Nav, Row } from 'react-bootstrap';
import { ComponentIDs, PageIDs } from '../utilities/ids';
import { BrowserRouter as Router, Route, Routes, Navigate, NavLink } from 'react-router-dom';


/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div id={PageIDs.landingPage}>
    <div className="landing-green-background">
      <Container>
        <Row>
          <Col xs={6}>
            <Container>
              <h1 style={{ paddingTop: '100px', paddingBottom: '10px', color: 'white', fontSize: '36pt' }}>
                Ready to Jam With Jamb-UH-ree?
              </h1>
              <h3 style={{ paddingBottom: '70px', color: 'white' }}>
                Find musicians and plan jam sessions at UH Manoa
              </h3>
              <Button as={NavLink} to="/signup">Create an account and start jamming today!</Button>
              <p style={{ paddingTop: '5px', paddingBottom: '100px', color: 'white' }}>
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
      <Container className="justify-content-center text-center">
        <h2 style={{ color: '#376551' }}>Start by making your profile....</h2>
        <Row md={10} lg={2}>
          <Col xs={10}>
            <Image src="/images/home-page.png" width={500} />
          </Col>
          <Col xs={6}>
            <Image src="/images/profiles-page.png" width={500} />
          </Col>
        </Row>
      </Container>
    </div>
    <div className="landing-green-background">
      <Container className="justify-content-center text-center">
        <h2 style={{ color: 'white' }}>...then add your projects</h2>
        <Row md={1} lg={2}>
          <Col xs={6}>
            <Image src="/images/add-project-page.png" width={500} />
          </Col>
          <Col xs={6}>
            <Image src="/images/projects-page.png" width={500} />
          </Col>
        </Row>
      </Container>
    </div>
    <div className="landing-white-background text-center">
      <h2 style={{ color: '#376551' }}>
        Connect to people and projects with shared interests!
      </h2>
      <Container>
        <Row md={1} lg={2}>
          <Col xs={6}>
            <Image src="/images/interests-page.png" width={500} />
          </Col>
          <Col xs={6}>
            <Image src="/images/filter-page.png" width={500} />
          </Col>
        </Row>
      </Container>
    </div>
  </div>
);

export default Landing;
