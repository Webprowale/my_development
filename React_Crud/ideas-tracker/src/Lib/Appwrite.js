import { Client, Databases, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65a36d1f4d5ce8909472");

export const account = new Account(client);
export const databases = new Databases(client);
