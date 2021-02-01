#!/usr/bin/env -S deno run --unstable -A
import { red } from "https://deno.land/std@0.83.0/fmt/colors.ts";

import { soxa } from 'https://deno.land/x/soxa@1.4/mod.ts'
import { Input, Secret } from "https://deno.land/x/cliffy/prompt/mod.ts";
import { Command } from "https://deno.land/x/cliffy/command/mod.ts";

// https://www.pika.dev/
const env = Deno.env.toObject();
const api:string = env.API_URI || "http://192.168.3.150:5000/api"
soxa.defaults.baseURL = api;

interface IAuth {
  status: number;
  token: string;
}

interface IAdmin {
  _id: string,
  name?: string,
  username: string,
  password: string,
  passwordreset?: boolean
}

const login = async (username: string, password: string):Promise<IAuth> => {
  try {
    const res = await soxa.post('/admin/login', {
      username,
      password
    });
    if(!res) {
      console.log('Authentication Failed');
      Deno.exit(0);
    };
    const { token } = res.data;
    const status = res.status;
    console.log({ status, token });
    return { status, token }
  } catch (err) {
    console.log('Exiting', err.response.data.message);
    Deno.exit(0);
  }
};

const authenticate = async ():Promise<boolean> => {
  const username: string = await Input.prompt("Enter username: ");
  const password: string = await Secret.prompt("Enter password: ");
  const auth = await login( username, password );
  return auth.status === 200;
} 

const listAdmins = async (): Promise<IAdmin[]> => {
  try {
    const admins = await soxa.get('/admin/admins');
    return admins.data;
  } catch (err) {
    console.log(err.message)
    return [];
  }
}

// import { Command } from "../../command/command.ts";

await new Command()
  .name("Test")
  .example(
    "Test Command",
    `Description ...\n\nCan have mutliple lines and ${red("colors")}.`,
  )
  .parse(Deno.args);
const admins = await listAdmins();
console.log(admins);

 

