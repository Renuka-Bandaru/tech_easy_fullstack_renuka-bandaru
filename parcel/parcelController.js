const express = require("express");
const router = express.Router();
const parcelService = require("./parcelService");
const {createParcel, updateParcel, deleteParcel} = require('./parcelService');

//get api

router.get("/parcels/", async (request, response) => {
  
    try{
        const parcels = await parcelService.getAllParcels()
        response.status(200);
        response.send(parcels);
    }catch(e){
        response.send(400, "bad request");
    }
});

//Post api

router.post("/parcels", async (req, res) => {
  try {
    const { sender, receiver, trackingId, status } = req.body;

    if (!sender || !receiver || !trackingId || !status) {
      return res.status(400).send({ error: "All fields are required" });
    }

    await createParcel({ sender, receiver, trackingId, status });
    res.status(200).send({ message: "Parcel created successfully" });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

// Put api

router.put("/parcels/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { sender, receiver, trackingId, status } = req.body;
    console.log(typeof(id))
    await updateParcel(id, { sender, receiver, trackingId, status });
     return res.status(200).send({ message: "Parcel updated successfully" });
  } catch (error) {
     return res.status(400).send({ error: "Failed to update parcel" });
  }
});

// delete api

router.delete("/parcels/:id", async (req, res) => {
    try {
    const { id } = req.params;
    await deleteParcel(id);
    res.status(200).send({ message: "Parcel deleted successfully" });
  } catch (error) {
    res.status(400).send({ error: "Failed to delete parcel" });
  }
})

module.exports = router;