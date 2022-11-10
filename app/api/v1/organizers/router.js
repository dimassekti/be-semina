const express = require("express");
const router = express();
const { authenticateUser } = require("../../../middlewares/auth");

const {
  createCMSOrganizer,
  // createCMSUser,
  // getCMSUsers,
} = require("./controller");

// const {
//   authenticateUser,
//   authorizeRoles,
// } = require("../../../middlewares/auth");

router.post(
  "/",
  // authenticateUser,
  // authorizeRoles("owner"),
  createCMSOrganizer
);

// router.post(
//   "/users",
//   authenticateUser,
//   authorizeRoles("organizer"),
//   createCMSUser
// );

// router.get("/users", authenticateUser, authorizeRoles("owner"), getCMSUsers);

module.exports = router;
