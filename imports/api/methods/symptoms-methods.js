import Symptoms from '../symptoms'

Meteor.publish('symptoms', ()=> {
  return Symptoms.find({}, {sort:{createdAt: 1}});
});

Meteor.publish('symptomsEntry', function(entryId){
  check(entryId, String)
  return Symptoms.find({_id: entryId});
});

Meteor.methods({

  'insertSymptoms'(symptoms){
    check(symptoms, SymptomsSchema)
    Symptoms.insert(symptoms);
  },

  'deleteSymptoms'(entry_id){
    Symptoms.remove(entry_id)
  },

  'updateSymptoms'(symptomsUpdate, entry_id){
    Symptoms.update({_id: entry_id}, {$set:symptomsUpdate})
  }

});
