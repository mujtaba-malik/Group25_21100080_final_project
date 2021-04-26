//imports.env if in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
//requirements
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

//initializing passport
const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = []
//init
app.set('view-engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname+'/public'));
app.use(flash())

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// Mongo DB Connection
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true , useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))



//dataloading in mongodb
db.collection('employees').insertOne({
  name: "mujtaba",
  password: "NewEmployee",
  salary : 1000,
  description :"cook"
});
db.collection('employees').insertOne({
  name: "Ali",
  password: "NewEmployee",
  salary : 10000,
  description :"waiter"
});
db.collection('employees').insertOne({
  name: "Asif",
  password: "NewEmployee",
  salary : 5000,
  description :"waiter"
});

db.collection('menu').insertOne({
  Item: "Chicken Supreme",
  description: "NewEmployee",
  price : 1000,
});
db.collection('menu').insertOne({
  Item: "Chicken Tikka",
  description: "NewEmployee",
  price : 500,
});
db.collection('menu').insertOne({
  Item: "Pepperoni",
  description: "NewEmployee",
  price : 500,
});
db.collection('inventory').insertOne({
  Item: "Chicken",
  description: "in KGS",
  Quantity : 100,
});
db.collection('inventory').insertOne({
  Item: "flour",
  description: "In Kgs",
  Quantity : 500,
});
db.collection('inventory').insertOne({
  Item: "eggs",
  description: "by the",
  Quantity : 50,
});






//routing
app.get('/dis', (req, res) => {
  res.render('dis.ejs')
})

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name })
})
app.get('/home',(req,res)=>{
  res.render('main_page.ejs')
})
app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

app.listen(3000)