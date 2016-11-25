import '../../ui/pages/dashboard.html'
import '../../ui/pages/settings.html'
import '../../ui/pages/results.html'
import '../../ui/pages/add-food.html'
import '../../ui/pages/add-symptoms.html'
import '../../ui/pages/list.html'

FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);

FlowRouter.route('/', {
        name: 'Dashboard.show',
        action(){
            BlazeLayout.render('layout', {
                main: 'dashboard',
                nav: 'nav',
                footer: 'footer'
            })
        }
    });

FlowRouter.route('/dashboard/', {
    name: 'Dashboard.show',
    action(){
        BlazeLayout.render('layout', {
            main: 'dashboard',
            nav: 'nav',
            footer: 'footer'
        })
    }
});

FlowRouter.route('/settings/', {
    name: 'Settings.show',
    action(){
        BlazeLayout.render('layout', {
            main: 'settings',
            nav: 'nav',
            footer: 'footer'
        })
    }
});

FlowRouter.route('/results/', {
    name: 'Results.show',
    action(){
        BlazeLayout.render('layout', {
            main: 'results',
            nav: 'nav',
            footer: 'footer'
        })
    }
});

FlowRouter.route('/add-food/', {
    name: 'addFood.show',
    action(){
        BlazeLayout.render('layout', {
            main: 'addFood',
            nav: 'nav',
            footer: 'footer'
        })
    }
});

FlowRouter.route('/add-symptoms/', {
    name: 'addSymptoms.show',
    action(){
        BlazeLayout.render('layout', {
            main: 'addSymptoms',
            nav: 'nav',
            footer: 'footer'
        })
    }
});

FlowRouter.route('/food-symptoms-list/', {
    name: 'list.show',
    action(){
        BlazeLayout.render('layout', {
            main: 'list',
            nav: 'nav',
            footer: 'footer'
        })
    }
});
