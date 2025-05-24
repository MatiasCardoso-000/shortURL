import db from "../database/database.connection.js";

const find = async () => {
  const query = {
    text: `
    SELECT * FROM URLS
    `,
  };

  const { rows } = await db.query(query);
  return rows;
};

const create = async ({ origin, shortURL }) => {
  const query = {
    text: `
    INSERT INTO URLS(
    URL,
    SHORTURL
    )
    VALUES ($1,$2)
    RETURNING UID, URL, SHORTURL
    `,
    values: [origin, shortURL],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const findOneById = async (uid) => {
  const query = {
    text: `
    SELECT *  FROM URLS
    WHERE UID = $1
    `,
    values: [uid],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const updateOneById = async (origin) => {
  const query = {
    text: `
      UPDATE URLS
      SET url = url
      WHERE url = $2
      RETURNING url
    `,
    values: [origin],
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const deleteById = async (id) => {
  const query = {
    text: `
    DELETE FROM URLS
    WHERE UID = $1 
    `,
    values: [id],
  };

  const { rows } = db.query(query);
  return rows;
};

export const UrlModel = {
  find,
  create,
  findOneById,
  updateOneById,
  deleteById,
};
