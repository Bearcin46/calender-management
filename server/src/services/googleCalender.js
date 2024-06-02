import { google } from "googleapis";

const getAuthClient = async (user) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  oauth2Client.setCredentials({
    access_token: user.accessToken,
    refresh_token: user.refreshToken,
  });
  return oauth2Client;
};

const createGoogleCalendarEvent = async (event, user) => {
  const authClient = await getAuthClient(user);
  const calendar = google.calendar({ version: "v3", auth: authClient });
  const googleEvent = {
    summary: event.title,
    description: event.description,
    start: { dateTime: new Date(event.date).toISOString() },
    end: {
      dateTime: new Date(
        new Date(event.date).getTime() + event.duration * 60 * 60 * 1000
      ).toISOString(),
    },
    attendees: event.participants.map((email) => ({ email })),
  };
  const { data } = await calendar.events.insert({
    calendarId: "primary",
    resource: googleEvent,
  });
  return data;
};

module.exports = { createGoogleCalendarEvent };
