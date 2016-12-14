import Symptoms from '../../api/symptoms'
import './update-symptoms.html'

Template.updateSymptoms.helpers({
  symptomsset(){
    const entry_id = FlowRouter.getParam('entry_id')
    return Symptoms.find({_id: entry_id})
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
      duration: target.duration.value,
      symptoms: symptomsset,
      intensity: intensityValue.old_from,
      intensityName: target.intensity.value,
      physicalState: physicalValue.old_from,
      physicalStateName: target.physicalState.value,
      notes: target.notes.value
    }

    Meteor.call('updateSymptoms', symptomsUpdate, entry_id, (err)=>{
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

Template.updateSymptoms.onRendered(function(){
    const entry_id = FlowRouter.getParam('entry_id')
    const intensityValue = Symptoms.findOne(entry_id, {fields: {intensity:1}})
    const physicalStateValue = Symptoms.findOne(entry_id, {fields: {physicalState:1}})
    $('input[data-role=materialtags]').materialtags()

    $('.datepicker').pickadate({
      close: 'submit',
      clear: '',
      onStart: function() {
         const symptomsDate = Symptoms.findOne(entry_id, {fields: {date:1}})
         this.set('select', symptomsDate.date)
       }
   });

   $('.durationpicker').lolliclock();

   $('#symptom-intensity-slider').ionRangeSlider({
       values: ['none','sensible','light', 'middle', 'strong'],
       grid: true,
       from: intensityValue.intensity
    });

    $('#physical-state-slider').ionRangeSlider({
      values: ['none','healthy', 'ailing', 'sick'],
      grid: true,
      from: physicalStateValue.physicalState
    });

 })
