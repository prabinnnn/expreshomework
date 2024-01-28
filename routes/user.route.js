const { error } = require("console");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  try {
    res.json({ msg: "hello" });
  } catch (e) {
    next(e);
  }
});
router.post("/", (req, res, next) => {
  try {
    res.json({ msg: "create ur user" });
  } catch (e) {
    next(e);
  }
});
router.put("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("something is missing");
    res.json({ msg: "udate the user" });
  } catch (e) {
    next(e);
  }
});
router.patch("/", (req, res, next) => {
  try {
    const data = object.key(req.body).length;
    if (!data) throw new error("something missing");
    res.json({ msg: "update single user" });
  } catch (e) {
    next(e);
  }
});
router.delete("/", (req, res, next) => {
  try {
    const data = object.key(req.body).length;
    if (!data) throw new error("something is missing");
    res.json({ msg: "dlete a single userid" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
