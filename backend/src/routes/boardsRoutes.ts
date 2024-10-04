import express, { Request, Response } from "express";
import { insertBoard, selectBoards } from "../db/queries";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const rows = await selectBoards();

    if (!rows) {
      res.status(400).json({ error: "Failed to fetch boards" });
      return;
    }

    res
      .status(200)
      .json({ data: rows, message: "Boards fetched successfully!" });
    return;
  } catch (error) {
    console.log("Failed to fetch boards:", error);
    res.status(500).json({ error });
    return;
  }
});

router.post("/", async (req: Request, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: "Failed to create board" });
  }

  try {
    await insertBoard(name);
    res.status(201).json({ message: `Board '${name}' created successfully!` });
    return;
  } catch (error) {
    console.log("Failed to create board:", error);
    res.status(500).json({ error: error });
    return;
  }
});

export default router;
