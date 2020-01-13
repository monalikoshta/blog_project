function calculate_age(dob) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

// console.log(calculate_age(new Date(1998, 8, 22)));

function getdata(){
	var name = document.getElementById("name").value
	var email = document.getElementById("emailid").value
	var pswd = document.getElementById("pswd").value
	var cnfpswd = document.getElementById("cnfpswd").value
	var gender
	if(document.getElementById("male").checked)
		gender = document.getElementById("male").value
	else if(document.getElementById("female").checked)
		gender = document.getElementById("female").value
	else
		gender = document.getElementById("other").value
	var dob = document.getElementById("dob").value
	var profileImage = document.getElementById("dp").value
	const age = calculate_age(new Date(dob.slice(0,4), dob.slice(5,7), dob.slice(8,10)))

	var data={
		name,
		email,
		pswd,
		gender,
		dob,
		profileImage
	}

	if(!name || !email || !pswd || !cnfpswd || !gender || !dob){
		alert("Fields marked with '*' are required")
	}
	else if(age<18){
		alert("You are too younger for signup!")
	}
	else if(pswd != cnfpswd){
		alert("passwords do not match")
	}
	else{
		fetch('http://localhost:3000/signup-page',{
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Accept': 'application/json',
	            'Content-Type': 'application/json',
	            // 'Content-Type': 'application/x-www-form-urlencoded',
	        },
		}).then((response)=>{
			response.json().then((data)=>{
				// alert(1)
				// alert("response from script "+data.response)
				// alert(2)
				if(data.error)
					return alert("Error!")
				if(data.response>0)
					return alert("This email has been already registered")
				if(data.response==0){
					alert("You are successfully registered!")
					location.replace("/login")
				}
			})
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