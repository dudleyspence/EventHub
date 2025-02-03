import { FetchEventsSchema } from "@/schemas/events";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const db = new PrismaClient();

export async function getEvents({
  orderBy,
  sort,
  category,
  startDate,
  endDate,
  page,
  limit,
}: z.infer<typeof FetchEventsSchema>) {
  const whereFilter: any = {};

  if (category) {
    whereFilter.category = category;
  }

  // start date given means find only that day

  if (startDate && !endDate) {
    whereFilter.date = {
      gte: startDate,
    };
  } else if (startDate && endDate) {
    // both dates given means find events between them
    // when someone chooses a single day this will be the start and end of the same day
    const endDateEnding = new Date(endDate);
    endDateEnding.setHours(23, 59, 59, 999);

    whereFilter.date = {
      gte: startDate,
      lte: endDateEnding,
    };
  }

  const orderByClause = { [orderBy]: sort };

  const skip = (page - 1) * limit;

  const events = await db.event.findMany({
    where: whereFilter,
    orderBy: orderByClause,
    take: limit,
    skip,
  });

  // need this for pagination
  const totalEvents = await db.event.count({
    where: whereFilter,
  });

  return {
    events,
    total: totalEvents,
    totalPages: Math.ceil(totalEvents / limit),
  };
}

export function getUserEvents(user_id: string, history: boolean) {
  const today = new Date();

  const dateConstraint = history ? { lt: today } : { gte: today };

  return db.event.findMany({
    where: {
      date: dateConstraint,
      attendees: { some: { userId: user_id } },
    },
    orderBy: { date: "asc" },
  });
}

// desired behaviour:

// gets all events
// filtered by category
// ordered by date or maxCapacity
// sorted asc or desc
// results per page (default 10)
// defaults to page 1
// if start date and end date are not specified - default all days after today
// if start date and no end date then filter to that signle day
// if start and end date are specified (user selects "this week" or "this month") then filter

// later will include a search term
// PostgreSQL/Prisma provides _relevance field for seach
// https://www.prisma.io/docs/orm/prisma-client/queries/filtering-and-sorting#sorting
