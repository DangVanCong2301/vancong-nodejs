const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override')
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require("./config/db")

// Connect to db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded());

app.use(methodOverride('_method'));

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'main',
        helpers: {
            sum: (a, b) => a + b
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views'));

// Route init
route(app);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
