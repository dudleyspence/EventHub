import { PrismaClient, Event } from "@prisma/client";

const db = new PrismaClient();

interface getEventsQuery {
  orderBy?: "date" | "maxCapacity";
  sort?: "asc" | "desc";
  category?: Event["category"];
  startDate?: Date;
  endDate?: Date;
  page?: number;
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

export async function getEvents({
  orderBy,
  sort,
  category,
  startDate,
  endDate,
}: getEventsQuery) {
  return db.event.findMany({});
}
