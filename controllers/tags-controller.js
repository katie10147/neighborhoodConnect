const Tag = require('../schemas/Tag');

const createTag = async function (name) {
    const tags = await getAllTags();
    var sameTags = tags.filter(function (tag) {
        return tag.name === name;
    });
    if (sameTags.length) {
        return false;
    }
    const tag = new Tag({
        name: name, 
    })
    try {
        await tag.save();
        return tag;
    } catch(err) {
        console.log(err);
        return false;
    }
}

const getAllTags = async function () {
    try {
        const tags = await Tag.find({}).exec();
        return tags;
    } catch(err) {
        console.log(err);
        return false;
    }
}

const deleteTag = async function (name) {
    try {
        const tags = await Tag.remove({name: name}).exec();
        return tags;
    } catch(err) {
        console.log(err);
        return false;
    }

}

const getTag = async function (name){
    try {
        const tag = await Tag.find({name: name}).exec();
        return tag;
    } catch(err) {
        console.log(err);
        return false;
    }
}


module.exports = Object.freeze({
    getAllTags,
    createTag, 
    deleteTag,
    getTag
})