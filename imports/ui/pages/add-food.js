import './add-food.html'
import Bloodhound from '../../js/bloodhound.js'
const levenshtein = require('fast-levenshtein');

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
     const stresslvlValue = $('#stress-level-slider').data("ionRangeSlider");
     const conditionValue = $('#condition-slider').data("ionRangeSlider");

     const foodset = $(target.food).materialtags('items')
     const drinkset = $(target.drink).materialtags('items')

     const foodEntry = {
       createdBy: userId,
       username: Meteor.users.findOne(userId).username,
       createdAt: new Date(),
       slug: 'food',
       date: target.datepicker.value,
       time: target.timepicker.value,
       food: foodset,
       drink: drinkset,
       stressLvlName: target.stresslvl.value,
       stressLvl: stresslvlValue.old_from,
       conditionName: target.condition.value,
       condition: conditionValue.old_from,
       medicaments: target.medicaments.value,
       notes: target.notes.value
     }

      Meteor.call('insertFood', foodEntry, (err)=>{
        if (err) {
          throw err
          Materialize.toast('<i class="ion-close-round"></i> Validation Error', 2000, 'red')
        } else {
          Materialize.toast('<i class="ion-checkmark-round"></i>'+'Entry added', 2000, 'teal lighten-1')
          Meteor.setTimeout(()=> FlowRouter.go('/food-symptoms-list'), 3000);
        }
      });
   }
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

   $('.timepicker').lolliclock();

   $('#stress-level-slider').ionRangeSlider({
     values: ['stressed','light stressed','neither','unstressed','relaxed'],
     grid: true,
     from: 2
   });

   $('#condition-slider').ionRangeSlider({
    values: ['very fast','fast','neither','slow','very slow'],
    grid: true,
    from: 2
  });

  let food = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('Long_Desc'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: require('../../api/data/food.json'),
    sorter: function(a, b){
      let InputString = $('.tt-input').val()
      return levenshtein.get(a.Long_Desc, InputString) - levenshtein.get(b.Long_Desc, InputString);
    }
  })

  $('input[name=drink]').materialtags()

  $('input[name=food]').materialtags({
    typeaheadjs: {
           name: 'food',
           displayKey: 'Long_Desc',
           valueKey: 'Long_Desc',
           source: food.ttAdapter()
       }
  })
});
