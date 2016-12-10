import Symptoms from '../symptoms'

Meteor.methods({

  'insertSymptomsEntry'(symptoms){
    check(symptoms, SymptomsSchema)
    Symptoms.insert(symptoms);
  },

  'deleteSymptomsEntry'(entry_id){
    Symptoms.remove(entry_id)
  },

  'updateSymptoms'(symptomsUpdate, entry_id){
    Symptoms.update({_id: entry_id}, {$set:symptomsUpdate})
  }

});
