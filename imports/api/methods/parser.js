let fs = Npm.require('fs')

Meteor.methods({
  getJson:function(file_name){
     let file = Assets.getText(file_name).replace(/\-|  +|^\||\|$/gm,'').replace(/\r\n/,'')

     const data = Papa.parse(file, {
        delimiter: '|',
        header: true,
        skipEmptyLines: true,
      	complete: function(results) {
          const {data} = results
          console.log(fs)

            fs.writeFile('food.json', 'bla', (err)=>{
              if(err) console.log(err)
              console.log('done')
            })
            console.log(err)
          }
      });
      return data
    }
  });

      // return fs.readFile(file, function(err, data){
      //   if(err) console.log(err)
      //   console.log(data)
      //   return data
      //
      //   // for (var row in rows) {
      //   //   console.log(row)
      //   // }
      // })
    //  file = JSON.parse(Assets.getText(file_name))
    //  return file