const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


function initialize(passport, getUserByUsername, getUserById){
    const authenticateUser = async (username, password, done) => {
        const user = await getUserByUsername(username)
        console.log(user)
        if(user.length === 0){
            return done(null, false, { message : 'No user with that username'})
        }
        try{
            if(await bcrypt.compare(password, user[0].password)){
                return done(null, user)
            }
            else{
                return done(null, false, { message : 'Password incorrect'})
            }
        }
        catch(err){
            return done(err)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'username'}, authenticateUser))
    passport.serializeUser((user, done) => { done(null, user[0].id) })
    passport.deserializeUser((id, done) => { done(null, getUserById(id)) })
}

module.exports = initialize


