/*

import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { Notes } from './notes';

if (Meteor.isServer) {
  describe('notes', function (){

    it('should insert new note', function (){
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId:'testid'})
    });
    expect(
      Notes.findOne({ _id: _id, userId: 'testid' })
    ).toExist();


  });


}
*/
