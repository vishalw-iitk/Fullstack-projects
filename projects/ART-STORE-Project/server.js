if(process.env.NODE_ENV!=='production'){
    require('dotenv').config({path:'.env'});
}

const stripesecretkey = process.env.SECRET_KEY
const stripepublickey = process.env.PUBLISHABLE_KEY



// console.log(stripesecretkey, stripepublickey)

const express = require('express')
const app = express()
const fs = require('fs')




app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/index',function(req, res){
    fs.readFile('items.json', function(error, data){
        if(error){
            res.status(500).end()
        } else{
            res.render('index.ejs', {
                items : JSON.parse(data)
            })
        }
    })
})


console.log('server running......')

app.listen(3000)
