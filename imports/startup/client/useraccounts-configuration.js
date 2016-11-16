let logOut = function(){
    FlowRouter.go('/sign-in')
}

AccountsTemplates.configure({
    //behavior
    sendVerificationEmail: true,
    //appearance
    showForgotPasswordLink: true,
    negativeValidation: true,
    //default routing
    defaultLayoutType: 'blaze', // Optional, the default is 'blaze'
    defaultTemplate: '',
    defaultLayout: 'layout',
    defaultLayoutRegions: {
        nav: 'nav',
        footer: 'footer'
    },
    defaultContentRegion: 'main',
    onLogoutHook: logOut,
});

AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('verifyEmail');
AccountsTemplates.configureRoute('signIn', {
    layoutType: 'blaze',
    name: 'signin',
    path: '/sign-in',
    redirect: '/dashboard'
});

AccountsTemplates.removeField('password');
AccountsTemplates.addField({
    _id: 'password',
    type: 'password',
    required: true,
    minLength: 6,
    re: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
    errStr: 'At least 1 digit, 1 lower-case and 1 upper-case',
});

AccountsTemplates.addField({
    _id: 'username',
    type: 'text',
    required: true,
    minLength: 3,
    func: function(value){
        if (Meteor.isClient) {
            var self = this;
            console.log('validating')
            Meteor.call("userExists", value, function(err, userExists){
                if (!userExists)
                    self.setSuccess();
                else
                    self.setError(userExists);
                self.setValidating(false);
            });
            return;
        }
        // Server
        return Meteor.call("userExists", value);
    },
});