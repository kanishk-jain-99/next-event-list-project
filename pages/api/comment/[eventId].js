import {
  connectDb,
  getAllDocs,
  insertDocument,
} from "../../../helpers/db-utils";

export default async function Handler(req, res) {
  let client;

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    const eventId = req.query.eventId;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      !name.trim() === "" ||
      !text ||
      !text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input" });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      client = await connectDb();
    } catch (error) {
      res.status(500).json({ message: "Connecting to DB failed" });
      return;
    }

    let result;

    try {
      result = await insertDocument(client, "comments", {
        comment: newComment,
      });
      newComment._id = result.insertedId;

      res.status(201).json({ message: "Added Comment!", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment to DB failed" });
    }
  }

  if (req.method === "GET") {
    try {
      client = await connectDb();

      const documents = await getAllDocs(client, "comments", { _id: -1 });
      res
        .status(200)
        .json({ message: "Get All Comment!", comments: documents });
    } catch {
      res.status(500).json({ message: "Get all from DB failed" });
    }
  }
}
