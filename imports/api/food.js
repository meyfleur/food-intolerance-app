import {Mongo} from 'meteor/mongo'

export const Food = new Mongo.Collection("food");

Food.allow({
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
