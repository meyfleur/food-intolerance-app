import {Mongo} from 'meteor/mongo'

const Symptoms = new Mongo.Collection('symptoms')
export default Symptoms

Symptoms.allow({
  insert: () => {
    if(Meteor.user()){
      return true
    } else {
       return false
    }
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

SymptomsSchema = new SimpleSchema({
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
  symptoms:{
    type: [String],
    label: 'Symptoms:',
    minCount: 1
  },
  date:{
    type: String,
    label: 'date'
  },
  duration:{
    type: String,
    label: 'duration'
  },
  notes: {
    type: String,
    label: 'notes',
    optional: true
  },
  intensity:{
    type: Number,
    label: 'intensity index',
    allowedValues: [0,1,2,3,4]
  },
  intensityName:{
    type: String,
    label: 'intensity',
    allowedValues: ['none','sensible','light','middle','strong']
  },
  physicalStateName:{
    type: String,
    label: 'physical state',
    allowedValues: ['none','healthy','ailing','sick']
  },
  physicalState:{
    type: Number,
    label: 'physical state index',
    allowedValues: [0,1,2,3]
  }
})

Symptoms.attachSchema(SymptomsSchema)
