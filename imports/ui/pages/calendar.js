import Food from '../../api/food'
import Symptoms from '../../api/symptoms'
import './calendar.html'

Template.calendar.onCreated(function(){
  const instance = this
  instance.getFoodEvents = new ReactiveDict()
  instance.getSymptomEvents = new ReactiveDict()
  instance.events = new ReactiveDict()

  console.log('oncreated')

  this.autorun(()=>{
    console.log('handle ready')
    this.subscribe('food', function(){

        let foodEvents = Food.find({createdBy: Meteor.userId()},{fields:{createdBy:0, createdAt:0, username:0}}).fetch()

        console.log('set foodEvents',foodEvents)
        instance.getFoodEvents.set('food', foodEvents)
    }),
    this.subscribe('symptoms', function(){

      let symptomEvents = Symptoms.find({createdBy: Meteor.userId()},{fields:{createdBy:0, createdAt:0, username:0}}).fetch()

      instance.getSymptomEvents.set('symptoms', symptomEvents)
      console.log('set symptomEvents',symptomEvents)

      Tracker.afterFlush(()=>{
         console.log('tracker start')
         let events = []
         const foodEvents = instance.getFoodEvents.get('food')
         const symptomEvents = instance.getSymptomEvents.get('symptoms')
         console.log('get food events', foodEvents)
         console.log('get symptom events', symptomEvents)
         foodEvents.map((event)=>{
           events.push(event)
         })
         symptomEvents.map((event)=>{
           events.push(event)
         })
         console.log('push events to array',events)
         setupCalendar(events)
        //  addFilter('.fc-toolbar')
      })
    })
  })
})

function getFieldsKeyVal(fields, obj){
  for (const [key, val] of Object.entries(obj)) {
      console.log(key, val)
  }
}

function setupCalendar(events){
  console.log('events in calendar', events)
  formatEvents = events.map((event)=>{
    const { slug, _id, food, symptoms, drink, stressLvlName, conditionName, medicaments, notes, physicalStateName, intensityName} = event
    let { date, time, duration} = event
    time = moment(time, 'hh:mm A').format('hh:mm')
    let end_time = symptoms ? moment(duration, 'HH:mm').format('HH:mm') : ''
    date = moment(date, 'DD MMM, YYYY').format('YYYY-MM-DDT')

    let FoodDescrip =  {
      'Drink': drink,
      'Stress Level': stressLvlName,
      'Condition': conditionName,
      'Medicaments': medicaments ? medicaments : '-',
      'Notes': notes ? notes : '-'
    }
    let SymptomsDescrip =  {
      'Physical State': physicalStateName,
      'Intensity': intensityName,
      'Medicaments': medicaments ? medicaments : '-',
      'Notes': notes ? notes : '-'
    }

    // console.log('date_time', date+time)
    // console.log('time', moment(time,'hh:mm'))
    // console.log('duration', moment.duration(end_time,'HH:mm').humanize())
    // console.log(moment(date+time, 'YYYY-MM-DDThh:mm').add(moment.duration(end_time,'hh:mm')))
    // console.log(event.slug)
    // console.log('______________________')

    let events = {
      _id: _id,
      slug: slug,
      title: food ? food.join(', ') : symptoms.join(', '),
      start: date+time,
      color: food ? '#29B6F6' : '#FF8F00',
      description: slug == 'food' ? FoodDescrip : SymptomsDescrip
    }
    return events
  })

  console.log('formated events',formatEvents)

  $('#calendar').fullCalendar({
    header: {
       center: 'month,listWeek,listDay',
       right: 'prev,next'
    },
    defaultView: 'listDay',
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
      addEventBtns('.fc-list-item-title', element, event)
      addDescription('.fc-list-item-title', event, element)
      clickUpdate('#updateFood', event, element)
      clickUpdate('#updateSymptoms', event, element)
      clickDelete('.modal-trigger', event, element)
      element.find('.modal-trigger').leanModal()
    }
  })
}

function clickDelete(modalBtn, event, element){
    element.find(modalBtn).click(function(){
    eventId = event._id
    slug = event.slug

    if(slug == 'food'){
      $('#deleteFood').click(function(){
        console.log(eventId)
        Meteor.call('deleteFood', eventId, (err)=>{
          if(err){
            console.log(err)
          } else {
            $('#calendar').fullCalendar( 'removeEvents', eventId)
          }
        })
      })
    } else {
      $('#deleteSymptoms').click(function(){
        console.log(eventId)
        console.log(event)
        Meteor.call('deleteSymptoms', eventId, (err)=>{
          if(err){
            console.log(err)
          } else {
            $('#calendar').fullCalendar( 'removeEvents', eventId)
          }
        })
      })
    }
  })
}

function clickUpdate(obj, event, element){
  element.find(obj).click(function(){
    const eventId = event._id
    const slug = event.slug
    slug == 'food' ? FlowRouter.go('/update-food/'+ eventId) : FlowRouter.go('/update-symptoms/'+ eventId)

  })
}

function addEventBtns(listEl, element, event){
  if(event.slug == 'food'){
    element.find(listEl).append('<div class="eventBtn"><a id="updateFood" class="waves-effect waves-light btn right"><i class="ion-edit waves-effect teal lighten-1"></i></a><a href="#modalDeleteFood" class="modal-trigger waves-effect waves-light btn right red"><i class="ion-trash-b red"></i></a></div>')
  } else {
    element.find(listEl).append('<div class="eventBtn"><a id="updateSymptoms" class="waves-effect waves-light btn right"><i class="ion-edit waves-effect teal lighten-1"></i></a><a href="#modalDeleteSymptom" class="modal-trigger waves-effect waves-light btn right red"><i class="ion-trash-b red"></i></a></div>')
  }
}

function addDescription(obj, event, element){
  let description = event.description
  for (const [key, val] of Object.entries(description)) {
      element.find(obj).append('<div>'+ key + ': ' + val + '</div>')
  }
}

function addFilter(obj, element){
  $(obj).append('<span>Filter: </span><div class="filter input-field"><input id="search" type="search"><i class="ion-close-round"></i></div>')
}
