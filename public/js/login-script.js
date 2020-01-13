function login(){
	const email = encodeURIComponent(document.getElementById("emailid").value)
	const pswd = encodeURIComponent(document.getElementById("pswd").value)
	if(!email || !pswd)
		return alert("Please enter email and password both");
	if(email && pswd)
		//return alert(email+ pswd)
	fetch('http://localhost:3000/login-page?email='+email+'&pswd='+pswd).then((response)=>{
		response.json().then((data)=>{
			//alert('1')
			//alert(data.response)
			//alert('2')
			if(data.error)
				return alert("Error!")
			if(data.response.length==0)
				return alert("Incorrect email and password!")
			//if(data.response==1){
				window.localStorage.setItem('user_id',data.response[0].user_id)
				//alert(window.localStorage.getItem('user_id'))
				location.replace("/dashboard")
			//}
		})
	})
}