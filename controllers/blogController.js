const  { Blog } = require('../models/blog');
const blog = require('../models/blog');

const blogIndex = (req, res) => {
    Blog.find().sort({ createdAt: -1 }).then((result)=> {
        res.render('index.ejs', { title: 'All Blogs', blogs: result});
    }).catch((err) => {
        console.log(err);
    });
}
const blogDetails = (req, res) => {
    // get blog id from route
    const id = req.params.id;
    Blog.findById(id)
    .then((result) => { res.render('details.ejs', { title: 'blogs details', blog: result})}).catch((err) => {
        res.status(404).render('404.ejs', {title: 'Blog Not Found'})    
    });
}
const blogCreateGet = (req, res) => {
    res.render('create.ejs', { title: 'Create New Blog' });
}
const blogCreatePost = (req, res) => {
    // get blog document value from new blog form at create.ejs
    const blog = new Blog(req.body);
    blog.save().then((result) => res.redirect('/')).catch((err) => console.log(err));
}
const blogEdit = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndUpdate(id, { $set: req.body}, {useFindAndModify: false})
    .then((result) => {
        res.json({
            redirect: `/blogs/${id}`
        })
        console.log('edited');
    }).catch(err => console.log(err));
    //  update( {_id: id}, { $set: req.body} ).then((result) => res.redirect(`/blogs/${id}`)).catch(err => console.log(err));
}
const blogDelete = (req, res) => {
    const id = req.params.id;
    // console.log(id);
    Blog.findByIdAndDelete(id).then(result =>{
        res.json({
             redirect: '/' 
        })
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = {
    blogIndex : blogIndex,
    blogDetails: blogDetails,
    blogCreateGet: blogCreateGet,
    blogCreatePost: blogCreatePost,
    blogEdit: blogEdit,
    blogDelete: blogDelete
}