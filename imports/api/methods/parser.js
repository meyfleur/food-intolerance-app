
Meteor.methods({
  getJson:function(){
     var symptoms
     symptoms = JSON.parse(Assets.getText('symptoms.json'))
    return symptoms
  }
});
