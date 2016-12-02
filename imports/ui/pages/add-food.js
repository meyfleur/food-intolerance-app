import { ReactiveDict } from 'meteor/reactive-dict';
import Food from '../../api/food.js'
import './add-food.html'

Template.addFood.helpers({

  'getCurrentTime'(){
    let currentTime = moment().format('h:mm A')
    return currentTime
  },
});

Template.addFood.events({
  'submit .insert-food': (evt, instance) => {
     evt.preventDefault()
     const userId = Meteor.userId()
     const target = evt.target
     const foodset = [target.food.value]
     const drinkset = [target.drink.value]
     const foodEntry = {
       createdBy: userId,
       username: Meteor.users.findOne(userId).username,
       createdAt: new Date(),
       date: target.datepicker.value,
       time: target.timepicker.value,
       food: foodset,
       drink: drinkset,
       stressLvl: target.stresslvl.value,
       condition: target.condition.value,
       medicaments: target.medicaments.value,
       notes: target.notes.value
     }

     Meteor.call('insertFood', foodEntry);
  }
});

/*Template.foo.events({
  'submit': (event, instance) => {
    Meteor.call('method', (err) => {
      if (ValidationError.is(err)) {
        err.details.forEach((fieldError) => {
          instance.state.set(`error-${fieldError.name}`: fieldError.type);
        });
      }
    });
  }
});*/

Template.addFood.onRendered(()=>{
  $('.datepicker').pickadate({
    close: 'submit',
    onStart: function() {
       var date = new Date()
       this.set('select', [date.getFullYear(), date.getMonth(), date.getDate()]);
     }
   });

   $('.timepicker').lolliclock();

   $('#stress-level-slider').ionRangeSlider({
     values: ['none','relaxed','normal','light stressed','stressed'],
     grid: true,
     from: 0
   });

   $('#condition-slider').ionRangeSlider({
    values: ['none','calmly','normal','in a hurry','stressed'],
    grid: true,
    from: 0
  });

});
