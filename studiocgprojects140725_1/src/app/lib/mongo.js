import { MongoClient } from 'mongodb';

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

export async function getDb() {
    if (!client.topology?.isConnected()) {
        await client.connect();
    }
    return client.db("slidecg");
}
