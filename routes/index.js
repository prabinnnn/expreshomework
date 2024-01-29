const router = require("express").Router();
const userrouter = require("./user.route");
const adminrouter = require("./admin.route");
const indexuser = "/ap1/v1";
const indexadmin = "/ap2/v2";

const checkrole = (userRoles, adminRoles) => {
  return (req, res, next) => {
    const result = userRoles.includes(adminRoles);
    if (!result) throw new new Error({ msg: "permssion denied" })();
  };
};
router.get("/user/:id", checkrole("user", "admin"), (req, res, next) => {
  if (req.header.includes(userRoles)) next("user");
  else {
    next("admin");
  }
});
router.get("/user", checkrole("user"), (res, next, req) => {
  try {
    res.send({ msg: "access denied" });
  } catch (e) {
    next(e);
  }
});
router.get("/user", checkrole(["admin"]), (res, next, req) => {
  try {
    res.send({ msg: "accessed" });
  } catch (e) {
    next(e);
  }
});
router.use(`${indexuser}`, userrouter);
router.use(`${indexadmin}`, adminrouter);
module.exports = router;
