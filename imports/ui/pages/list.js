import Food from '../../api/food'
import Symptoms from '../../api/symptoms'
import './list.html'

Template.list.onRendered(()=>{
    $('.modal-trigger').leanModal()
  }
);

Template.list.helpers({
  food(){
    return Food.find({}, {sort:{createdAt: -1}});
  },
  symptoms(){
    return Symptoms.find({}, {sort:{createdAt: -1}});
  }
});
