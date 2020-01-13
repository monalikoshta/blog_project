const mysql = require('mysql')

const sql_post_count = (user_id,callback)=>{
	const con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "practice"
	})
	con.connect((error)=>{
		if(error)
			throw error
		console.log("connected!")
		const sql= "select * from post_table where user_id=?"
		con.query(sql,[user_id],(error,response)=>{
			if(error)
				return callback(error,undefined)
			callback(undefined, response.length)
		})
	})
}
module.exports = sql_post_count