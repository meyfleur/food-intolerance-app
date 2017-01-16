import {Mongo} from 'meteor/mongo';

const Food = new Mongo.Collection('food')
export default Food

Food.allow({
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

FoodSchema = new SimpleSchema({
  createdBy:{
    type: String,
    label: 'created by:'
  },
  username:{
    type: String,
    label: 'username:'
  },
  createdAt:{
    type: Date,
    label: 'created at:'
  },
  slug:{
    type: String,
    label: 'slug:'
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
    label: 'date:'
  },
  time:{
    type: String,
    label: 'time:'
  },
  notes: {
    type: String,
    label: 'notes:',
    optional: true
  },
  medicaments: {
    type: String,
    label: 'medicaments:',
    optional: true
  },
  stressLvl:{
    type: Number,
    label: 'stress-level index:',
    allowedValues: [0,1,2,3,4]
  },
  stressLvlName:{
    type: String,
    label: 'current stress-level:',
    allowedValues: ['stressed','light stressed','neither','unstressed','relaxed']
  },
  conditionName:{
    type: String,
    label: 'current condition:',
    allowedValues: ['very fast','fast','neither','slow','very slow']
  },
  condition:{
    type: Number,
    label: 'stress-level index:',
    allowedValues: [0,1,2,3,4]
  }
})

Food.attachSchema(FoodSchema)
