const mysql = require('mysql')

const sql_fetch = (callback)=>{
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
		const sql = 'select * from post_table'
		// const sql= "insert into blog_user values(?,?,?,?,?,?,?)"
		con.query(sql,(error,response)=>{
			if(error)
				return callback(error, undefined,undefined)
			//console.log(response[0].user_id)
			//console.log(response[0].title)
			const quer = 'select * from blog_user where user_id=?'
			con.query(quer,[response[1].user_id],(error2,response2)=>{
				if(error)
					throw error
				callback(undefined,response,response2[0].full_name)
			})
			//callback(undefined,response)
		})
	})
}
module.exports = sql_fetch