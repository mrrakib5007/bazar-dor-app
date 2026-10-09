import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db("bazar_dor");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
    emailAndPassword: { 
    enabled: true, 
    autoSignIn: false
  }, 
  socialProviders: { 
    google: { 
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID, 
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET, 
    },
    github: { 
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID, 
      clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET, 
    },
  }, 
});