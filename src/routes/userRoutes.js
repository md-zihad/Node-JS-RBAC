const router = require("express").Router();
const authVerify = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/roleMiddlware");

router.get("/admin", authVerify, authorizeRole("admin"), (req, res) => {
    res.json({
        message: "This is ADMIN",
    });
});

router.get(
    "/manager",
    authVerify,
    authorizeRole("admin", "manager"),
    (req, res) => {
        res.json({
            message: "This is MANAGER",
        });
    }
);

router.get(
    "/user",
    authVerify,
    authorizeRole("admin", "manager", "user"),
    (req, res) => {
        res.json({
            message: "This is USER",
        });
    }
);

module.exports = router;
