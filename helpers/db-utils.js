import { MongoClient } from "mongodb";

export async function connectDb() {
  const client = await MongoClient.connect(
    "mongodb+srv://kj:PapumPare1234@nest-cluster.ggnsycf.mongodb.net/events?retryWrites=true&w=majority"
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocs(client, collection, sort) {
  const db = client.db();

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}
