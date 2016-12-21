import Food from '../../api/food'
import './update-food.html'

Template.updateFood.onCreated(function(){

  const instance = this
  instance.state = new ReactiveDict()

  this.autorun(() => {
    console.log("autorun called")
    const entryId = FlowRouter.getParam('entry_id')

    this.subscribe("foodEntry", entryId, function(){
      console.log("handle ready")
      const fields = Food.findOne({_id: entryId}, {fields: {stressLvl:1, condition:1, date:1}})

      console.log("setting foodEntry", fields)
      instance.state.set('foodEntry', fields);

      Tracker.afterFlush(()=>{
        console.log('tracker afterflush')
        const fields = instance.state.get('foodEntry')
        setupJQueryHooks(fields)
      })
    })
  })
})

Template.updateFood.helpers({
  foodset(){
    const entryId = FlowRouter.getParam('entry_id')
    console.log("foodset called", Food.findOne({_id: entryId}))
    return Food.findOne({_id: entryId})
  }
});

Template.updateFood.events({
  'submit .update-food'(evt){
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


function setupJQueryHooks( fields ) {

  const { date, condition, stressLvl } = fields

  $('input[data-role=materialtags]').materialtags()
  $('.timepicker').lolliclock();

  $('.datepicker').pickadate({
    close: 'submit',
    clear: '',
    onStart: function() {
       this.set('select', date)
     }
  });

  $('#stress-level-slider').ionRangeSlider({
    values: ['none','relaxed','normal','light stressed','stressed'],
    grid: true,
    from: stressLvl
  });

  $('#condition-slider').ionRangeSlider({
    values: ['none','calmly','normal','in a hurry','stressed'],
    grid: true,
    from: condition
  });
}
