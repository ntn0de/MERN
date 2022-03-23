const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalController");

const { protect } = require("../middleware/authMiddleware");

// router.get("/", getGoals );
// router.post("/", setGoals);
// alternatively we can also write:
router.route("/").get(protect, getGoals).post(protect, setGoals);

// router.put("/:id", updateGoals);
// router.delete("/:id", deleteGoals);
// alternatively we can also write:
router.route("/:id").put(protect, updateGoals).delete(protect, deleteGoals);

module.exports = router;
