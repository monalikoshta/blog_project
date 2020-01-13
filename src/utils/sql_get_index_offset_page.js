const mysql = require('mysql')

const sql_get_index_offset_page = (offset,callback)=>{
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
		const sql= "select title , img , description,user_id,post_id from post_table order by post_id desc limit 10 offset ?"
		con.query(sql,[offset],(error,response)=>{
			if(error)
				return callback(error,undefined)
			callback(undefined, response)
		})
	})
}
module.exports = sql_get_index_offset_page