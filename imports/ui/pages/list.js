import Food from '../../api/food'
import Symptoms from '../../api/symptoms'
import './list.html'


Template.list.onCreated(function(){
  this.state = new ReactiveDict();
  var self = this
  self.autorun(function(){
    self.subscribe('food')
    self.subscribe('symptoms')
  })

});

Template.list.helpers({
  food(){
    return Food.find({}, {sort:{createdAt: -1}});
  },
  symptoms(){
    return Symptoms.find({}, {sort:{createdAt: -1}});
  }
});
