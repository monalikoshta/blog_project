function display_name(){
	const user_id = window.localStorage.getItem('user_id')
	if(!user_id)
		return location.replace('/login')
	var data={
		user_id
	}
	fetch('http://localhost:3000/dashboard-page',{
		method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Accept': 'application/json',
	            'Content-Type': 'application/json',
	            // 'Content-Type': 'application/x-www-form-urlencoded',
	        },
	}).then((response)=>{
		response.json().then((data)=>{
			if(data.error)
				return alert("Error!")
			if(data.profileImage)
				document.getElementById('img').src= "uploads/users/"+ data.profileImage;
			document.getElementById('name').innerHTML= "Hello "+ data.name.toUpperCase()
			document.getElementById('full_name').value = data.name.slice(0)
			document.getElementById('emailid').value = data.email
			document.getElementById('pswd').value = data.pswd
			document.getElementById('cnfpswd').value = data.pswd
		})
	})
}
display_name()

function getdata(){
	var name = document.getElementById("full_name").value
	var pswd = document.getElementById("pswd").value
	var cnfpswd = document.getElementById("cnfpswd").value
	var gender
	if(document.getElementById("male").checked)
		gender = document.getElementById("male").value
	if(document.getElementById("female").checked)
		gender = document.getElementById("female").value
	if(document.getElementById("other").checked)
		gender = document.getElementById("other").value
	var dob = document.getElementById("dob").value
	var profileImage = document.getElementById("dp").value


	if(!name || !pswd || !cnfpswd || !gender || !dob){
		alert("Fields marked with '*' are required")
	}
	else if(pswd != cnfpswd){
		alert("passwords do not match")
	}
	else{
		const user_id = window.localStorage.getItem('user_id')
		var data={
			name,
			pswd,
			gender,
			dob,
			profileImage,
			user_id
		}
		fetch('http://localhost:3000/edit-page',{
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Accept': 'application/json',
	            'Content-Type': 'application/json',
	            // 'Content-Type': 'application/x-www-form-urlencoded',
	        },
		}).then((response)=>{
			response.json().then((data)=>{
				//alert("from then "+data)
				if(data.error)
					return alert (error)
				if(data.response){
					alert("Your profile has been updated!")
					location.replace("/dashboard")
				}
			})
		}).catch((error)=>{
			alert(error)
		})

	}
}

var file=null;

function toBase64(file) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
     file=reader.result
     //console.log(file);
     document.getElementById("dp").value = file;
     //alert(document.getElementById("dp").value)
   };
}