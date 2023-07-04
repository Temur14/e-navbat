const pool = require("../config/db");

const addAdmin = async (req, res) => {
  try {
    const { admin_name, admin_phone_number, admin_hashed_password } = req.body;
    const newAdmin = await pool.query(
      `
    INSERT INTO admin (
        admin_name,
        admin_phone_number,
        admin_hashed_password)
    VALUES ($1,$2,$3) RETURNING *`,
      [admin_name, admin_phone_number, admin_hashed_password]
    );
    console.log(newAdmin);
    res.status(200).json(newAdmin.rows[0]);
  } catch (error) {
    res.status(500).json(`Serverda xatolik ${error}`);
  }
};

const getAdmin = async (req, res) => {
  try {
    let admins = [];
    if (!req.params || !Object.keys(req.params)[0]) {
      admins = await pool.query("SELECT * FROM admin;");
    } else {
      admins = await pool.query("SELECT * from admin where id=$1", [
        req.params.id,
      ]);
    }
    return res.status(200).send({ data: admins.rows });
  } catch (error) {
    res.status(500).json(`Serverda xatolik ${error}`);
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { admin_name, admin_phone_number, admin_hashed_password } = req.body;
    const updatedAdmin = await pool.query(
      `UPDATE admin SET 
        admin_name=$1,
        admin_phone_number=$2,
        admin_hashed_password=$3
      WHERE id=$4 RETURNING * `,
      [admin_name, admin_phone_number, admin_hashed_password, req.params.id]
    );
    if (!updatedAdmin || !updatedAdmin.rowCount > 0)
      return res.status(400).json({ message: "No data found" });
    return res
      .status(200)
      .send({ message: "success", updated_data: updatedAdmin.rows[0] });
  } catch (error) {
    res.status(500).json(`Serverda xatolik ${error}`);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const deletedAdmin = await pool.query(
      `DELETE FROM admin where id=${req.params.id} returning*`
    );
    if (!deletedAdmin || !deletedAdmin.rowCount > 0)
      return res.status(400).json({ message: "No data found" });
    else {
      res
        .status(200)
        .send({ message: "Success", deleted_id: deletedAdmin.rows[0].id });
    }
  } catch (error) {
    res.status(500).json(`Serverda xatolik ${error}`);
  }
};

module.exports = {
  addAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
};
