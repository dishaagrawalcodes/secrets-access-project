import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path"; // Import path module

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

var userIsAuthorised = false;
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for password check
function passwordCheck(req, res, next) {
  const password = req.body["password"];
  if (password === "ILoveProgramming") {
    userIsAuthorised = true;
  }
  next();
}
app.use(passwordCheck);

// Serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "\public", "index.html"));
});

// Handle password check and serve appropriate page
app.post("/check", (req, res) => {
  if (userIsAuthorised) {
    res.sendFile(path.join(__dirname, "\public", "secret.html"));
  } else {
    res.sendFile(path.join(__dirname, "\public", "index.html"));
    // Alternatively: res.redirect("/"); to redirect back to index
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
