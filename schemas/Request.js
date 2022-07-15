const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema( 
    {
        content: {
            type: String,
            required: true
        }, 
        likedBy: {
            type: [String],
            required: true,
            default: []
        },
        children: {
            type: [Schema.Types.ObjectId],
            ref: "Comment",
            required: false,
        },
        author: {
            type: String,
            required: true
        }
    }
);

const RequestSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true,
        },
        creator_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false
        },
        // foreign key reference
        author: {
            type: String, 
            required: false,
        },
        status: {
            type: String,
            required: true,
            default: 'unresolved',
        },
        likedBy: {
            type: [String],
            required: true,
            default: []
        },
        dislikedBy: {
            type: [String],
            required: true,
            default: []
        },
        latitude: {
            type: Number, 
            required: false,
        },
        longitude: {
            type: Number,
            required: false,
        },
        tags: {
            type: Array,
            required: false
        }, 
        comments: {
            type: [CommentSchema],
            required: true,
            default: [],
        }
    }
);

const request = mongoose.model("Request", RequestSchema);
const comment = mongoose.model("Comment", CommentSchema);

// mongoose will automatically create the collection for our DB
module.exports = Object.freeze({
    Request: request,
    Comment: comment, 
});

