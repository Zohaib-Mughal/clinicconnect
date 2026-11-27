import dns from 'node:dns';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

// Use Google's DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is missing from environment variables');
}

const client = new MongoClient(MONGODB_URI);


let isConnected = false;

export async function connectToMongoDB() {
  try {
    if (!isConnected) {
      await client.connect();
      isConnected = true;
      console.log('Successfully connected to MongoDB!');
    }

    return client;
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw error;
  }
}

export async function disconnectFromMongoDB() {
  if (isConnected) {
    await client.close();
    isConnected = false;
    console.log('MongoDB disconnected.');
  }
}
