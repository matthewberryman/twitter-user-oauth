import * as dotenv from 'dotenv';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { TwitterApi } from 'twitter-api-v2';

dotenv.config();

let client = new TwitterApi({ appKey: process.env.CONSUMER_KEY || "", appSecret: process.env.CONSUMER_SECRET || "" });
const authLink = await client.generateAuthLink('oob'); // out of bounds => PIN
// Use URL generated
console.log(authLink.url);



const rl = readline.createInterface({ input, output });

const GIVEN_USER_PIN = await rl.question('please enter the PIN: ');

client = new TwitterApi({
    appKey: process.env.CONSUMER_KEY || "",
    appSecret: process.env.CONSUMER_SECRET || "",
    accessToken: authLink.oauth_token, // oauth token from previous step (link generation)
    accessSecret: authLink.oauth_token_secret, // oauth token secret from previous step (link generation)
  });

const { client: loggedClient, accessToken, accessSecret } = await client.login(GIVEN_USER_PIN);

rl.close();
console.log(accessToken, accessSecret);
