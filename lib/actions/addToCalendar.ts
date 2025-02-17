"use server";

import { auth } from "@/auth";
import { getEvent } from "../event";
import { google } from "googleapis";

export async function addToCalendarAction(event_id: string) {
  const event = await getEvent(event_id);

  if (!event) {
    throw new Error("Event not found");
  }

  const session = await auth();

  const accessToken = session?.user?.googleToken;
  const refreshToken = session?.user?.googleRefreshToken;

  console.log(refreshToken, "refresh token");

  if (!accessToken) {
    throw new Error("Not authenticated with Google");
  }

  const clientId = process.env.GOOGLE_CLIENT_ID as string;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  const eventStart = new Date(event.date);
  const eventEnd = new Date(eventStart.getTime() + 60 * 60 * 1000);

  const googleEvent = {
    summary: event.title,
    description: event.description,
    status: "confirmed",
    source: {
      title: "EventHub",
      url: `https://eventhub-liard.vercel.app/events/${event_id}`,
    },
    start: {
      dateTime: eventStart.toISOString(),
      timeZone: "UTC",
    },
    end: {
      dateTime: eventEnd.toISOString(),
      timeZone: "UTC",
    },
  };

  const calendar = google.calendar({
    version: "v3",
    auth: oauth2Client,
  });

  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: googleEvent,
    });
    console.log("Event created:", response.data.htmlLink);
    return { success: true, link: response.data.htmlLink };
  } catch (err: any) {
    console.error("Error creating event:", err);
    return { success: false, error: err.message };
  }
}
