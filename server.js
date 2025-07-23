const express = require("express");
const { initializeDb } = require("./parcel/parcelModel");

const app = express();
app.use(express.json());

initializeDb().then(() => {
  app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:80");
  });
});
