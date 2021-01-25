import app from 'https://cdn.skypack.dev/commander';
import co from 'https://cdn.skypack.dev/co';
import prompt from 'https://cdn.skypack.dev/co-prompt';
import { Env } from "https://cdn.skypack.dev/@humanwhocodes/env?dts";

// https://www.pika.dev/

const env = new Env();
const api = env.get("API_URI");

console.log({api});


// const { USERNAME, PASSWORD } = process.env;
if (api) {
  const res = await fetch(api);
  console.log(res.statusText);
}
// const res = await API.get('/')
// const status = async () => {
//   try {
//     const res = await axios.get('/');
//     return res.status === 200 && res.message === 'ok';
//   } catch (err) {
//     console.log(err.message);
//     return false;
//   }
// };

// status();

