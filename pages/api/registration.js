import { connectDb, insertDocument } from "../../helpers/db-utils";

export default async function Handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid Input" });
      return;
    }

    let client;
    try {
      client = await connectDb();
    } catch (error) {
      res.status(500).json({ message: "Connecting to DB failed" });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email: userEmail });
    } catch (error) {
      res.status(500).json({ message: "Inserting to DB failed" });
      return;
    }

    res.status(201).json({ message: "Signed Up!" });
  }
}
