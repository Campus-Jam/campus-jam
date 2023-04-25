import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Card, Col, Container, Image, Nav, Row } from 'react-bootstrap';
import './ViewProfileStyle.css';
import { NavLink, useParams } from 'react-router-dom';
import { ComponentIDs } from '../utilities/ids';
import { Artists } from '../../api/artists/Artists';
import LoadingSpinner from '../components/LoadingSpinner';
import { ArtistsToGigs } from '../../api/artistsToGigs/ArtistsToGigs';
import { Gigs } from '../../api/gigs/Gigs';
import GigCard from '../components/GigCard';

const ViewProfile = () => {
  const id = useParams();
  console.log('email', id.id);
  const { ready } = useTracker(() => {
    const artistSub = Meteor.subscribe(Artists.userPublicationName);
    const artistToGigSub = Meteor.subscribe(ArtistsToGigs.userPublicationName);
    const gigSub = Meteor.subscribe(Gigs.userPublicationName);

    return {
      ready: artistSub.ready() && artistToGigSub.ready() && gigSub.ready(),
    };
  }, []);

  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  const artistToView = Artists.collection.findOne({ email: id.id });

  if (!ready || !artistToView) {
    return <LoadingSpinner />;
  }

  const gigIds = ArtistsToGigs.collection.find({ artist_id: artistToView._id }).map((doc) => doc.gig_id);
  const gigObj = Gigs.collection.find({ _id: { $in: gigIds } }).fetch();

  return (ready ? (
    <div className="viewProfile">
      <Container className="py-4">
        <Card className="card">
          <Card.Body>

            {/* NAME TITLE AND EMAIL */}
            <h1 className="text-center py-4">
              {artistToView.firstName} {artistToView.lastName}
            </h1>
            <p className="cardText text-center">{id.id}</p>
            <Row className="align-items-center image-row">
              {/* IMAGE */}
              <Col md={4} className="text-center image-col d-flex align-items-center px-4">
                <Image className="mx-auto d-block img-fluid image" src={artistToView.image} height="400px" />
              </Col>

              {/* DETAILS */}
              <Col md={8}>
                <Row>
                  {/* SKILL LEVEL */}
                  <Col>
                    <p className="cardText text-end px-3">
                      Skill Level: {artistToView.skillLevel}
                      <br />
                      <br />
                      <br />
                    </p>
                  </Col>
                </Row>

                {/* BIO */}
                <Row>
                  <Col className="text-center">
                    <h4>Biography</h4>
                    <p className="cardText">{artistToView.bio}</p>
                  </Col>
                </Row>

                {/* INSTRUMENTS AND INFLUENCES */}
                <Row>
                  <Col className="text-center">
                    <h4>Instrument Played</h4>
                    <p className="cardText">{artistToView.instruments.join(', ')}</p>
                  </Col>
                  <Col>
                    <h4>Influences</h4>
                    <p className="cardText">{artistToView.influences.join(', ')}</p>
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* EDIT PROFILE BUTTON */}
            {currentUser === id.id && (
              <Row>
                <Col className="text-end mt-3">
                  <Button className="editProfileButton">
                    <Nav.Link
                      className="EditProfileStyle.css"
                      as={NavLink}
                      id={ComponentIDs.createJamSession}
                      to="/editProfile"
                      key="editProfile"
                    >
                      Edit Profile
                    </Nav.Link>
                  </Button>
                </Col>
              </Row>
            )}
          </Card.Body>
        </Card>

        <h3 className="text-center py-2"> Jam Sessions that {artistToView.firstName} has joined:</h3>

        {/* JOINED GIGS */}
        <div className="gig-grid">
          {gigObj.map((gig) => (
            <div key={gig._id}>
              <GigCard gigEntry={gig} />
            </div>
          ))}
        </div>

      </Container>
    </div>
  ) :
    <LoadingSpinner />
  );
};
export default ViewProfile;
