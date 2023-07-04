const pool = require("../config/db");

const addSocial = async (req, res) => {
  try {
    const { social_name, social_icon_file } = req.body;
    const newSocial = await pool.query(
      `
    INSERT INTO social (
        social_name,
        social_icon_file
        )
    VALUES ($1,$2) RETURNING *`,
      [social_name, social_icon_file]
    );
    console.log(newSocial);
    res.status(200).json(newSocial.rows[0]);
  } catch (error) {
    res.status(500).json(`Serverda xatolik ${error}`);
  }
};
8;
const getSocial = async (req, res) => {
  try {
    let socials = [];
    if (!req.params || !Object.keys(req.params)[0]) {
      socials = await pool.query("SELECT * FROM social;");
    } else {
      socials = await pool.query("SELECT * from social where id=$1", [
        req.params.id,
      ]);
    }
    return res.status(200).send({ data: socials.rows });
  } catch (error) {
    res.status(500).json(`Serverda xatolik ${error}`);
  }
};

const updateSocial = async (req, res) => {
  try {
    const { social_name, social_icon_file } = req.body;
    const updatedSocial = await pool.query(
      `UPDATE social SET 
        social_name=$1,
        social_icon_file=$2
      WHERE id=$3 RETURNING * `,
      [social_name, social_icon_file, req.params.id]
    );
    if (!updatedSocial || !updatedSocial.rowCount > 0)
      return res.status(400).json({ message: "No data found" });
    return res
      .status(200)
      .send({ message: "success", updated_data: updatedSocial.rows[0] });
  } catch (error) {
    res.status(500).json(`Serverda xatolik ${error}`);
  }
};

const deleteSocial = async (req, res) => {
  try {
    const deletedSocial = await pool.query(
      `DELETE FROM social where id=${req.params.id} returning*`
    );
    if (!deletedSocial || !deletedSocial.rowCount > 0)
      return res.status(400).json({ message: "No data found" });
    else {
      res
        .status(200)
        .send({ message: "Success", deleted_id: deletedSocial.rows[0].id });
    }
  } catch (error) {
    res.status(500).json(`Serverda xatolik ${error}`);
  }
};

module.exports = {
  addSocial,
  getSocial,
  updateSocial,
  deleteSocial,
};
