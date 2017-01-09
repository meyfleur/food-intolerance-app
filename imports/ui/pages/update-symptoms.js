import Symptoms from '../../api/symptoms'
import Bloodhound from '../../js/bloodhound.js'
import './update-symptoms.html'

Template.updateSymptoms.onCreated(function(){

  const instance = this
  instance.state = new ReactiveDict()

  this.autorun(()=>{

    const entryId = FlowRouter.getParam('entry_id')

    this.subscribe('symptomsEntry', entryId, function(){

      const fields = Symptoms.findOne({_id:entryId}, {fields: {intensity:1,physicalState:1,date:1}})
      instance.state.set('symptomsEntry', fields)

      Tracker.afterFlush(()=>{
          const fields = instance.state.get('symptomsEntry')
          setupJQueryHooks(fields)
      })
    })
  })
})

Template.updateSymptoms.helpers({
  symptomsset(){
    const entryId = FlowRouter.getParam('entry_id')
    return Symptoms.findOne({_id: entryId})
  }
});

Template.updateSymptoms.events({
  'submit .update-symptoms'(evt){
    evt.preventDefault()
    const target = evt.target
    const physicalValue = $('#physical-state-slider').data("ionRangeSlider");
    const intensityValue = $('#symptom-intensity-slider').data("ionRangeSlider");
    const symptomsset = $(target.symptoms).materialtags('items')
    const symptomsUpdate = {
      date: target.date.value,
      time: target.timepicker.value,
      duration: target.duration.value,
      symptoms: symptomsset,
      intensity: intensityValue.old_from,
      intensityName: target.intensity.value,
      physicalState: physicalValue.old_from,
      physicalStateName: target.physicalState.value,
      notes: target.notes.value
    }

    Meteor.call('updateSymptoms', symptomsUpdate, this._id, (err)=>{
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

  'reset .update-symptoms'(evt){
     evt.preventDefault()
     FlowRouter.go('/food-symptoms-list')
  },
});

function setupJQueryHooks (fields){
  const { intensity, physicalState, date } = fields

  let symptoms = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: require('../../api/data/symptoms.json')
  })

  $('input[data-role=materialtags]').materialtags({
    typeaheadjs: {
      hint: false,
      highlight: true,
           name: 'symptoms',
           displayKey: 'name',
           valueKey: 'name',
           source: symptoms.ttAdapter()
       }
  })

  $('.datepicker').pickadate({
    close: 'submit',
    clear: '',
    onStart: function() {
       this.set('select', date)
     }
 });

 $('.timepicker').lolliclock();

 $('.durationpicker').lolliclock({
   hour24: true
 });

 $('#symptom-intensity-slider').ionRangeSlider({
     values: ['none','sensible','light', 'middle', 'strong'],
     grid: true,
     from: intensity
  });

  $('#physical-state-slider').ionRangeSlider({
    values: ['none','healthy', 'ailing', 'sick'],
    grid: true,
    from: physicalState
  });
}
