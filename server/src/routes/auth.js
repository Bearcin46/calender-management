import express from "express";
import { google } from "googleapis";
import User from "../models/User";

const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

router.get("/google", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar"],
  });
  res.redirect(url);
});

router.get("/google/callback", async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: "v2",
  });
  const { data } = await oauth2.userinfo.get();
  const { id, email } = data;

  let user = await User.findOne({ googleId: id });
  if (!user) {
    user = new User({
      googleId: id,
      email,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    });
    await user.save();
  } else {
    user.accessToken = tokens.access_token;
    user.refreshToken = tokens.refresh_token;
    await user.save();
  }

  res.redirect("http://localhost:3000");
});
module.exports = router;
