const express = require("express");
const { initializeDb } = require("./parcel/parcelModel");
const parcelRoutes  = require("./parcel/parcelController")

const app = express();
app.use(express.json());

// Mount parcel routes under /

app.use("/", parcelRoutes);

initializeDb().then(() => {
  app.listen(80, () => {
    console.log("Server running on http://localhost:80");
  });
});
