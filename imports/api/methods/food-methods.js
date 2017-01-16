import Food from '../food'

Meteor.publish('food', ()=> {
  return Food.find({}, {sort:{createdAt: 1}})
});

Meteor.publish('foodEntry', function(entryId) {
  check(entryId, String)
  return Food.find({_id: entryId})
});

Meteor.methods({

  'insertFood'(food){
    check(food, FoodSchema)
    Food.insert(food);
  },

  'deleteFood'(entry_id){
    Food.remove(entry_id)
  },

  'updateFood'(foodUpdate, entry_id){
    Food.update({_id: entry_id}, {$set:foodUpdate})
  }

});
