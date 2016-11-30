import './customPwdFormBtn.html'
import './settings.html'

Template.settings.helpers({
    'userEmails'(){
        if(Meteor.user()){
            const email = Meteor.user().emails[0].address
            return email
        }
    },
});

Template.settings.events({
   'click .reset-fields'(event){
       const user = Meteor.user()
       event.preventDefault()

       if(user) {
           let mail = user.emails[0].address
           $('#email').val(mail)
           $('#username').val(user.username)
       }
   },

    'submit'(event){
        const user = Meteor.user()
        let username = $('#username').val()
        let email = $('#email').val()
        let mail = Meteor.user().emails[0].address
        event.preventDefault()

        if(username != user.username){
            Meteor.call('changeUsername', username, function(err){
              if(err)
                Materialize.toast('<i class="ion-close-round"></i>', 8000, 'red')
              else
                Materialize.toast('<i class="ion-checkmark-round"></i>',8000,'teal lighten-1 left');
            })
        }

        if(email != mail) {
            Meteor.call('changeEmail', email, function(err) {
              if(err)
                Materialize.toast('<i class="ion-close-round"></i>', 8000, 'red')
              else
                Materialize.toast('<i class="ion-checkmark-round"></i>', 8000, 'teal lighten-1');
            })
        }
    }


});

Template.customPwdFormBtn.replaces('atPwdFormBtn');
