let logOut = function(){
    FlowRouter.go('/sign-in')
}

AccountsTemplates.configure({
    sendVerificationEmail: true,
    showForgotPasswordLink: true,
    negativeValidation: true,
    overrideLoginErrors:false,
    enablePasswordChange: true,
    texts:{
        button: {
            changePwd: 'Update Password'
        }
    },
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

AccountsTemplates.configureRoute('signUp', {
  layoutType: 'blaze',
  name: 'signUp',
  paht: '/sign-up',
  redirect: '/dashboard'
});
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('verifyEmail');
AccountsTemplates.configureRoute('changePwd', {
    redirect: '/settings'
});
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
    errStr: 'username already exists',
    func: function(value){
            var self = this;
            console.log(self)
            Meteor.call('userExists', value, function(err, userExists){
                if (!userExists)
                    self.setSuccess();
                else
                    self.setError(err);
                self.setValidating(false);
            });
            return;
        return Meteor.call('userExists', value)
    },

});
