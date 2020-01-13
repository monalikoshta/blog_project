const mysql = require('mysql')

const sql_update_post_nopic = (title,descrip,post_id,callback)=>{
	const con = mysql.createConnection({
		host:"localhost",
		user: "root",
		password: "",
		database: "practice"
	})
	con.connect((error)=>{
		if(error){
			throw error
		}
		console.log("connected!")
		//console.log("name "+ name)
		const sql = 'update post_table set title=?, description=? where post_id=?'
		// const sql= "insert into blog_user values(?,?,?,?,?,?,?)"
		con.query(sql,[title,descrip,post_id],(error,response)=>{
			//console.log("response from sql"+response)
			console.log(error)
			if(error)
				return callback(error, undefined)
			//console.log("response from sql"+response)
			callback(undefined, response)
		})
	})
}

module.exports = sql_update_post_nopic