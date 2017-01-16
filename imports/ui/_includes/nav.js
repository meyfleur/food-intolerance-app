import './nav.html'

Template.nav.onRendered(function(){
  $('.button-collapse').sideNav({
     closeOnClick: true,
     menuWidth: 200
  });
});
