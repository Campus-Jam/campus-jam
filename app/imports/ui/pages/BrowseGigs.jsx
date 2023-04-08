import React from 'react';
// import React, { useState } from 'react';
// import { Meteor } from 'meteor/meteor';
import './BrowseGigsStyle.css';
import { Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import GigCard from '../components/GigCard';

const dummyGigs = [{
  title: 'Summer Festival',
  image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Bluegrass_Band.jpg',
  date: 'Sat. July 15, 5:00 pm to 10:00 pm',
  attendees: ['Sarah', 'Tom', 'Karen', 'James', 'Lila', 'Eva', 'Nathan', 'Hannah', 'Max', 'Olivia', 'Samantha', 'Juan', 'Landon', 'Avery', 'Mia', 'David', 'Ava', 'Sophie', 'Lucas', 'Zoe', 'Grace', 'Leo', 'Isabella', 'Jacob', 'Emma'],
  skillLevel: 'Advanced',
  genres: ['Bluegrass', 'Folk', 'Americana', 'Country', 'Rockabilly', 'Blues', 'Jazz', 'Gospel', 'World Music', 'Soul', 'Funk', 'Reggae', 'Hip-Hop', 'Electronic', 'Classical', 'Pop', 'Alternative'],
  instruments: ['Fiddle', 'Bass', 'Drums', 'Accordion', 'Banjo', 'Fiddle', 'Bass', 'Drums', 'Accordion', 'Banjo', 'Guitar', 'Mandolin', 'Harmonica', 'Piano', 'Trumpet', 'Saxophone', 'Clarinet', 'Flute', 'Violin', 'Cello'],
  venue: 'The Summer Festival will take place at The Villa@Hoffman Park, a stunning outdoor venue located in the heart of the city. The Villa is a spacious and elegant property that boasts sprawling gardens, tranquil ponds, and plenty of open space for guests to relax and enjoy the festivities.\n' +
    '\n' +
    'As you enter the grounds of The Villa, you\'ll be greeted by the beautiful landscaping and manicured lawns, creating a welcoming and serene atmosphere. The venue is equipped with plenty of seating options, including benches, picnic tables, and lounge areas',
  about: 'The Summer Festival is an exciting event that takes place every year, showcasing live music, delicious food, and a great atmosphere. This year\'s festival promises to be one of the best yet, with an impressive lineup of talented musicians and mouth-watering food trucks that will keep your taste buds happy all evening long.\n' +
    '\n' +
    'The festival is set to take place on Saturday, July 15, from 5:00 pm to 10:00 pm, and will be held at the beautiful Villa@Hoffman Park. This stunning venue is the perfect backdrop for the festival, with its lush green lawns, majestic trees, and tranquil ponds creating an ambiance of relaxation and enjoyment.\n' +
    '\n' +
    'The festival is designed to cater to music lovers of all skill levels, with a focus on advanced performers. Whether you\'re a seasoned musician or a beginner, you\'re sure to find something to enjoy at this festival. The genres of music that will be featured at the festival are predominantly Bluegrass, but other genres may also make an appearance.\n' +
    '\n' +
    'Instruments that will be showcased during the festival include the fiddle, bass, drums, accordion, and banjo, among others. Whether you\'re a musician yourself or simply a lover of great music, you\'ll be able to appreciate the amazing talent that will be on display.',
  _id: '1234',
},
{
  title: 'Acoustic Night',
  image: 'https://static.vecteezy.com/system/resources/previews/002/100/548/original/an-acoustic-guitar-cubist-surrealism-painting-modern-abstract-design-a-musical-instrument-abstract-colorful-music-cubism-minimalist-style-guitar-and-music-theme-illustration-vector.jpg',
  date: 'Fri. May 12, 7:30 pm to 9:00 pm',
  attendees: ['Samantha', 'Kai', 'Wang'],
  skillLevel: 'Intermediate',
  genres: ['Acoustic', 'Ambient'],
  instruments: ['Guitar', 'Bass Guitar', 'DJ'],
  venue: 'In the back room at Reverb',
  about: 'An evening jam of acoustic music and coffee.',
  _id: '5678',
},
{
  title: 'Rock and Metal',
  image: 'https://decibelpro.app/content/images/2021/06/how-loud-is-a-rock-concert.jpg',
  date: 'Sat. July 15, 5:00 pm to 10:00 pm',
  attendees: ['Mike', 'Lisa', 'Tom'],
  skillLevel: 'Beginner',
  genres: ['Rock', 'Metal'],
  instruments: ['Guitar', 'Bass Guitar', 'DJ'],
  venue: 'Blacksheep Concert Hall',
  about: 'A high-energy beginner friendly rock session.',
  _id: '9012',
},
{
  title: 'Jazz Night',
  image: 'https://www.gannett-cdn.com/-mm-/fe540925f187d73c8a91c93ece4e29936ea358fc/c=0-885-3804-3034/local/-/media/2015/07/16/MIGroup/Lansing/635726564289570272-ThinkstockPhotos-486813379-1-.jpg',
  date: 'Sat. July 15, 5:00 pm to 10:00 pm',
  attendees: ['David', 'Emily', 'Chris'],
  skillLevel: 'Intermediate',
  genres: ['Jazz'],
  instruments: ['Piano', 'Bass Guitar', 'Saxophone'],
  venue: 'The Jazz Club',
  about: 'An evening of jazz music and cocktails.',
  _id: '3456',
},
];

const BrowseGigs = () => {

  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, gigs } = useTracker(() => {
    // const subscription = Meteor.subscribe(Gigs.userPublicationName);
    // const rdy = subscription.ready();
    // const gigItems = Gigs.collection.find().fetch();
    const rdy = !!dummyGigs;
    return {
      gigs: dummyGigs,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">

      {/* ARTIST CARDS */}
      <div className="artist-grid">
        {gigs.map((gig) => (
          <div key={gig._id}>
            <GigCard gigEntry={gig} />
          </div>
        ))}
      </div>

    </Container>
  ) :
    <LoadingSpinner />
  );
};

export default BrowseGigs;
