const pool = require("../config/db");

const addService = async (req, res) => {
  try {
    const { service_name, service_price } = req.body;
    const newService = await pool.query(
      `
    INSERT INTO service (
        service_name,
        service_price
        )
    VALUES ($1,$2) RETURNING *`,
      [service_name, service_price]
    );
    console.log(newService);
    res.status(200).json(newService.rows[0]);
  } catch (error) {
    res.status(500).json(`Serverda xatolik ${error}`);
  }
};

const getService = async (req, res) => {
  try {
    let services = [];
    if (!req.params || !Object.keys(req.params)[0]) {
      services = await pool.query("SELECT * FROM service;");
    } else {
      services = await pool.query("SELECT * from service where id=$1", [
        req.params.id,
      ]);
    }
    return res.status(200).send({ data: services.rows });
  } catch (error) {
    res.status(500).json(`Serverda xatolik ${error}`);
  }
};

const updateService = async (req, res) => {
  try {
    const { service_name, service_price } = req.body;
    const updatedService = await pool.query(
      `UPDATE service SET 
        service_name=$1,
        service_price=$2
      WHERE id=$3 RETURNING * `,
      [service_name, service_price, req.params.id]
    );
    if (!updatedService || !updatedService.rowCount > 0)
      return res.status(400).json({ message: "No data found" });
    return res
      .status(200)
      .send({ message: "success", updated_data: updatedService.rows[0] });
  } catch (error) {
    res.status(500).json(`Serverda xatolik ${error}`);
  }
};

const deleteService = async (req, res) => {
  try {
    const deletedService = await pool.query(
      `DELETE FROM service where id=${req.params.id} returning*`
    );
    if (!deletedService || !deletedService.rowCount > 0)
      return res.status(400).json({ message: "No data found" });
    else {
      res
        .status(200)
        .send({ message: "Success", deleted_id: deletedService.rows[0].id });
    }
  } catch (error) {
    res.status(500).json(`Serverda xatolik ${error}`);
  }
};

module.exports = {
  addService,
  getService,
  updateService,
  deleteService,
};
