import { Meteor } from 'meteor/meteor';
let fs = require('fs');

Meteor.startup(() => {

    process.env.MAIL_URL

    Accounts.urls.resetPassword = function(token) {
        return Meteor.absoluteUrl('reset-password/' + token)
    };

    let path = process.env["PWD"] + "/imports/api/data/"
    // let file = Assets.getText('FOOD_DES.txt').replace(/\-|  +|^\||\|$/gm,'').replace(/\r\n/,'')
    //
    // let foodData = Papa.parse(file, {
    //    delimiter: '|',
    //    header: true,
    //    skipEmptyLines: true,
    //    complete: function(results) {
    //      const {data} = results
    //      let test = JSON.stringify(data,null,2)
    //       fs.writeFile(path+'food.json', test,(err)=>{
    //         if(err) throw err
    //         console.log('done')
    //       })
    //    }
    // })
});
