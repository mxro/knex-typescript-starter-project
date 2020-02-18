import Knex from "knex";
import uuidv5 from "uuid/v5";

/* eslint-disable @typescript-eslint/camelcase */

export async function loadIntoDb({ data, knex }: { data: any; knex: Knex }) {
  const IDEAS_DB_NAMESPACE = "33cdc8fd-255d-4083-a6bc-f93abb406b74";
  const USER_MAX = "b6b6a025-0ded-407a-a3ec-1b83906f01b4";
  const ops = data.map(({ author, book, quote, page, location, dateAdded }) => {
    return knex("quotes").insert({
      document_id: uuidv5("document_id", IDEAS_DB_NAMESPACE),
      user_id: USER_MAX,
      author,
      quote,
      book,
      location: page,
      raw_source: "Kindle Import",
      link: "",
      "date_collected": dateAdded
    });
  });

  await Promise.all(ops);

};