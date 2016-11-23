import { Template } from 'meteor/templating'
import toastr from 'toastr'
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
            Meteor.call('changeUsername', username)
            toastr.success();
        }

        if(email != mail) {
            Meteor.call('changeEmail', email)
            toastr.success();
        }
    }


});

Template.customPwdFormBtn.replaces('atPwdFormBtn');

toastr.options = {
    "closeButton": false,
    "debug": false,
    "positionClass": "toast-top-left",
    "preventDuplicates": false,
    "onclick": null,
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}
