const express = require('express');
const db = require('./config/db');
const subCatRouter = require('./routers/subCatRoutes');
const CatRouter = require('./routers/categoryRoutes');
const ProductRouter = require('./routers/productRoutes');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const authenticate = require('./middleware/authenticate');
const setUserData = require('./middleware/setUserData');
const ensureUserAccess = require('./middleware/ensureUserAccess');
const userRouter = require('./routers/userRoute');
const managerRouter = require('./routers/managerRoute');

const app = express()

app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(express.static('public'));
app.use(express.static('upload'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret_Key',
    resave: false,
    saveUninitialized: false,
}));

// Routes
app.use('/category', CatRouter)
app.use('/subcategory', subCatRouter)
app.use('/product', ProductRouter)
app.use('/manager', managerRouter)
app.use('/user', userRouter)

app.get('/', authenticate, setUserData, ensureUserAccess, (req, res) => {
    res.render('pages/index')
})

// Start the server
app.listen(3000, (err) => {
    db();
    if (err) {
        console.log('server Not Start')
    }
    console.log(`listing on port http://localhost:3000`)
})