import {Mongo} from 'meteor/mongo'

export const Symptoms = new Mongo.Collection("symptoms");

Symptoms.allow({
  insert: () => {
    if(Meteor.user()){
      return true
    } else {
       return false
    }
  },
  update:  () => {
    if(Meteor.user()){
      return true
    } else {
       return false
    }
  },
  remove:  () => {
    if(Meteor.user()){
      return true
    } else {
       return false
    }
  }
});
