const express = require('express')
const PostModel = require('./post')
const config = require('config-lite')(__dirname)
const app = new express()

app.use('/images', express.static("public"))

app.get('/posts', (req, res, next) => {
    PostModel
        .getPosts()
        .then(posts => {
            res.json(posts);
        })
        .catch(next);
})

app.get('/post/:postId', (req, res, next) => {
    const postId = req.params.postId;
    PostModel
        .getPost(postId)
        .then(r => {
            const post = r[0];
            if (!post) {
                res.json({
                    error: '未找到资源!'
                });
            }

            res.json(post);
        })
        .catch(next);
})

app.listen(config.port, () => {
    console.log("server start!")
})