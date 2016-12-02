import {Mongo} from 'meteor/mongo';

const Food = new Mongo.Collection('food');
export default Food;

Food.allow({
  insert: () => {
      return true
  },
  update: () => {
    if(Meteor.user()){
      return true
    } else {
       return false
    }
  },
  remove: () => {
    if(Meteor.user()){
      return true
    } else {
       return false
    }
  }
});

FoodSchema = new SimpleSchema({
  createdBy:{
    type: String,
    label: 'created by:'
  },
  username:{
    type: String,
    label: 'username'
  },
  createdAt:{
    type: Date,
    label: 'created at:'
  },
  food:{
    type: [String],
    label: 'food:',
    optional: true
  },
  drink:{
    type: [String],
    label: 'drink:',
    optional: true
  },
  date:{
    type: String,
    label: 'date'
  },
  time:{
    type: String,
    label: 'time'
  },
  notes: {
    type: String,
    label: 'notes',
    optional: true
  },
  medicaments: {
    type: String,
    label: 'medicaments',
    optional: true
  },
  stressLvl:{
    type: String,
    label: 'current stress-level',
    allowedValues: ['none','relaxed','normal','light stressed','stressed']
  },
  condition:{
    type: String,
    label: 'current condition',
    allowedValues: ['none','calmly','normal','in a hurry','stressed']
  }
})

Food.attachSchema(FoodSchema)
