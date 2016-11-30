import {Mongo} from 'meteor/mongo'

export const Symptoms = new Mongo.Collection("symptoms");

Symptoms.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});
