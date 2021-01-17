const express = require('express');
const router = express.Router();
const userService = require('./user.service');

router.get('/list', getAuditList);
const db = require('../_helpers/db');
const Audit = db.Audit;

module.exports = router;

function getAuditList(req, res, next) {
    userService.getAuditList(req.query.user_id)
        .then(audit => res.json(audit))
        .catch(err => next(err));
}
