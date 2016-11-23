Meteor.methods({
    'userExists'(username){
        return !!Meteor.users.findOne({username: username});
    },

    'changeUsername'(new_username){
        Meteor.users.update(Meteor.userId(),{$set:{'username': new_username}})
    },

    'changeEmail'(new_email){
        Meteor.users.update(Meteor.userId(), {$set: {'emails.0.address': new_email}});
    }
});