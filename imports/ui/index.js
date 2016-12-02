import { Template } from 'meteor/templating'
import 'ion-rangeslider'
import '../js/lolliclock.js'
import './layout.js'
import './pages/settings.js'
import './pages/add-food.js'
import './pages/add-symptoms.js'

Template.footer.onRendered(()=>{
  $('.modal-trigger').leanModal()
})
