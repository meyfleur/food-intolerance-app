import Food from '../food'

Meteor.methods({

  'insertEntry'(food){
    console.log(food)
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
