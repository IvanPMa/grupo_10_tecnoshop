const db = require('../database/models');

const controller = {
    index: async (req, res) => {
        req.session.currentUrl = '/manage';
        res.render('./manage/index');
    }
}

module.exports = controller;