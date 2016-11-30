import { Template } from 'meteor/templating'
import './layout.js'
import 'ion-rangeslider'
import '../js/lolliclock.js'
import './pages/settings.js'
import './pages/add-food.js'
import './pages/add-symptoms.js'

Meteor.startup(function () {
   $('.modal-trigger').leanModal()
});
