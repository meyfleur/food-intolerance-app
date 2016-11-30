import './add-symptoms.html'
import './add-food.js'

Template.addSymptoms.helpers({

});

Template.addSymptoms.inheritsHooksFrom('addFood')
Template.addSymptoms.inheritsHelpersFrom('addFood')

Template.addSymptoms.rendered = (function() {
    $('#symptom-intensity-slider').ionRangeSlider({
      values: ['light', 'middle', 'strong'],
      grid: true,
      from: 0
   });
});
