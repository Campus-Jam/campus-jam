import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { GigsToGenres } from './GigsToGenres';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('ArtistsCollection', function testSuite() {
    beforeEach(function setup() {
      GigsToGenres.collection.remove({});
    });

    it('inserts a valid document', function test() {
      const artist = {
        firstName: 'John',
        lastName: 'Doe',
        image: 'https://example.com/image.jpg',
        instruments: ['Guitar'],
        skillLevel: 'Intermediate',
        genres: ['Rock'],
        influences: ['Hendrix'],
      };
      const artistId = GigsToGenres.collection.insert(artist);
      const retrievedArtist = GigsToGenres.collection.findOne(artistId);
      expect(retrievedArtist).to.exist;
      expect(retrievedArtist).to.deep.include(artist);
    });

    it('rejects invalid documents', function test() {
      const artist = {
        firstName: 'John',
        lastName: 'Doe',
        image: 'not-a-url',
        instruments: ['Guitar'],
        skillLevel: 'Expert',
        genres: ['Rock'],
        influences: ['Hendrix'],
      };
      expect(() => {
        GigsToGenres.collection.insert(artist);
      }).to.throw();
      const retrievedArtist = GigsToGenres.collection.findOne(artist);
      expect(retrievedArtist).to.not.exist;
    });
  });
}
