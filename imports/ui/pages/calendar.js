import Food from '../../api/food'
import Symptoms from '../../api/symptoms'
import './calendar.html'
var MobileDetect = require('mobile-detect')
md = new MobileDetect(window.navigator.userAgent)

Template.calendar.onCreated(function(){
  const instance = this
  instance.getFoodEvents = new ReactiveDict()
  instance.getSymptomEvents = new ReactiveDict()
  instance.events = new ReactiveDict()

  this.autorun(()=>{
    this.subscribe('food', function(){
        let foodEvents = Food.find({createdBy: Meteor.userId()},{fields:{createdBy:0, createdAt:0, username:0}}).fetch()
        instance.getFoodEvents.set('food', foodEvents)
    }),

    this.subscribe('symptoms', function(){
      let symptomEvents = Symptoms.find({createdBy: Meteor.userId()},{fields:{createdBy:0, createdAt:0, username:0}}).fetch()
      instance.getSymptomEvents.set('symptoms', symptomEvents)

      Tracker.afterFlush(()=>{
         let events = []
         const foodEvents = instance.getFoodEvents.get('food')
         const symptomEvents = instance.getSymptomEvents.get('symptoms')

         foodEvents.map((event)=>{
           events.push(event)
         })
         symptomEvents.map((event)=>{
           events.push(event)
         })
         setupCalendar(events)
         addLegende('.fc-toolbar')
      })
    })
  })
})

function setupCalendar(events){
  formatEvents = events.map((event)=>{
    const { slug, _id, food, symptoms, drink, stressLvlName, conditionName, medicaments, notes, physicalStateName, intensityName} = event
    let { date, time, duration} = event
    duration = moment(duration, 'HH:mm').format('HH:mm')
    time = moment(time, 'hh:mm A').format('hh:mm')
    date = moment(date, 'DD MMM, YYYY').format('YYYY-MM-DDT')

    let FoodDescrip =  {
      'Drink': drink,
      'Stress Level': stressLvlName,
      'Condition': conditionName,
      'Medicaments/ Supplements': medicaments ? medicaments : '-',
      'Notes': notes ? notes : '-'
    }
    let SymptomsDescrip =  {
      'Duration': duration + ' hours',
      'Intensity': intensityName,
      'Physical State': physicalStateName,
      'Medicaments': medicaments ? medicaments : '-',
      'Notes': notes ? notes : '-'
    }

    let events = {
      _id: _id,
      slug: slug,
      title: food ? food.join(', ') : symptoms.join(', '),
      start: date+time,
      color: food ? '#29B6F6' : '#FF8F00',
      description: slug == 'Food' ? FoodDescrip : SymptomsDescrip
    }
    return events
  })

  let options = {
    header: {
       center: 'month,listWeek,listDay',
       right: 'prev,next'
    },
    defaultView: 'month',
    views: {
      listDay:{
        buttonText: 'list day',
        titleFormat: 'D MMMM, YYYY',
      },
      listWeek:{
        buttonText: 'list week',
        titleFormat: 'D MMMM, YYYY',
      },
      agenda: {
        allDaySlot: false,
        slotDuration: '01:00:00',
        slotLabelInterval: '02:00:00',
      }
    },
    timeFormat: 'hh:mm a',
    events: formatEvents,
    eventRender: function(event, element){
      let id = event._id
      addDescription('.fc-list-item-title', event, element)
      addEventBtns('.fc-list-item-title', element, event)
      clickUpdate('#updateFood', event, element)
      clickUpdate('#updateSymptoms', event, element)
      clickDelete('.modal-trigger', event, element)
      element.find('.modal-trigger').leanModal()
    },
    eventClick: function(event){
      $('#calendar').fullCalendar('changeView','listDay')
      $('#calendar').fullCalendar('gotoDate', event.start)
    }
  }

  $('#calendar').fullCalendar(options)
  responsiveCheck()
  changeViewMobile()
}

function responsiveCheck(){
  $(window).resize(function(event) {
    let size = $(window).width()
    if(size < 700){
      $('#calendar').fullCalendar('changeView', 'listWeek')
      $('#calendar').fullCalendar({
        header: {
           center: 'listWeek,listDay',
           right: 'prev,next'

        },
        defaultView: 'listWeek',
        right: 'prev,next'
      })
    }
  })
}

function changeViewMobile(){
  if(md.mobile()){
    $('#calendar').fullCalendar({
      header: {
         center: 'listWeek,listDay',
         right: 'prev,next'
      },
      defaultView: 'listWeek'
    })
    $('#calendar').fullCalendar('changeView', 'listWeek')
  }
}

function clickDelete(modalBtn, event, element){
  element.find(modalBtn).click(function(evt){
    eventId = event._id
    slug = event.slug

    $('#delete'+slug).click(function(){
      Meteor.call('delete'+slug, eventId, (err)=>{
        if(err){
          throw err
          Materialize.toast('<i class="ion-close-round"></i> Validation Error', 1000, 'red')
        } else {
          $('#calendar').fullCalendar( 'removeEvents', eventId)
          Materialize.toast('<i class="ion-checkmark-round"></i>'+' Entry deleted', 1000, 'teal lighten-1')
          Meteor.setTimeout(function(){
            if(md.mobile()){
              $('#calendar').fullCalendar( 'changeView', 'listWeek')
            } else {
              $('#calendar').fullCalendar( 'changeView', 'month')
            }
          }, 2000);
        }
      })
    })
  })
}

function clickUpdate(obj, event, element){
  element.find(obj).click(function(){
    const eventId = event._id
    const slug = event.slug
    slug == 'Food' ? FlowRouter.go('/update-food/'+ eventId) : FlowRouter.go('/update-symptoms/'+ eventId)

  })
}

function addEventBtns(listEl, element, event){
    element.find(listEl).append('<div class="eventBtn"><a id="update'+event.slug+'" class="waves-effect waves-light btn right"><i class="ion-edit waves-effect teal lighten-1"></i></a><a href="#modalDelete'+event.slug+'" class="modal-trigger waves-effect waves-light btn right red"><i class="ion-trash-b red"></i></a></div>')
}

function addDescription(obj, event, element){
  let description = event.description
  for (const [key, val] of Object.entries(description)) {
      element.find(obj).append('<div>'+ key + ': ' + val + '</div>')
  }
}

function addLegende(el){
  $(el).append('<div class="legende"><div class="description"><div class="circle food"></div><span>Food Entry</span><div class="circle symptoms"></div><span>Symptom Entry</span></div></div>')
}
