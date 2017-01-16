let fs = Npm.require('fs')

Meteor.methods({
  getJson:function(file_path,file_name){
    let path = process.env["PWD"] + "/imports/api/data/"
    let file = Assets.getText(file_path).replace(/\-|  +|,|^\||\|$/gm,'').replace(/\r\n/,'')

    let foodData = Papa.parse(file, {
       delimiter: '|',
       header: true,
       skipEmptyLines: true,
       complete: function(results) {
         const {data} = results
         let test = JSON.stringify(data,null,2)
          fs.writeFile(path+file_name, test,(err)=>{
            if(err) throw err
            console.log('done')
          })
       }
    })
  }
});
