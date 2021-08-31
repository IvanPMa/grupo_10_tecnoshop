const db = require('../database/models');

const controller = {
    index: async (req, res) => {
        res.render('./manage/index');
    }
}

module.exports = controller;