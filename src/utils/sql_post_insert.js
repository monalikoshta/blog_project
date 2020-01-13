const mysql = require('mysql')

const sql_post_insert = (user_id,title,postImage,descrip,callback)=>{
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
		//const sql = 'insert into post_table values(?,?,?)'
		const sql= "insert into post_table values(?,?,?,?,?,?,?)"
		con.query(sql,['',title,postImage,descrip,'','',user_id],(error,response)=>{
			// console.log("from sql file "+response)
			// console.log("from sql file "+error)

			if(error)
				return callback(error, undefined)

			
			callback(undefined, response)
		})
	})
}

module.exports = sql_post_insert