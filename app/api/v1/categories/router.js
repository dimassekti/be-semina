const express = require("express");
const router = express();

const { create, index, find, update, destroy } = require("./controller");

router.get("/", index);
router.post("/", create);
router.get("/:id", find);
router.put("/:id", update);
router.delete("/:id", destroy);

// router.get("/", (req, res) => {
//   res.send({ data: "categories" });
// });

module.exports = router;
