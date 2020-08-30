const express = require("express");
const passport = require("passport");

// Initialize a router
const router = express.Router();

//  auth with google
//  GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// goole auth callback when auth is tried
// GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// Logout user
//  GET auth/logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
