import dotenv from "dotenv";
import app from "./src/app";

dotenv.config({
  path: ".env.development",
});

function normalizePort(val: string | number): number {
  let port = parseInt(typeof val === "string" ? val : val.toString(), 10);
  if (isNaN(port)) {
    return 3001;
  } else {
    return port;
  }
}

const port: number = normalizePort(process.env.PORT || 3001);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
