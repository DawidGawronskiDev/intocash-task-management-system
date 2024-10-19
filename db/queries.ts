import { License } from "@/types";
import pool from "./pool";

export const insertLicenses = async (licenses: License[]) => {
  if (!licenses.length) {
    return;
  }

  await pool.query(
    `INSERT INTO licenses(key, type) VALUES ${licenses.map(
      (license) => `(${license.key}, ${license.type})`
    )}`
  );
};
