const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    githubId: String,
    accessToken: String,
    repos: [String],
    events: [String],
    showcnt: Number,
    Color: String,
    checkCommit: Boolean,
    checkIssue: Boolean,
    checkPr: Boolean
});

module.exports = mongoose.model('User',userSchema);