import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { GigsToInstruments } from './GigsToInstruments';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('ArtistsCollection', function testSuite() {
    beforeEach(function setup() {
      GigsToInstruments.collection.remove({});
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
      const artistId = GigsToInstruments.collection.insert(artist);
      const retrievedArtist = GigsToInstruments.collection.findOne(artistId);
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
        GigsToInstruments.collection.insert(artist);
      }).to.throw();
      const retrievedArtist = GigsToInstruments.collection.findOne(artist);
      expect(retrievedArtist).to.not.exist;
    });
  });
}
