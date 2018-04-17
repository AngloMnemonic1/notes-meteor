import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Notes = new Mongo.Collection('notes');

if(Meteor.isServer){  //publication can only exist on server
  Meteor.publish('notes', function (){
    return Notes.find({
      userId: this.userId
    });
  });
}

Meteor.methods({
  'notes.insert'(){
    if (!this.userId){
      throw new Meteor.Error('not-authorised');
    }

    return Notes.insert({
      title: '',
      body: '',
      userId: this.userId,
      updateAt: moment().valueOf() //new Date().getTime()
    });

  },

  'notes.remove'(_id){// eslint-disable-line meteor/audit-argument-checks

    if (!this.userId){
      throw new Meteor.Error('not-authorised to delete');
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({_id: _id }); // eslint-disable-line meteor/audit-argument-checks

    Notes.remove({
      _id: _id,
      userId: this.userId
    });

  },
  'notes.update'(_id,updates){ // eslint-disable-line meteor/audit-argument-checks
    if (!this.userId){
      throw new Meteor.Error('not-authorised to delete');
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      title:{
        type: String,
        optional: true
      },
      body:{
        type: String,
        optional: true
      }

    }).validate({
      _id: _id,
      ...updates
    }); // eslint-disable-line meteor/audit-argument-checks

    Notes.update({
      _id: _id,
      userId: this.userId
    }, {
      $set: {
        updateAt: moment().valueOf(),
        ...updates
      }
    });


  }


});
