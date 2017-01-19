import { Meteor } from 'meteor/meteor';
let fs = require('fs');

Meteor.startup(() => {

    MAIL_URL="${MAIL_URL:-smtp://${MAILGUN_SMTP_LOGIN}:${MAILGUN_SMTP_PASSWORD}@${MAILGUN_SMTP_SERVER}:${MAILGUN_SMTP_PORT}}"

    Accounts.urls.resetPassword = function(token) {
        return Meteor.absoluteUrl('reset-password/' + token)
    };

    // Meteor.call('getJson', 'NUTR_DEF.txt', 'nutrient.json', function(error, result){
    //   if(error){
    //     console.log("error", error);
    //   } else {
    //     return result
    //   }
    // });
});
