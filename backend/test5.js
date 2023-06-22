const pool = require('./db')

async function getUsers() {

  const sql = `SELECT likes FROM post WHERE post_id = ?;SELECT * FROM like_post WHERE post_id = ?, user_id = ?`
  const values = [id]
  const [rows, fields] = await pool.execute(sql, values)
  //console.log(rows[0])
  return rows
}
getUsers()