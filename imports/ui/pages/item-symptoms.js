import './item-symptoms.html'

Template.symptomsItem.events({
  'click #deleteSymptoms'(){
    Meteor.call('deleteSymptomsEntry', this._id, (err)=>{
      if(err){
        console.log(err)
      }
    })
  },
  'click #updateSymptoms'(){
    entry_id = this._id
    FlowRouter.go('/update-symptoms/'+ entry_id)
  }
})
