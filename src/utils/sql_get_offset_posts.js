const mysql = require('mysql')

const sql_get_offset_posts = (user_id,offset,callback)=>{
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
		const sql= "select title , img , description,post_id from post_table  where user_id=? order by post_id desc limit 10 offset ?"
		console.log(sql)
		con.query(sql,[user_id,offset],(error,response)=>{
			console.log("from sql offset "+error)
			if(error)
				return callback(error,undefined)
			callback(undefined, response)
		})
	})
}
module.exports = sql_get_offset_posts