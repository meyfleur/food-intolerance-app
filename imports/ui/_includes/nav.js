import './nav.html'

Template.nav.onRendered(function(){
  // $('.button-collapse').sideNav({
  //    closeOnClick: true
  // });
});

Template.nav.events({
  "click .button-collapse": function(event, template){
    $('.button-collapse').sideNav({
      closeOnClick: true,
      menuWidth: 170
    });
  }
});
