const router = require("express").Router();
const userrouter = require("./user.route");
const adminrouter = require("./admin.route");
const bcrypt = require("bcryptjs");
const indexuser = "/ap1/v1";
const indexadmin = "/ap2/v2";

const checkrole = (adminRoles) => {
  return (req, res, next) => {
    const userRoles = [req.body.role || req.header.role];
    if (!userRoles) throw new Error("roles are missing");
    const result = userRoles.some((role) => adminRoles.includes(role));
    if (!result) throw new new Error({ msg: "permssion denied" })();
    next();
  };
};
const encriptpw = (userroles) => {
  return (req, res, next) => {
    const userrole = req.body.string || req.header.string;
    const hasedpw = encriptpw("password");
    console.log(hasedpw, userrole);
    next();
  };
};
router.post(
  "/user",
  checkrole(["user"]),
  encriptpw("password"),
  (res, next, req) => {
    try {
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      res.json({ password: hashedPassword });
      res.send({ msg: "access denied" });
    } catch (e) {
      next(e);
    }
  }
);

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
