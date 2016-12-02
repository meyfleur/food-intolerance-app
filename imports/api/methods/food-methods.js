
Meteor.methods({
  insertFood(food){
    check(food, FoodSchema, (err)=>{
      console.log(food)
      if(err){ console.log(err)}
      else{
        Food.insert(food);
      }
    })
  }
});
