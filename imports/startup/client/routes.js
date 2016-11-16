import '../../ui/pages/dashboard.html'
import '../../ui/pages/settings.html'
import '../../ui/pages/results.html'

FlowRouter.route(
    '/dashboard/', {
    name: 'Dashboard.show',
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    action(){
        BlazeLayout.render('layout', {
            main: 'dashboard',
            nav: 'nav',
            footer: 'footer'
        })
    }
});

FlowRouter.route(
'/settings/', {
    name: 'Settings.show',
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    action(){
        BlazeLayout.render('layout', {
            main: 'settings',
            nav: 'nav',
            footer: 'footer'
        })
    }
});

FlowRouter.route(
'/results/', {
    name: 'Results.show',
    action(){
        BlazeLayout.render('layout', {
            main: 'results',
            nav: 'nav',
            footer: 'footer'
        })
    }
});