const {
  register,
  login,
  setProfilePicture,
  getUsers,
} = require("../controllers/usersController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setprofilepicture/:id", setProfilePicture);
router.get("/allusers/:id", getUsers);

module.exports = router;
