import './nav.html'

Template.nav.events({
  "click .button-collapse"(){
    $('.button-collapse').sideNav({
      closeOnClick: true,
      menuWidth: 170
    });
  }
});
