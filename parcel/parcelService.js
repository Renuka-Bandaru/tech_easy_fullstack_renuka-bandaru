const {getDb} = require("./parcelModel");

// get all parcels query

const getAllParcels = async () => {
  
    const db = getDb();
    const parcels = await db.all(`
        SELECT * FROM parcels;`);
        return parcels;
}

// create a parcel query

const createParcel = async ({sender, receiver, trackingId, status}) => {
    const db = getDb();
    await db.run(`
        INSERT INTO parcels (sender, receiver, trackingId, status)
        VALUES (
        '${sender}','${receiver}','${trackingId}', '${status}'
        );`)
}

// update a parcel 

const updateParcel = async (id, updatedData) => {
  const db = getDb();
  const { sender, receiver, trackingId, status } = updatedData;
  console.log("id, updated data", id, updatedData);
  const numericId = parseInt(id)
  console.log(typeof(numericId))
  try{
    const result = await db.run(
    `UPDATE parcels
     SET sender = ?, receiver = ?, trackingId = ?, status = ?
     WHERE id = ?;`,
    [sender, receiver, trackingId, status, numericId]
  );
   console.log(result.changes, "rows effected");
  }catch (err) {
    console.error("Error in updateParcel:", err.message);
  }
  
 
};

// delete a parcel

const deleteParcel = async (id) => {

  const db = getDb();
  try{
    await db.run(`DELETE FROM parcels WHERE id = ${id};`, [id]);
  }catch(err){
    console.log("db Error", err.message)
  }
  
}; 

module.exports = {getAllParcels, createParcel, updateParcel, deleteParcel};