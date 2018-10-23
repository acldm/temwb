const config = require('config-lite')(__dirname)
const Mongolass = require('mongolass')

const mongolass = new Mongolass()
mongolass.connect(config.mongodb)


let post = mongolass.model('post', {
    'title': {type: 'string', required: true},
    'content': {type: 'string', required: true},
    'img': {type: 'string', required: true},
})

module.exports = {
    getPosts: function() {
        return post.find({})
            .exec()
    },

    getPost: function(postid) {
        return post.find({_id: postid})
            .exec()
    }
}


