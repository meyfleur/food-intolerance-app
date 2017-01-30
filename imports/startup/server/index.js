import { Meteor } from 'meteor/meteor';
let fs = require('fs');

Meteor.startup(() => {

    process.env.MAIL_URL

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
