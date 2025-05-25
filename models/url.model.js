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

const findOne = async (shortURL) => {
  const query = {
    text: `
      SELECT FROM URLS
      WHERE shorturl = $3
      RETURNING SHORTURL
      `,
    values: [shortURL],
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

const updateOneById = async (uid, newUrl) => {
  const query = {
    text: `
      UPDATE URLS
      SET url = $2
      WHERE uid = $1
      RETURNING url
    `,
    values: [uid, newUrl],
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
  findOne,
  updateOneById,
  deleteById,
};
