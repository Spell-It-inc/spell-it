import app from "./app";

import dotenv from 'dotenv';
dotenv.config({ path: 'local.env' });

const port = process.env.PORT || 8080;
try {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (err) {
  console.log(err)
}
