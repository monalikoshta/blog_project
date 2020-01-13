const mysql = require('mysql')

const sql_insert=(name,email,pswd,gender,dob,profileImage,callback)=>{
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
		const sql = "select * from blog_user where email=?"
		con.query(sql,[email],(error,response)=>{
			if(error)
				return callback(error,undefined)
			if(response.length>0)
				return callback(undefined,response.length)
			if(response.length==0){
				const quer= "insert into blog_user values(?,?,?,?,?,?,?)"
				con.query(quer,['',name,email,pswd,gender,dob,profileImage],(error2)=>{
					if(error2)
						return callback(error2, undefined)
					//console.log("response"+response.length)
				})
				callback(undefined,response.length)
			}
		})
	})
}

module.exports = sql_insert