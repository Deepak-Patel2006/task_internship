import dotenv from "dotenv";
dotenv.config();

import { connect } from "./Movies/config/db.js";
import app from "./Movies/app.js";

const port = process.env.PORT || 4050;

await connect();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
