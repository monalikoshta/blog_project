const mysql = require('mysql')

const sql_get_dashboard_posts = (user_id,callback)=>{
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
		const sql = "select * from post_table where user_id=?"
		//const sql= "select title , img , description from post_table where user_id=?"
		con.query(sql,[user_id],(error,response)=>{
			if(error)
				return callback(error,undefined)
			callback(undefined, response)
		})
	})
}
module.exports = sql_get_dashboard_posts