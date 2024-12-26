import { Client, Databases } from "appwrite";

// Konfigurasi dari .env
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const databaseID = import.meta.env.VITE_APPWRITE_DATABASE_ID; // ID Database
const collectionID = import.meta.env.VITE_APPWRITE_COLLECTION_ID; // ID Collection

const client = new Client();

client.setEndpoint(endpoint).setProject(projectID);

export const databases = new Databases(client);
export const config = { databaseID, collectionID };
