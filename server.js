const express = require("express");
const app = express();
app.use(express.static("./public"));
app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
