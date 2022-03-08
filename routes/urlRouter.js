const express = require("express");
const urlController = require("./../controllers/urlController");

const router = express.Router();

router.route("/shorturl").post(urlController.createShortUrl);
router.route("/shorturl/:short_url").get(urlController.getRedirect);

module.exports = router;
