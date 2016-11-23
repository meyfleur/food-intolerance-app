import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    process.env.MAIL_URL = 'smtp://meychen.95@googlemail.com:MeyChenTranQii_220695@smtp.gmail.com:587/'

    Accounts.urls.resetPassword = function(token) {
        return Meteor.absoluteUrl('reset-password/' + token);
    };
});
