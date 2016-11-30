import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    process.env.MAIL_URL

    Accounts.urls.resetPassword = function(token) {
        return Meteor.absoluteUrl('reset-password/' + token);
    };
});
