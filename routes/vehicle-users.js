// require('dotenv').config()
const Usersdata = require('../models/vehicle-users')

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')


const passport = require('passport')
const initializePassport = require('../passport-config')
initializePassport(
    passport,
    username => Usersdata.find({username : username}).exec(),
    id => Usersdata.find({id : id}).exec()
)

router.use(flash())
router.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false
}))
router.use(passport.initialize())
router.use(passport.session())
router.use(methodOverride('_method'))


// route to render the login.ejs
router.get('/login', checkNotAuthenticated, (req, res)=>{
    res.render('login.ejs')
})

// route to render the register.ejs
router.get('/register', checkNotAuthenticated, (req, res)=>{
    res.render('register.ejs')
})

// route to render the home.ejs
router.get('/', checkAuthenticated, (req, res)=>{
    res.render('home.ejs')
})

// route to render the home.ejs
router.get('/book', checkAuthenticated, (req, res)=>{
    res.render('book.ejs')
})

// VScode check route to get the info of all the users
router.get('/register-vscode', checkNotAuthenticated, async (req, res)=>{
    try{
        const users = await Usersdata.find()
        res.status(201).json(users)
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
})

// VSCode check route to fill the register form in vscode routes.rest
router.post('/register-vscode', checkNotAuthenticated, async (req, res)=>{
    user = await Usersdata.find({username : req.body.username}).exec()
    if(user.length !== 0){
        res.status(400).json({message: "User already exists"})
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
router.post('/register', checkNotAuthenticated, async (req, res)=>{
    user = await Usersdata.find({username : req.body.username}).exec()
    if(user.length !== 0){
        res.status(400).json({message: "User already exists"})
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


router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

router.get('/', checkAuthenticated, (req, res)=>{
    res.send('Success')
})

//logout
router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})


// VScode route to ensure that the login info is present in database and display status success
// router.post('/login-vscode', async (req, res)=>{
//     try{
//         user = await Usersdata.find({username : req.body.username}).exec()
//         console.log(user)
//         if(user.length === 0){
//             res.status(400).send('Cannot find the user')
//         }
//         console.log(req.body.password)
//         console.log(user[0].password)
//         if(await bcrypt.compare(req.body.password, user[0].password)){
//             res.send('Success')
//         }
//         else{
//             res.send('Not allowed')
//         }
//     }
//     catch(err){
//         res.status(500).json({message : err.message})
//     }
// })

// //route to ensure that the user is registered and then redirect to home page
// router.post('/login', async (req, res)=>{
//     try{
//         user = await Usersdata.find({username : req.body.username}).exec()
//         console.log(user)
//         if(user.length === 0){
//             res.status(400).send('Cannot find the user')
//         }
//         if(await bcrypt.compare(req.body.password, user[0].password)){
//             res.redirect('/register')
//         }
//         else{
//             res.send('Not allowed')
//         }
//     }
//     catch(err){
//         res.status(500).json({message : err.message})
//     }
// })

// middleware to check that the user is authenticated
async function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}

// middleware to check that the user is not authenticated
async function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    next()
}


module.exports = router