var expressSanitizer = require("express-sanitizer"),
var methodOverride = require("method-override"),
var bodyParser = require("body-parser"),
var mongoose = require("mongoose"),
var express = require("express"),
var app = express();
var path = require('path');


const blogrouter = require('./routes/blogs');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.disable('etag');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
mongoose.Promise=global.Promise;
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true }));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost:27017/blog",{useNewUrlParser: true});



app.get("/",function(req,res){
    res.redirect("/blogs")
});

app.use('/blogs',blogrouter)

app.listen(3600,function(){
    console.log("Blog Server started");
});
