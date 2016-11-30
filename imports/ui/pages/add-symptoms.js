import './add-symptoms.html'
import './add-food.js'

Template.addSymptoms.helpers({

});

Template.addSymptoms.rendered = (function() {
  $('.datepicker').pickadate({
    close: 'submit',
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
