import pool from "./pool";

export const selectBoards = async () => {
  const { rows } = await pool.query("SELECT * FROM boards");
  return rows;
};

export const insertBoard = async (name: string) => {
  if (!name) {
    throw new Error("Board name is required");
  }

  await pool.query("INSERT INTO boards (name) VALUES($1)", [name]);
};
