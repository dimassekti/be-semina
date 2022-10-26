const express = require("express");
const router = express();

router.get("/", (req, res) => {
  res.send({ data: "talents" });
});

module.exports = router;
