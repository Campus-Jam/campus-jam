import React, { useState } from 'react';
// import { Meteor } from 'meteor/meteor';
import './BrowseArtistsStyle.css';
import { Container, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Filter } from 'react-bootstrap-icons';
import LoadingSpinner from '../components/LoadingSpinner';
import ArtistCard from '../components/ArtistCard';
import ArtistFilterForm from '../components/ArtistFilterForm';

const dummyArtistData = [{
  firstName: 'Albert', lastName: 'Haynes', email: 'albert.h@foo.com',
  image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw3NjA4Mjc3NHx8ZW58MHx8fHw%3D&w=1000&q=80',
  instruments: ['Guitar'], skillLevel: 'Intermediate',
  genres: ['Blues', 'Psychadelic Rock'],
  influences: ['Hendrix', 'Vaughn', 'B.B. King', 'The Doors', 'Grateful Dead'],
  bio: 'I have been practicing guitar for a little over a year now.  I love playing gnarly riffs over some heavy bass and looking forward to the jam sessions to come!',
},
{
  firstName: 'Henry', lastName: 'Kapono', email: 'kapono.k@baz.com',
  image: 'https://th.bing.com/th/id/OIP.6hJxyracpGt5Sq0xd3HoNAAAAA?w=287&h=176&c=7&r=0&o=5&pid=1.7',
  instruments: ['Guitar', 'Ukulele', 'Vocals'], skillLevel: 'Advanced',
  genres: ['Hawaiian', 'Reggae'],
  influences: ['Bob Marley', 'John Lennon', 'Jimi Hendrix', 'Sting', 'Stevie Wonder'],
  bio: 'I\'ve been playing ukulele my whole life.  My passion is to make music with my friends, and show aloha to my community',
},
{
  firstName: 'Samantha', lastName: 'Lee', email: 'samantha.l@foo.com',
  image: 'https://images.unsplash.com/photo-1564564295391-7f24f26f568b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGt1bHxlbnwwfHwwfHw%3D&w=1000&q=80',
  instruments: ['Bass Guitar'], skillLevel: 'Advanced',
  genres: ['Funk', 'Jazz', 'Soul'],
  influences: ['Victor Wooten', 'Marcus Miller', 'Thundercat', 'Earth, Wind & Fire', 'Stevie Wonder'],
  bio: 'I have been playing bass guitar for 10 years now. I love the rhythm and groove that comes with funk, jazz, and soul music. Looking for fellow musicians who share the same passion and vibe!',
},
{
  firstName: 'Alex', lastName: 'Nguyen', email: 'alex.n@foo.com',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQayQiD1x_FnLWOHbMia0mXHg6dyd91gcgFPztytUpnPg&usqp=CAU&ec=48600112',
  instruments: ['Drums', 'Piano'], skillLevel: 'Intermediate',
  genres: ['Rock', 'Pop', 'Indie'],
  influences: ['The Beatles', 'Queen', 'Radiohead', 'Coldplay', 'Tame Impala'],
  bio: 'I started playing drums when I was 12 and picked up piano a few years ago. I\'m into rock, pop, and indie music and always looking to expand my skills and knowledge. Let\'s create some awesome music together!',
},
{
  firstName: 'Maria', lastName: 'Garcia', email: 'maria.g@foo.com',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjRk6Vs47AjyBOAOBNF8Cic74PJNkAcrpUsGDUcCYpdA&usqp=CAU&ec=48600112',
  instruments: ['Violin'], skillLevel: 'Beginner',
  genres: ['Classical', 'Folk', 'World'],
  influences: ['Bach', 'Mozart', 'Yo-Yo Ma', 'Lindsey Stirling', 'Gaelic Storm'],
  bio: 'I recently started learning violin and am in love with the classical, folk, and world music that can be played with it. Looking for other musicians who can help me learn and grow!',
},
{
  firstName: 'Jacob', lastName: 'Kim', email: 'jacob.kim@bar.com',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmWpVZGN21gUEgVVUx09wMf8sDsZawEsRqSnerToYRJg&usqp=CAU&ec=48600112',
  instruments: ['Guitar'], skillLevel: 'Intermediate',
  genres: ['Rock', 'Blues', 'Funk'],
  influences: ['Jimi Hendrix', 'Stevie Ray Vaughan', 'Eric Clapton', 'Prince', 'The Red Hot Chili Peppers'],
  bio: 'I have been playing guitar for several years and am interested in exploring different genres like rock, blues, and funk. I would love to collaborate with other musicians and learn from them.',
},
{
  firstName: 'Sophie', lastName: 'Jones', email: 'sophie.jones@baz.com',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdeXOLbcQbqTH-1VQt-c_XGEpXCGioogdU_Y6FM8YUbw&usqp=CAU&ec=48600112',
  instruments: ['Piano'], skillLevel: 'Advanced',
  genres: ['Classical', 'Jazz', 'Pop'],
  influences: ['Chopin', 'Bill Evans', 'Elton John', 'Alicia Keys', 'Norah Jones'],
  bio: 'I have been playing piano for many years and enjoy exploring various genres like classical, jazz, and pop. I am interested in collaborating with other musicians who share my passion for music.',
},
{
  firstName: 'William', lastName: 'Bryant', email: 'william.b@foo.com',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPNXlBHc6ipu53WmeQZWq6GrLcyiTef4fBXfH5wES-gA&usqp=CAU&ec=48600112',
  instruments: ['Drums'], skillLevel: 'Intermediate',
  genres: ['Rock', 'Metal', 'Punk'],
  influences: ['John Bonham', 'Neil Peart', 'Dave Grohl', 'Travis Barker', 'Ginger Baker'],
  bio: 'I have been playing drums for a few years and love playing rock, metal, and punk music. I am interested in collaborating with other musicians who share my passion for these genres.',
},
{
  firstName: 'Ava', lastName: 'Chen', email: 'ava.chen@quux.com',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyPj1d0IG83GglbBjRyl1Ci50m6CQ7QcW7eSKV-A0hAQ&usqp=CAU&ec=48600112',
  instruments: ['Vocals'], skillLevel: 'Advanced',
  genres: ['Pop', 'R&B', 'Soul'],
  influences: ['Whitney Houston', 'Beyonce', 'Adele', 'Sam Cooke', 'Etta James'],
  bio: 'I am a classically trained singer with experience in pop, R&B, and soul music. I would like to find others with similar musical tastes who would like to get together to see what we can come up with',
},
];

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const BrowseArtists = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({ instrument: '', genre: '', skillLevel: '' });

  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, artists } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    // const subscription = Meteor.subscribe(Artists_meteor.userPublicationName);  // @todo uncomment this once artist collection is implemented
    // Determine if the subscription is ready
    // const rdy = subscription.ready();  // @todo uncomment this once artist collection is implemented
    const rdy = true; // @todo delete this once artist collection is implemented
    // Get the Contact documents
    // const artistItems = dummyArtistData;
    return {
      artists: dummyArtistData,
      ready: rdy,
    };
  }, []);

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  return (ready ? (
    <Container className="py-3">

      <div className="filter">
        <Button onClick={handleFilterClick}>
          <Filter size="3vw" />
        </Button>
        {showFilter && (
          <ArtistFilterForm filter={filter} setFilter={setFilter} />
        )}
      </div>

      <div className="artist-grid">
        {artists
          .filter((artist) => {
            if (filter.instrument && !artist.instruments.includes(filter.instrument)) {
              return false;
            }
            if (filter.genre && !artist.genres.includes(filter.genre)) {
              return false;
            }
            return !(filter.skillLevel && artist.skillLevel !== filter.skillLevel);

          })
          .map((artist, index) => (
            <div key={index}>
              <ArtistCard artistEntry={artist} />
            </div>
          ))}
      </div>

    </Container>
  ) :
    <LoadingSpinner />
  );
};

export default BrowseArtists;
