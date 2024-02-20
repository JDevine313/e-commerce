import { getClient } from "../db";
import { ObjectId } from "mongodb";
import Product from "../models/Product";
import express from "express";

const ProductRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};
ProductRouter.get("/product", async (req, res) => {
  const searchTerm = req.query.search as string;
  let query = {
    ...(searchTerm ? { name: new RegExp(searchTerm, "i") } : {}),
  };
  try {
    const client = await getClient();
    const cursor = client.db().collection<Product[]>("product").find(query);
    const results = await cursor.toArray();
    results
      ? res.status(200).json(results)
      : res.status(404).json({ message: "Not found" });
  } catch (err) {
    errorResponse(err, res);
  }
});

ProductRouter.get("/product/:id", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const client = await getClient();
    const results = await client
      .db()
      .collection<Product>("product")
      .findOne({ _id: new ObjectId(id) });
    if (results) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "ID not Found" });
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

ProductRouter.post("/product", async (req, res) => {
  try {
    const client = await getClient();
    const newItem = req.body;
    await client.db().collection<Product>("product").insertOne(newItem);
    res.status(200);
    res.json(newItem);
  } catch (error) {
    errorResponse(error, res);
  }
});

ProductRouter.put("/product/:id", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const replacement = req.body;
    replacement._id = new ObjectId(id);
    const client = await getClient();
    const result = await client
      .db()
      .collection<Product>("product")
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

ProductRouter.patch("/product/:id", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const update = req.body;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Product>("product")
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

ProductRouter.delete("/product/:id", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Product>("product")
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

export default ProductRouter;
