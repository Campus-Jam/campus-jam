import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { ArtistsToInstruments } from './ArtistsToInstruments';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('ArtistsCollection', function testSuite() {
    beforeEach(function setup() {
      ArtistsToInstruments.collection.remove({});
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
      const artistId = ArtistsToInstruments.collection.insert(artist);
      const retrievedArtist = ArtistsToInstruments.collection.findOne(artistId);
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
        ArtistsToInstruments.collection.insert(artist);
      }).to.throw();
      const retrievedArtist = ArtistsToInstruments.collection.findOne(artist);
      expect(retrievedArtist).to.not.exist;
    });
  });
}
