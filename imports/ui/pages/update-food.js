import Food from '../../api/food'
import './update-food.html'

Template.updateFood.helpers({
  foodset(){
    const entry_id = FlowRouter.getParam('entry_id')
    return Food.find({_id: entry_id})
  }
});

Template.updateFood.events({
  'submit .update-food'(evt){
    evt.preventDefault()
    const target = evt.target
    const foodset = target.food.value == '' ? [] : target.food.value
    const drinkset = target.drink.value
    const stresslvlValue = $('#stress-level-slider').data("ionRangeSlider");
    const conditionValue = $('#condition-slider').data("ionRangeSlider");
    const foodUpdate = {
      date: target.datepicker.value,
      time: target.timepicker.value,
      food: [foodset],
      drink: [drinkset],
      stressLvlName: target.stresslvl.value,
      stressLvl: stresslvlValue.old_from,
      conditionName: target.condition.value,
      condition: conditionValue.old_from,
      medicaments: target.medicaments.value,
      notes: target.notes.value
    }

    Meteor.call('updateFood', foodUpdate, entry_id, (err)=>{
      if(err){
        console.log(err)
        Materialize.toast('<i class="ion-close-round"></i>'+ err, 2000, 'red')
      } else {
        Materialize.toast('<i class="ion-checkmark-round"></i>',2000,'teal lighten-1')
          Meteor.setTimeout(function(){
            FlowRouter.go('/food-symptoms-list')
        }, 3000);
      }
    })
  },

  'reset .update-food'(evt){
     evt.preventDefault()
     FlowRouter.go('/results')
  },
});

Template.updateFood.onRendered(function(){
    const entry_id = FlowRouter.getParam('entry_id')
    const fields = Food.findOne(entry_id, {fields: {stressLvl:1, condition:1, date:1}})
    console.log(fields)

    $('.datepicker').pickadate({
      close: 'submit',
      clear: '',
      onStart: function() {
         this.set('select', fields.date)
       }
   });

   $('.timepicker').lolliclock();

   $('#stress-level-slider').ionRangeSlider({
     values: ['none','relaxed','normal','light stressed','stressed'],
     grid: true,
     from: fields.stressLvl
   });

   $('#condition-slider').ionRangeSlider({
    values: ['none','calmly','normal','in a hurry','stressed'],
    grid: true,
    from: fields.condition
  });
})
