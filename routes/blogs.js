const express = require('express');
const router = express.Router();
const blog=require('.././schema/blog');



router.get("/", function(req, res) {
  blog.blog.find({}, function(err, blogs) {
    if (err) {
      console.log("Error!!!!");
    } else {
      res.render("index", {
        blogs: blogs
      });
    }
  })
});

// NEW Route
router.get("/new", function(req, res) {
  res.render("new");
});

// CREATE Route
router.post("/", function(req, res) {
  console.log('post blogs')
  req.body.blog.body = req.sanitize(req.body.blog.body);
  blog.blog.create(req.body.blog, function(err, newBlog) {
    if (err) {
      res.render("new");
    } else {
      res.redirect("/blogs");
    }
  });
});

// SHOW Route
router.get("/:id", function(req, res) {
  console.log('blog id')
  blog.blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("show", {
        blog: foundBlog
      });
    }
  });
});

// EDIT Route
router.get("/:id/edit", function(req, res) {
  console.log(' blog id edit')
  blog.blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("edit", {
        blog: foundBlog
      });
    }
  });
});

// UPDATE Route
router.put("/:id", function(req, res) {
  console.log('blog id put')
  req.body.blog.body = req.sanitize(req.body.blog.body);
  console.log(req.body.blog);
  blog.blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  });
});

// DELETE Route
router.delete("/:id", function(req, res) {
  console.log('delete')
  blog.blog.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs");
    }
  });
});

// Listening to the port
module.exports= router;
