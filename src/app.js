const express = require('express')
const path = require('path')
const hbs = require('hbs')
const sql_insert = require('./utils/sql_insert.js')
const sql_verify = require('./utils/sql_verify.js')
const sql_fetch = require('./utils/sql_fetch.js')
const sql_fetch_by_user_id = require('./utils/sql_fetch_by_user_id.js')
const sql_update = require('./utils/sql_update.js')
const sql_update_nopic = require('./utils/sql_update_nopic.js')
const sql_delete = require('./utils/sql_delete.js')
const sql_post_insert = require('./utils/sql_post_insert.js')
const sql_post_count = require('./utils/sql_post_count.js')
const sql_get_posts = require('./utils/sql_get_posts.js')
const sql_get_dashboard_posts = require('./utils/sql_get_dashboard_posts.js')
const sql_get_index_posts = require('./utils/sql_get_index_posts.js')
const sql_get_index_offset_page = require('./utils/sql_get_index_offset_page.js')
const sql_get_offset_posts = require('./utils/sql_get_offset_posts.js')
const sql_get_single_page = require('./utils/sql_get_single_page.js')
const sql_update_post = require('./utils/sql_update_post.js')
const sql_update_post_nopic = require('./utils/sql_update_post_nopic.js')


const bodyParser = require('body-parser')
const fs = require("fs")
var randomstring = require('randomstring')

const app = express()
app.use(bodyParser.json({limit: '50MB'}));
app.use(bodyParser.urlencoded({extended: true, limit: '50MB'}));

const dirpath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')
const imagepath = path.join(__dirname,)
app.set('view engine','hbs')
app.set('views', viewspath)
hbs.registerPartials(partialpath)
app.use(express.static(dirpath))

app.get('',(req,res)=>{
	res.render('index',{
		heading: '#MY BLOG'
	})
})

app.post('/index-post-page',(req,res)=>{
	sql_get_index_posts((error,response)=>{
		if(error)
			return res.send({error})
		//console.log("from app.js "+response)
		res.send({response})
	})
})

app.post('/index-offset-page',(req,res)=>{
	sql_get_index_offset_page(req.body.offset,(error,response)=>{
		if(error)
			return res.send({error})
	//console.log("from app.js "+response)
		res.send({response})
	})
})

app.get('/single-post',(req,res)=>{
	res.render('single-post')
})

app.post('/single-post-page',(req,res)=>{
	sql_get_single_page(req.body.post_id,(error,response)=>{
		if(error)
			return res.send({error})
		//console.log("user_id"+response[0].user_id)
		sql_fetch_by_user_id(response[0].user_id,(error,response2)=>{
			if(error)
				return res.send({error})
			res.send({
				title: response[0].title,
				img: response[0].img ,
				description: response[0].description,
				name: response2[0].full_name
			})
		})
	//console.log("from app.js "+response)
		//res.send({response})
	})
})

app.post('/single-post-page-after-login',(req,res)=>{
	if(!req.body.user_id)
		return res.render('login')
	sql_get_single_page(req.body.post_id,(error,response)=>{
		if(error)
			return res.send({error})
		//console.log("user_id"+response[0].user_id)
		sql_fetch_by_user_id(req.body.user_id,(error,response2)=>{
			if(error)
				return res.send({error})
			res.send({
				title: response[0].title,
				img: response[0].img ,
				description: response[0].description,
				name: response2[0].full_name
			})
		})
	//console.log("from app.js "+response)
		//res.send({response})
	})
})


// app.get('/index',(req,res)=>{
// 	sql_fetch((error,response,response2)=>{
// 		if(error)
// 			return res.send({error})
// 		res.send({
// 			response,
// 			name: response2
// 		})
// 	})
// })
app.get('/signup',(req,res)=>{
	res.render('signup',{
		heading: 'SIGN UP'
	})
})

app.post('/signup-page',(req,res)=>{
	//var response={}
	if(!req.body.name || !req.body.email || !req.body.pswd || !req.body.gender || !req.body.dob)
		return res.send({
			error: "Incomplete details!"
		})
	//console.log(req.body.profileImage)
	var decsignup = decodeURIComponent(req.body.profileImage);
	//console.log("decsignup "+decsignup)
	var base64Data = decsignup.split(",");
	//console.log("base64Data[1] "+base64Data[1])
	
	var filename = randomstring.generate(10)+".png"
	//console.log(filename)
	fs.writeFile( "public/uploads/users/"+filename , base64Data[1], 'base64', function(err) {
	  	if(err)
	  		return console.log(err);
		sql_insert(req.body.name,req.body.email,req.body.pswd,req.body.gender,req.body.dob,filename,(error,response)=>{
			if(error)
				return res.send({error})
			//console.log("response from app.js "+response)
			res.send({response})
		})
	});
})

app.get('/login',(req,res)=>{
	res.render('login',{
		heading: 'LOGIN'
	})
})

app.get('/login-page',(req,res)=>{
	if(!req.query.email || !req.query.pswd)
		return res.send({
			error: "Incomplete details!"
		})
	sql_verify(req.query.email,req.query.pswd,(error,response)=>{
		if(error)
			return res.send({
				error: 'error problem'
			})
		res.send({response})
	})
})

app.get('/dashboard',(req,res)=>{
	res.render('dashboard',{
		heading: 'DASHBOARD'
	})
})

app.post('/dashboard-page',(req,res)=>{
	if(!req.body.user_id)
		return res.render('login')
	sql_fetch_by_user_id(req.body.user_id,(error,response)=>{
		if(error)
			return res.send({error})
		//console.log("from app.js"+response)
		if(!response[0].full_name)
			return res.render('/login')
		sql_post_count(req.body.user_id,(error,response2)=>{
			if(error)
				return res.send({error})
			res.send({
				name: response[0].full_name,
				email: response[0].email,
				pswd: response[0].pswd,
				gender: response[0].gender,
				dob: response[0].dob,
				profileImage: response[0].profile_pic,
				postcount :response2
			})
		})
	})
})

app.get('/read-post',(req,res)=>{
	res.render('read-post')
})

app.post('/read-post-page',(req,res)=>{
	sql_get_single_page(req.body.post_id,(error,response)=>{
		if(error)
			return res.send({error})
		sql_fetch_by_user_id(response[0].user_id,(error,response2)=>{
			if(error)
				return res.send({error})
			res.send({
				title: response[0].title,
				img: response[0].img ,
				description: response[0].description,
				name: response2[0].full_name
			})
		})
	//console.log("from app.js "+response)
		//res.send({response})
	})
})

app.get('/edit-post',(req,res)=>{
	res.render('edit-post',{
		heading: 'EDIT POST'
	})
})

app.post('/edit-post-page',(req,res)=>{
	if(!req.body.user_id)
		return res.render('login')
	if(!req.body.title || !req.body.descrip)
		return res.send({
			error: "Incomplete details!"
		})
	//console.log(req.body.profileImage)
	if(!req.body.postImage){
		sql_update_post_nopic(req.body.title,req.body.descrip,req.body.post_id,(error,response)=>{
			//console.log("response from app.js "+response)
			if(error)
				return res.send({error})
			//console.log("from nopic"+response)
			res.send({response})
		})
	}
	else{
		var deceditpost = decodeURIComponent(req.body.postImage);
		console.log("decsignup "+deceditpost)
		var base64Data = deceditpost.split(",");
		console.log("base64Data[1] "+base64Data[1])
		var filename = randomstring.generate(10)+".png"
		fs.writeFile( "public/uploads/posts/"+filename , base64Data[1], 'base64', function(err) {
		  	if(err)
		  		return console.log(err);
			sql_update_post(req.body.title,req.body.descrip,filename,req.body.post_id,(error,response)=>{
				//console.log("response from app.js "+response)
				if(error)
					return res.send({error})
				//console.log("from pic"+response)
				res.send({response})
			})
		});
	}
})

app.post('/display-data-page',(req,res)=>{
	if(!req.body.user_id)
		return res.render('login')
	sql_get_single_page(req.body.post_id,(error,response)=>{
		if(error)
			return res.send({error})
		res.send({response})
	})
})

app.post('/dashboard-post-page',(req,res)=>{
	if(!req.body.user_id)
		return res.render('login')
	sql_get_dashboard_posts(req.body.user_id,(error,response)=>{
		if(error)
			return res.send({error})
		console.log("from app.js "+response)
		res.send({response})
	})
})

app.post('/post-page',(req,res)=>{
	if(!req.body.user_id)
		return res.render('login')
	sql_get_posts(req.body.user_id,(error,response)=>{
		if(error)
			return res.send({error})
		console.log("from app.js "+response)
		res.send({response})
	})
})

app.post('/all-post-offset-page',(req,res)=>{
	if(!req.body.user_id)
		return res.render('login')
	sql_get_offset_posts(req.body.user_id,req.body.offset,(error,response)=>{
		if(error)
			return res.send({error})
		//console.log("from offset app.js "+response)
		res.send({response})
	})
})


app.get('/view-profile',(req,res)=>{
	res.render('view-profile',{
		heading: 'VIEW PROFILE'
	})
})

app.get('/edit-profile',(req,res)=>{
	res.render('edit-profile',{
		heading: 'EDIT PROFILE'
	})
})

app.post('/edit-page',(req,res)=>{
	if(!req.body.user_id)
		return res.render('login')
	if(!req.body.name || !req.body.pswd || !req.body.gender || !req.body.dob || !req.body.user_id)
		return res.send({
			error: "Incomplete details!"
		})
	//console.log(req.body.profileImage)
	if(!req.body.profileImage){
		sql_update_nopic(req.body.name,req.body.pswd,req.body.gender,req.body.dob,req.body.user_id,(error,response)=>{
			//console.log("response from app.js "+response)
			if(error)
				return res.send({error})
			
			res.send({response})
		})
	}
	else{
		var decedit = decodeURIComponent(req.body.profileImage);
		//console.log("decsignup "+decsignup)
		var base64Data = decedit.split(",");
		//console.log("base64Data[1] "+base64Data[1])
		var filename = randomstring.generate(10)+".png"
		fs.writeFile( "public/uploads/users/"+filename , base64Data[1], 'base64', function(err) {
		  	if(err)
		  		return console.log(err);
			sql_update(req.body.name,req.body.pswd,req.body.gender,req.body.dob,filename,req.body.user_id,(error,response)=>{
				//console.log("response from app.js "+response)
				if(error)
					return res.send({error})
				
				res.send({response})
			})
		});
	}
})

app.get('/delete',(req,res)=>{
	res.render('delete',{
		heading: 'Delete Account'
	})
})

app.get('/all-post',(req,res)=>{
	res.render('all-post',{
		heading: 'ALL POSTS'
	})
})

app.get('/delete-page',(req,res)=>{
	//console.log(req.query.user_id)
	if(!req.body.user_id)
		return res.render('login')
	var decdel = decodeURIComponent(req.body.profileImage);
	//console.log("decsignup "+decsignup)
	var base64Data = decdel.split(",");
	//console.log("base64Data[1] "+base64Data[1])
	var filename = randomstring.generate(10)+".png"
	fs.writeFile( "public/uploads/users/"+filename , base64Data[1], 'base64', function(err) {
	  	if(err)
	  		return console.log(err);
		sql_delete(req.query.user_id,(error,response)=>{
			//console.log('response fron app.js delete'+response)
			if(error)
				return res.send({error})
			res.send({response})
		})
	});
})

app.get('/add-post',(req,res)=>{
	res.render('add-post',{
		heading: 'ADD POST'
	})
})

app.post('/add-post-page',(req,res)=>{
	//console.log(req.body);
	if(!req.body.user_id)
		return res.render('login')
	if(!req.body.user_id || !req.body.title || !req.body.postImage || !req.body.descrip)
		return res.send({
			error: 'incomplete details'
		})
	var dec = decodeURIComponent(req.body.postImage);
	var base64Data = dec.split(",");
	
	var filename = randomstring.generate(10)+".png"
	//console.log(filename)
	fs.writeFile( "public/uploads/posts/"+filename , base64Data[1], 'base64', function(err) {
	  	if(err)
	  		return console.log(err);
		sql_post_insert(req.body.user_id,req.body.title,filename,req.body.descrip,(error,response)=>{
			if(error)
				return res.send({error})
			//console.log(response)
			res.send({response})
		})
	});
})

app.get('*',(req,res)=>{
	res.render('404',{
		heading: '404 Error Page',
		name: 'Monali Koshta',
		errormsg: 'Page not found'
	})
})

app.listen(3000,()=>{
	console.log('serving to the port 3000')
})