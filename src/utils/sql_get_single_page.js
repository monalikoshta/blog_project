const mysql = require('mysql')

const sql_get_single_page = (post_id,callback)=>{
	const con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "practice"
	})
	con.connect((error)=>{
		if(error){
			throw error
		}
		console.log("connected!")
		//const sql="SELECT column_list FROM    table1ORDER BY column_listLIMIT row_count OFFSET offset;"
		const sql= "select title , img , description , user_id from post_table where post_id=?"
		con.query(sql,[post_id],(error,response)=>{
			if(error)
				return callback(error,undefined)
			callback(undefined, response)
		})
	})
}
module.exports = sql_get_single_page