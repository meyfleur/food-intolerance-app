import './layout.html'
import './_includes/nav.html'
import './_includes/footer.html'

Template.footer.onRendered(()=>{
  $('.modal-trigger').leanModal()
});

Template.nav.onRendered(function(){
  $('.button-collapse').sideNav({
     closeOnClick: true
  });
  $('.collapsible').collapsible()
});
