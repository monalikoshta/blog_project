const mysql = require('mysql')

const sql_fetch_by_user_id = (user_id,callback)=>{
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
		//console.log(user_id)
		const sql = 'select * from blog_user where user_id=?'
		// const sql= "insert into blog_user values(?,?,?,?,?,?,?)"
		con.query(sql,[user_id],(error,response)=>{
			//console.log("response from sql"+response)//full_name
			//console.log(error)
			if(error)
				return callback(error, undefined)
			//console.log("response from sql"+response[0].profile_pic)
			callback(undefined, response)
		})
	})
}

module.exports = sql_fetch_by_user_id
