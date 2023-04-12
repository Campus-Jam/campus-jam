import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { Artists } from './Artists';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('ArtistsCollection', function testSuite() {
    beforeEach(function setup() {
      Artists.collection.remove({});
    });

    it('inserts a valid document', function test() {
      const artist = {
        firstName: 'John',
        lastName: 'Doe',
        image: 'https://example.com/image.jpg',
        skillLevel: 'Intermediate',
        influences: ['Hendrix'],
      };
      const artistId = Artists.collection.insert(artist);
      const retrievedArtist = Artists.collection.findOne(artistId);
      expect(retrievedArtist).to.exist;
      expect(retrievedArtist).to.deep.include(artist);
    });

    it('rejects invalid documents', function test() {
      const artist = {
        firstName: 'John',
        lastName: 'Doe',
        image: 'not-a-url',
        skillLevel: 'Expert',
        influences: ['Hendrix'],
      };
      expect(() => {
        Artists.collection.insert(artist);
      }).to.throw();
      const retrievedArtist = Artists.collection.findOne(artist);
      expect(retrievedArtist).to.not.exist;
    });
  });
}
