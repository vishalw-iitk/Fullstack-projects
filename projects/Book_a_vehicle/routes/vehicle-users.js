const Usersdata = require('../models/vehicle-users')

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

// route to render the login.ejs
router.get('/login', (req, res)=>{
    res.render('login.ejs')
})

// route to render the register.ejs
router.get('/register', (req, res)=>{
    res.render('register.ejs')
})

// VScode check route to get the info of all the users
router.get('/register-info', async (req, res)=>{
    try{
        const users = await Usersdata.find()
        res.status(201).json(users)
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
})

// VSCode check route to fill the register form in vscode routes.rest
router.post('/register-info', async (req, res)=>{
    user = await Usersdata.find({username : req.body.username}).exec()
    if(user.length !== 0){
        res.status(400).json({"message": "User already exists"})
    }
    else{
        const salt = await bcrypt.genSalt()
	    const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const user = new Usersdata({
            name : req.body.name,
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword
        })
        try{
            const newuser = await user.save()
            res.status(201).json(newuser)
        }
        catch(err){
            res.status(400).json({message: err.message})
        }
    }
})

// route to redirect over login page after the registration is done
router.post('/register', async (req, res)=>{
    user = await Usersdata.find({username : req.body.username}).exec()
    if(user.length !== 0){
        res.status(400).json({"message": "User already exists"})
    }
    else{
        const salt = await bcrypt.genSalt()
	    const hashedPassword = await bcrypt.hash(req.body.password, salt)
        
        const user = new Usersdata({
            name : req.body.name,
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword
        })
        try{
            const newuser = await user.save()
            res.redirect('/login')
        }
        catch(err){
            res.status(400).json({message: err.message})
        }
    }
})


// VScode route to ensure that the login info is present in database and display status success
router.post('/login-ok', async (req, res)=>{
    try{
        user = await Usersdata.find({username : req.body.username}).exec()
        console.log(user)
        if(user.length === 0){
            res.status(400).send('Cannot find the user')
        }
        console.log(req.body.password)
        console.log(user[0].password)
        if(await bcrypt.compare(req.body.password, user[0].password)){
            res.send('Success')
        }
        else{
            res.send('Not allowed')
        }
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
})

//route to ensure that the user is registered and then redirect to home page
router.post('/login', async (req, res)=>{
    try{
        user = await Usersdata.find({username : req.body.username}).exec()
        console.log(user)
        if(user.length === 0){
            res.status(400).send('Cannot find the user')
        }
        if(await bcrypt.compare(req.body.password, user[0].password)){
            res.redirect('/register')
        }
        else{
            res.send('Not allowed')
        }
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
})

// middleware to check that the entry is not present in the database
async function present(req, res, next){
    let user
    try{
        user = await Usersdata.find({username : req.body.username}).exec()
        if(user === null || user === undefined){
            console.log(user)
            return res.status(404).json({"message": "Cannot find the user. User not register"})
        }
    }
    catch{
        return res.status(500).json({"message":err.message})
    }
    res.user = user
    next()
}



module.exports = router