import dateFormat from 'dateformat'
import './add-food.html'

Template.addFood.helpers({
  'getCurrentTime'(){
    let time = new Date()
    let currentTime = dateFormat(time, 'h:MM TT')
    return currentTime
  }
});
