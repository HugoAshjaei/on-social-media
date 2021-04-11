const express = require("express");
const router = express.Router();

const {
    getProfile,
    getProfileActivity
} = require('../../controllers/api/virgool');

const {
    hasID
} = require('../../middleware/idValidator');

router.get(
    "/",
    hasID,
    getProfile
);

router.get(
    "/activity",
    hasID,
    getProfileActivity
);

module.exports = router;
