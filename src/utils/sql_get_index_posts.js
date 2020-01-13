const mysql = require('mysql')

const sql_get_index_posts = (callback)=>{
	const con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "practice"
	})
	con.connect((error)=>{
		if(error)
			throw error
		console.log("connected!")
		//const sql="SELECT column_list FROM    table1ORDER BY column_listLIMIT row_count OFFSET offset;"
		//const sql= "select title , img , description,user_id from post_table"// order by post_id desc limit 10 offset 0"
		const sql = "select * from post_table"
		con.query(sql,(error,response)=>{
			if(error)
				return callback(error,undefined)
			console.log(response.length)
			callback(undefined, response.length)
		})
	})
}
module.exports = sql_get_index_posts