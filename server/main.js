import { Meteor } from 'meteor/meteor';

import '../lib/server/account-methods.js';

Meteor.startup(() => {
    process.env.MAIL_URL
});
