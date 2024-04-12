const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const errorHandle = require('./middleware/errorHandle');
const flash = require('flash');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/product.route');
const allRoutes = require('./routes/all.route');
require('express-async-errors');
require('dotenv').config();
const http = require('http');

const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT;

app.use(morgan());
app.use(
    cors({
        origin: `${process.env.CLIENT_DOMAIN}`,
        credentials: true,
    })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    session({
        secret: process.env.COOKIE_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true },
    })
);
app.use(cookieParser());
app.use(flash());

userRoutes(app);
productRoutes(app);
allRoutes(app);
app.use(errorHandle);

app.listen(port, () => {
    console.log('server is running on port ', port);
});
