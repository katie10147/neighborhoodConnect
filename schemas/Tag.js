const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagsSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
    }
);

// mongoose will automatically create the collection for our DB
module.exports = mongoose.model("Tags", TagsSchema);

