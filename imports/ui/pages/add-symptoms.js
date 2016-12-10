import './add-symptoms.html'

Template.addSymptoms.events({
  'submit .insert-symptoms'(evt, instance) {
     evt.preventDefault()
     const userId = Meteor.userId()
     const target = evt.target
     let symptomsset = target.symptoms.value == '' ? [] : target.symptoms.value
     const physicalValue = $('#physical-state-slider').data("ionRangeSlider");
     const intensityValue = $('#symptom-intensity-slider').data("ionRangeSlider");
     const symptomsEntry = {
       createdBy: userId,
       username: Meteor.users.findOne(userId).username,
       createdAt: new Date(),
       date: target.date.value,
       duration: target.duration.value,
       symptoms: [symptomsset],
       intensity: intensityValue.old_from,
       intensityName: target.intensity.value,
       physicalState: physicalValue.old_from,
       physicalStateName: target.physicalState.value,
       notes: target.notes.value
     }

     Meteor.call('insertSymptomsEntry', symptomsEntry, (err)=>{
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

Template.addSymptoms.onRendered(function(){

  $('.datepicker').pickadate({
    close: 'submit',
    clear: '',
    onStart: function() {
       var date = new Date()
       this.set('select', [date.getFullYear(), date.getMonth(), date.getDate()]);
     }
   });

  $('#symptom-intensity-slider').ionRangeSlider({
      values: ['none','sensible','light', 'middle', 'strong'],
      grid: true,
      from: 0
   });

   $('#physical-state-slider').ionRangeSlider({
     values: ['none','healthy', 'ailing', 'sick'],
     grid: true,
     from: 0
   });

   $('.durationpicker').lolliclock({
     hour24: true
   });

});
