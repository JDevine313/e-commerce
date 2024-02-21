import express from "express";
import { getClient } from "../db";
import { ObjectId } from "mongodb";
import Account from "../models/Account";

const AccountRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};
AccountRouter.get("/account", async (req, res) => {
  try {
    const client = await getClient();
    const cursor = client.db().collection<Account[]>("accounts").find();
    const results = await cursor.toArray();
    results
      ? res.status(200).json(results)
      : res.status(404).json({ message: "Not found" });
  } catch (err) {
    errorResponse(err, res);
  }
});

AccountRouter.get("/account/:id", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const client = await getClient();
    const results = await client
      .db()
      .collection<Account>("accounts")
      .findOne({ uid: id });
    if (results) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "New Account" });
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

AccountRouter.post("/account", async (req, res) => {
  try {
    const client = await getClient();
    const newItem = req.body;
    await client.db().collection<Account>("accounts").insertOne(newItem);
    res.status(200);
    res.json(newItem);
  } catch (error) {
    errorResponse(error, res);
  }
});

AccountRouter.put("/account/:id", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const replacement = req.body;
    replacement._id = new ObjectId(id);
    const client = await getClient();
    const result = await client
      .db()
      .collection<Account>("accounts")
      .replaceOne({ _id: new ObjectId(id) }, replacement);
    if (result.modifiedCount) {
      res.status(200);
      res.json(replacement);
    } else {
      res.status(404);
      res.send("ID not found");
    }
  } catch (error) {
    errorResponse(error, res);
  }
});

AccountRouter.patch("/account/:id", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const update = req.body;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Account>("accounts")
      .updateOne({ _id: new ObjectId(id) }, { $set: update });
    if (result.modifiedCount) {
      res.status(200);
      res.json(update);
    } else {
      res.status(404);
      res.send("ID not found");
    }
  } catch (error) {
    errorResponse(error, res);
  }
});

AccountRouter.delete("/account/:id", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Account>("accounts")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.status(404);
      res.send("No ID found");
    }
  } catch (error) {
    errorResponse(error, res);
  }
});

export default AccountRouter;
