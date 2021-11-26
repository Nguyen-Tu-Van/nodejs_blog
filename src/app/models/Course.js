const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Course = new Schema(
    {
        _id: { type: Number },
        name: { type: String, default: 'Javascript' },
        describe: { type: String },
        image: { type: String },
        level: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        videoId: { type: String },
    },
    {
        timestamps: true,
        _id: false,
    },
);

//query helper functions
Course.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isCheckType = ['desc', 'asc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isCheckType ? req.query.type : 'desc',
        });
    }
    return this;
};
//add plugin
mongoose.plugin(slug);
Course.plugin(AutoIncrement);
Course.plugin(mongoose_delete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Course', Course);
