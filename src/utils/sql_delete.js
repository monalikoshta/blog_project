const mysql = require('mysql')

const sql_delete = (user_id,callback)=>{
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
		//console.log('hello')
		const sql = 'delete from blog_user where user_id=?'
		// const sql= "insert into blog_user values(?,?,?,?,?,?,?)"
		con.query(sql,[user_id],(error,response)=>{
			console.log("response from sql"+response)
			console.log(error)
			if(error)
				return callback(error, undefined)
			console.log("response from sql"+response)
			callback(undefined, response)
		})
	})
}

module.exports = sql_delete