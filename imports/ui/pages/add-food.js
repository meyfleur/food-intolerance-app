import './add-food.html'

Template.addFood.helpers({
  'getCurrentTime'(){
    let currentTime = moment().format('h:mm A')
    return currentTime
  }
});

Template.addFood.onRendered(function(){
  $('.datepicker').pickadate({
    close: 'submit',
    onStart: function() {
       var date = new Date()
       this.set('select', [date.getFullYear(), date.getMonth(), date.getDate()]);
     }
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
