import './add-symptoms.html'
import Bloodhound from '../../js/bloodhound.js'

Template.addSymptoms.inheritsHelpersFrom('addFood')

Template.addSymptoms.events({
  'submit .insert-symptoms'(evt, instance) {
     evt.preventDefault()
     const userId = Meteor.userId()
     const target = evt.target
     const physicalValue = $('#physical-state-slider').data("ionRangeSlider")
     const intensityValue = $('#symptom-intensity-slider').data("ionRangeSlider")
     const symptomsset = $(target.symptoms).materialtags('items')

     const symptomsEntry = {
       createdBy: userId,
       username: Meteor.users.findOne(userId).username,
       createdAt: new Date(),
       slug: 'symptoms',
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
     Meteor.call('insertSymptoms', symptomsEntry, (err)=>{
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
  }
});


Template.addSymptoms.helpers({
  // symptomsJson(){
  //   let symptoms = []
  //   Meteor.call('getJson', function(err, result){
  //     if(err){
  //       console.log("error", err);
  //     } else{
  //       result.map(function(el) {
  //           symptoms.push(el.name)
  //       });
  //       console.log(symptoms)
  //       return symptoms
  //     }
  //   });
  // },
});

Template.addSymptoms.onRendered(function(){

  $('.datepicker').pickadate({
    close: 'submit',
    clear: '',
    onStart: function() {
       var date = new Date()
       this.set('select', [date.getFullYear(), date.getMonth(), date.getDate()]);
     }
   });

  $('.timepicker').lolliclock();

  $('#symptom-intensity-slider').ionRangeSlider({
      values: ['strong','middle','neither','light','sensible'],
      grid: true,
      from: 2
   });

   $('#physical-state-slider').ionRangeSlider({
     values: ['sick','ailing','neither','normal','healthy'],
     grid: true,
     from: 2
   });

   $('.durationpicker').lolliclock({
     hour24: true
   });

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
});
