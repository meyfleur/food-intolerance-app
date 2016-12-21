import './item-food.html'

Template.foodItem.events({
  'click #deleteFood'(){
    Meteor.call('deleteFood', this._id, (err)=>{
      if(err){
        console.log(err)
      }
    })
  },
  'click #updateFood'(){
    entry_id = this._id
    FlowRouter.go('/update-food/'+ entry_id)
  }
});


Template.foodItem.onRendered(()=>{
  $('.modal-trigger').leanModal()
});
