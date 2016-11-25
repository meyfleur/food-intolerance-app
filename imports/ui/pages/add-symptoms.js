import dateFormat from 'dateformat'
import './add-symptoms.html'

Template.addSymptoms.helpers({
  'getCurrentTime'(){
    let time = new Date()
    let currentTime = dateFormat(time, 'h:MM TT')
    return currentTime
  }
});
