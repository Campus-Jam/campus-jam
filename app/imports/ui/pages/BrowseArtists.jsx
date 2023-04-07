import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import Contact from '../components/ArtistCard';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const BrowseArtists = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, contacts } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Contacts.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Contact documents
    const contactItems = Contacts.collection.find({}).fetch();
    return {
      contacts: contactItems,
      ready: rdy,
    };
  }, []);

  const dummyArtistData = [{
    firstName: 'Albert', lastName: 'Haynes', email: 'albert.h@foo.com',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw3NjA4Mjc3NHx8ZW58MHx8fHw%3D&w=1000&q=80',
    instruments: ['Guitar'], skillLevel: 'intermediate',
    genres: ['blues', 'psychedellic rock'],
    influences: ['Hendrix', 'Vaughn', 'B.B. King', 'The Doors', 'Grateful Dead'],
    bio: 'I have been practicing guitar for a little over a year now.  I love playing gnarly riffs over some heavy bass and looking forward to the jam sessions to come!',
  },
  {
    firstName: 'Samantha', lastName: 'Lee', email: 'samantha.l@foo.com',
    image: 'https://images.unsplash.com/photo-1564564295391-7f24f26f568b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGt1bHxlbnwwfHwwfHw%3D&w=1000&q=80',
    instruments: ['Bass Guitar'], skillLevel: 'advanced',
    genres: ['funk', 'jazz', 'soul'],
    influences: ['Victor Wooten', 'Marcus Miller', 'Thundercat', 'Earth, Wind & Fire', 'Stevie Wonder'],
    bio: 'I have been playing bass guitar for 10 years now. I love the rhythm and groove that comes with funk, jazz, and soul music. Looking for fellow musicians who share the same passion and vibe!',
  },
  {
    firstName: 'Alex', lastName: 'Nguyen', email: 'alex.n@foo.com',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQayQiD1x_FnLWOHbMia0mXHg6dyd91gcgFPztytUpnPg&usqp=CAU&ec=48600112',
    instruments: ['Drums', 'Piano'], skillLevel: 'intermediate',
    genres: ['rock', 'pop', 'indie'],
    influences: ['The Beatles', 'Queen', 'Radiohead', 'Coldplay', 'Tame Impala'],
    bio: 'I started playing drums when I was 12 and picked up piano a few years ago. I\'m into rock, pop, and indie music and always looking to expand my skills and knowledge. Let\'s create some awesome music together!',
  },
  {
    firstName: 'Maria', lastName: 'Garcia', email: 'maria.g@foo.com',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjRk6Vs47AjyBOAOBNF8Cic74PJNkAcrpUsGDUcCYpdA&usqp=CAU&ec=48600112',
    instruments: ['Violin'], skillLevel: 'beginner',
    genres: ['classical', 'folk', 'world'],
    influences: ['Bach', 'Mozart', 'Yo-Yo Ma', 'Lindsey Stirling', 'Gaelic Storm'],
    bio: 'I recently started learning violin and am in love with the classical, folk, and world music that can be played with it. Looking for other musicians who can help me learn and grow!',
  },
  ];

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Browse Contacts</h2>
          </Col>

          <Row xs={3} md={5} lg={7} className="g-4">
            {contacts.map((contact) => (<Col key={contact._id}><Contact contact={contact} /></Col>))}
          </Row>

        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default BrowseArtists;
