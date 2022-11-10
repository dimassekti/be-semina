const express = require("express");
const router = express();
const { create, index, find, destroy, update } = require("./controller");
// const { authenticateUser } = require("../../../middlewares/auth");

// router.get("/", authenticateUser, index);
// router.get("/:id", authenticateUser, find);
// router.put("/:id", authenticateUser, update);
// router.delete("/:id", authenticateUser, destroy);
// router.post("/", authenticateUser, create);

router.get("/", index);
router.get("/:id", find);
router.put("/:id", update);
router.delete("/:id", destroy);
router.post("/", create);

module.exports = router;
