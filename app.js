const express = require('express');
const app = express();
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'blogsDb',
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then((res) => {
    app.listen(3000);
    console.log('connect database');
})
.catch((err) => console.log(err));

app.set('view engine', 'ejs');

// static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
// routes
app.get('/', (req, res) => {
   res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about.ejs', { title: 'About' });
});
// redirect
app.get('/about-us', (req, res) => {
    res.redirect('./about');
});
// use blog routesmongoose.set('useFindAndModify', false);
app.use('/blogs', blogRoutes);
// set 404 page
app.use((req, res) => {
    res.status(404).render('404.ejs', { title: 'Not Found' })
});

// mongoose and mongo usage excample
// add new document routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about new blog',
//         body: 'content new blog'
//     });
//     blog.save()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });

// // retrieve all data
// app.get('/all-blogs', (req, res) => {
//     Blog.find().then( (result) => res.send(result)).catch( (err) => console.log(err));
// });

// // find specific data
// app.get('/single-blog', (req, res) => {
//     Blog.findById('5f0eb5d47641c149d8f962ac').then((result) => res.send(result)).catch((err) => console.log(err));
// });

