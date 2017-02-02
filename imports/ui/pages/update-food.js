import Food from '../../api/food'
import Bloodhound from '../../js/bloodhound.js'
import './update-food.html'
const levenshtein = require('fast-levenshtein');

Template.updateFood.onCreated(function(){

  const instance = this
  instance.state = new ReactiveDict()

  this.autorun(() => {
    const entryId = FlowRouter.getParam('entry_id')

    this.subscribe("foodEntry", entryId, function(){
      const fields = Food.findOne({_id: entryId}, {fields: {stressLvl:1, condition:1, date:1}})
      instance.state.set('foodEntry', fields);

      Tracker.afterFlush(()=>{
        const fields = instance.state.get('foodEntry')
        setupJQueryHooks(fields)
      })
    })
  })
})

Template.updateFood.helpers({
  foodset(){
    const entryId = FlowRouter.getParam('entry_id')
    return Food.findOne({_id: entryId})
  }
});

Template.updateFood.events({
  'submit .form-update-food'(evt){
    evt.preventDefault()
    const target = evt.target
    const foodset = $(target.food).materialtags('items')
    const drinkset = $(target.drink).materialtags('items')
    const stresslvlValue = $('#stress-level-slider').data("ionRangeSlider");
    const conditionValue = $('#condition-slider').data("ionRangeSlider");
    const foodUpdate = {
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
    Meteor.call('updateFood', foodUpdate, this._id, (err)=>{
      if(err){
        Materialize.toast('<i class="ion-close-round"></i>'+ err.reason, 2000, 'red')
      } else {
        Materialize.toast('<i class="ion-checkmark-round"></i>'+' Entry updated',2000,'teal lighten-1')
          Meteor.setTimeout(function(){
            FlowRouter.go('list.show')
        }, 3000);
      }
    })
  },

  'reset .update-food'(evt){
     evt.preventDefault()
     FlowRouter.go('/results')
  },
});


function setupJQueryHooks( fields ) {

  const { date, condition, stressLvl } = fields

  $('.timepicker').lolliclock();

  $('.datepicker').pickadate({
    close: 'submit',
    clear: '',
    onStart: function() {
       this.set('select', date)
     }
  });

  $('#stress-level-slider').ionRangeSlider({
    values: ['stressed','light stressed','neither','unstressed','relaxed'],
    grid: true,
    from: stressLvl
  });

  $('#condition-slider').ionRangeSlider({
    values: ['very fast','fast','neither','slow','very slow'],
    grid: true,
    from: condition
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

  $('input').focusin(function(event) {
    $('input.tt-input').val('')
  })

  $('input').blur(function(event) {
    $('input.tt-input').val('')
  })
}
