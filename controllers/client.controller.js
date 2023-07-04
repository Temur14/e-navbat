const pool = require("../config/db");

const addClient = async (req, res) => {
  try {
    const {
      client_last_name,
      client_first_name,
      client_number,
      client_info,
      client_photo,
    } = req.body;
    const newClient = await pool.query(
      `
        INSERT INTO client ( client_last_name,client_first_name,
         client_number, client_info, client_photo)
         VALUES ($1,$2,$3,$4,$5) RETURNING *
    `,
      [
        client_last_name,
        client_first_name,
        client_number,
        client_info,
        client_photo,
      ]
    );
    console.log(newClient);
    res.status(200).json(newClient.rows);
  } catch (error) {
    res.status(500).json(`Serverda xatolik JSON ${error}`);
    console.log(error);
  }
};

const getClients = async (req, res) => {
  try {
    let clients = await pool.query("SELECT * FROM client");
    return res.send({ clients: clients.rows });
  } catch (error) {
    console.log(error);
  }
};

const getClientByID = async (req, res) => {
  try {
    const clientId = req.params.id;
    const client = await pool.query("SELECT * from client WHERE id=$1", [
      clientId,
    ]);
    return res.send(client.rows);
  } catch (error) {
    console.log(error);
  }
};

const updateClientByID = async (req, res) => {
  try {
    const {
      client_last_name,
      client_first_name,
      client_number,
      client_info,
      client_photo,
    } = req.body;
    const updateClient = await pool.query(
      `
        UPDATE client SET client_last_name=$1,client_first_name=$2,
        client_number=$3, client_info=$4, client_photo=$5 WHERE id=$6
        RETURNING *
    `,
      [
        client_last_name,
        client_first_name,
        client_number,
        client_info,
        client_photo,
        req.params.id,
      ]
    );
    console.log(updateClient);
    res.status(200).json(updateClient.rows);
  } catch (error) {
    console.log(error);
  }
};

const deleteClient = async (req, res) => {
  try {
    let deletedClient = await pool.query(
      `DELETE FROM client where id=${req.params.id}`
    );
    return res.status(200).send({ message: "Successfully Deleted" });
  } catch (err) {
    console.log("Error", err);
    return res.status(500).send({ error: "something went wrong" });
  }
};

module.exports = {
  addClient,
  getClients,
  getClientByID,
  updateClientByID,
  deleteClient,
};
