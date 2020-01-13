const mysql = require('mysql')

const sql_verify=(email,pswd,callback)=>{
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
		const sql = 'select * from blog_user where email=? and pswd=?'
		// const sql= "insert into blog_user values(?,?,?,?,?,?,?)"
		con.query(sql,[email,pswd],(error,response)=>{
			if(error)
				return callback(error, undefined)
			//console.log(response[0].user_id)
			//console.log(response)
			callback(undefined,response)
		})
	})
}

module.exports = sql_verify