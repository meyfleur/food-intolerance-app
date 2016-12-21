import Food from '../../api/food'
import Symptoms from '../../api/symptoms'
import './calendar.html'

Template.calendar.onCreated(function(){
  const instance = this
  instance.getFoodEvents = new ReactiveDict();
  console.log('oncreated')
  this.autorun(()=>{
    console.log('handle ready')
    this.subscribe('food', function(){

    })
  })
})

Template.calendar.helpers({
  foodEvents(){
    foodEvents = Food.find({}, {fields: {date: 1, food: 1, time:1, drink:1}}).fetch()
    console.log(foodEvents)
    return foodEvents
  },
  options(){
    return {
      header: {
         center: 'month,agendaWeek,agendaDay,listDay,listWeek',
         right: 'prev,next'
      },
      views: {
        agenda: {
          allDaySlot: false,
          slotDuration: '01:00:00',
          slotLabelInterval: '02:00:00',
        },
        week: {
          titleFormat: 'D MMMM, YYYY',
          columnFormat: 'D ddd'
        },
        day: {
          titleFormat: 'D MMMM, YYYY',
          columnFormat: 'D dddd'
        }
      }
    }
  }
})

function setupCalendar(){
  $('#calendar').fullCalendar({
    header: {
       center: 'month,agendaWeek,agendaDay,listDay,listWeek',
       right: 'prev,next'
    },
    views: {
      agenda: {
        allDaySlot: false,
        slotDuration: '01:00:00',
        slotLabelInterval: '02:00:00',
      },
      week: {
        titleFormat: 'D MMMM, YYYY',
        columnFormat: 'D ddd'
      },
      day: {
        titleFormat: 'D MMMM, YYYY',
        columnFormat: 'D dddd'
      },
      list: {
        listDayAltFormat: 'D MMMM, YYYY'
      }
    },
    events: [{
      start: '2016-12-18T13:45',
      end: '2016-12-20T00:20:00',
      title: 'test',
      color: '#29B6F6'
    },
    {
      start: '2016-12-21T12:45',
      title: 'test2',
      color: '#FF8F00'
    },
    {
      start: '2016-12-21T13:45',
      title: 'test3',
      color: '#FF8F00',
      end: '2016-12-24',
      overlap: false
    },
    {
      start: '2016-12-21T12:45',
      title: 'test4',
      color: '#29B6F6'
    },
  ]
  })
}


/*Template.calendar.onRendered(()=>{
  $('#calendar').fullCalendar({
    header: {
       center: 'month,agendaWeek,agendaDay,listDay',
       right: 'prev,next'
    },
    views: {
      agenda: {
        allDaySlot: false,
        slotDuration: '01:00:00',
        slotLabelInterval: '02:00:00',
      },
      week: {
        titleFormat: 'D MMMM, YYYY',
        columnFormat: 'D ddd'
      },
      day: {
        titleFormat: 'D MMMM, YYYY',
        columnFormat: 'D dddd'
      },
      list: {
        listDayAltFormat: 'D MMMM, YYYY'
      }
    },
    events: [{
      start: '2016-12-18T13:45',
      title: 'test',
      color: '#29B6F6'
    },
    {
      start: '2016-12-21T12:45',
      title: 'test2',
      color: '#FF8F00'
    },
    {
      start: '2016-12-21T12:45',
      title: 'test2',
      color: '#29B6F6'
    }
  ]
  })
})*/
