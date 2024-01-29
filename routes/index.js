const router = require("express").Router();
const userrouter = require("./user.route");
const adminrouter = require("./admin.route");
const indexuser = "/ap1/v1";
const indexadmin = "/ap2/v2";

const checkrole = (userRoles, adminRoles) => {
  return (req, res, next) => {
    const userroles = Array.isArray(userRoles);
    const sysroles = Array.isArray(adminRoles);
    const result = userroles.filter((role) => sysroles.includes(role));
    if (!result) throw new new Error({ msg: "permssion denied" })();
  };
};
// async function checkrole(userRoles, adminRoles, req) {
//   await checkrole(req.header);
//   const userroles = Array.isArray(userRoles);
//   const sysroles = Array.isArray(adminRoles);
//   const result = userroles.filter((role) => sysroles.includes(role));
//   if (!result) throw new new Error({ msg: "permssion denied" })();
// }
// const userroles = req.header.userRoles;
// const adminroles = req.header.adminRoles;
// if (userroles == "user") {
//   throw new Error("Access denied. User token missing.");
// } else if (adminroles == "admin") {
//   res.json({ msg: "admin" });
//   next("admin");
// } else {
//   res.json({ msg: "error" });
// }
router.get("/user/:id", checkrole(["user"], ["admin"]), (req, res, next) => {
  if (req.header.includes(userRoles)) next("user");
  else {
    next("admin");
  }
});
router.get("/user", checkrole(["user"]), (res, next, req) => {
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
