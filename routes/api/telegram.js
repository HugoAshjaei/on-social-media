const express = require("express");
const router = express.Router();

const {
    getProfile,
} = require('../../controllers/api/telegram');

const {
    hasID
} = require('../../middleware/idValidator');

router.get(
    "/",
    hasID,
    getProfile
);

module.exports = router;
