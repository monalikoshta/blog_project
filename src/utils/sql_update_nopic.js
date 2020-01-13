const mysql = require('mysql')

const sql_update_nopic = (name,pswd,gender,dob,user_id,callback)=>{
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
		console.log("name "+ name)
		const sql = 'update blog_user set full_name=?, pswd=?, gender=?, dob=? where user_id=?'
		// const sql= "insert into blog_user values(?,?,?,?,?,?,?)"
		con.query(sql,[name,pswd,gender,dob,user_id],(error,response)=>{
			console.log("response from sql nopic"+response)
			//console.log(error)
			if(error)
				return callback(error, undefined)
			console.log("response from sql"+response)
			callback(undefined, response)
		})
	})
}

module.exports = sql_update_nopic