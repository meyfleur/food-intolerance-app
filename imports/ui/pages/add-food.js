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
});
