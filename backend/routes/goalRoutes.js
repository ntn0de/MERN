const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalController");

// router.get("/", getGoals );
// router.post("/", setGoals);
// alternatively we can also write:
router.route("/").get(getGoals).post(setGoals);

// router.put("/:id", updateGoals);
// router.delete("/:id", deleteGoals);
// alternatively we can also write:
router.route("/:id").put(updateGoals).delete(deleteGoals);

module.exports = router;
