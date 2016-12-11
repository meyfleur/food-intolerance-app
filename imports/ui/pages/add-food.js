import { ReactiveDict } from 'meteor/reactive-dict';
import './add-food.html'

Template.addFood.helpers({
  'getCurrentTime'(){
    let currentTime = moment().format('h:mm A')
    return currentTime
  },
});

Template.addFood.events({
  'submit .insert-food'(evt, instance){
     evt.preventDefault()
     const userId = Meteor.userId()
     const target = evt.target
     let foodset = target.food.value == '' ? [] : target.food.value
     const drinkset = target.drink.value
     const stresslvlValue = $('#stress-level-slider').data("ionRangeSlider");
     const conditionValue = $('#condition-slider').data("ionRangeSlider");
     const foodEntry = {
       createdBy: userId,
       username: Meteor.users.findOne(userId).username,
       createdAt: new Date(),
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

      Meteor.call('insertEntry', foodEntry, (err)=>{
        if (err) {
          console.log(err)
          Materialize.toast('<i class="ion-close-round"></i> Validation Error', 2000, 'red')

        } else {
          Materialize.toast('<i class="ion-checkmark-round"></i>',2000,'teal lighten-1')
            Meteor.setTimeout(function(){
              FlowRouter.go('/food-symptoms-list')
          }, 3000);
        }
      });
   },
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

  /* 'reset .insert-food'(evt){
      evt.preventDefault()
      const target = evt.target
      target.food.value = ''
      target.drink.value = ''
      target.medicaments.value = ''
      target.notes.value = ''
      $('#stress-level-slider').data("ionRangeSlider").reset();
      $('#condition-slider').data("ionRangeSlider").reset();
   },*/

});

Template.addFood.onCreated(function(){
  this.state = new ReactiveDict();
});

Template.addFood.onRendered(function(){
  $('.datepicker').pickadate({
    close: 'submit',
    clear: '',
    onStart: function() {
       var date = new Date()
       this.set('select', [date.getFullYear(), date.getMonth(), date.getDate()]);
     }
   });

   $('.chip').material_chip({
     placeholder: 'Enter a tag',
     secondaryPlaceholder: '+Tag',
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
