Template.settings.helpers({
    getUserEmail(){
        const email = Meteor.user().emails[0].adress
    }
});