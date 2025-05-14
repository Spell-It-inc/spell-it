import app from "./app";

import dotenv from 'dotenv';
dotenv.config({ path: 'local.env' });

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}).on('error', err => {
  console.error(err)
}).on('close', (msg: any) => {
  console.log('The server has closed ' + msg.toString())
});