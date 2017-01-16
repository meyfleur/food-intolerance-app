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
            Meteor.call('changeUsername', username, (err) => {
              if(err){
                $('#username').removeClass('valid').addClass('invalid')
                Materialize.toast('<i class="ion-close-round"></i> Username already exist', 3000, 'red')
              }
              else{
                Materialize.toast('<i class="ion-checkmark-round"></i> Update Name',3000,'teal lighten-1');
              }
            })
        }

        if(email != mail) {
            Meteor.call('changeEmail', email, (err) => {
              if(err)
                Materialize.toast('<i class="ion-close-round"></i>', 3000, 'red')
              else
                Materialize.toast('<i class="ion-checkmark-round"></i> Update Email', 3000, 'teal lighten-1');
            })
        }
    }


});

Template.customPwdFormBtn.replaces('atPwdFormBtn');
