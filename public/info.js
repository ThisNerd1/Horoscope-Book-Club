//Grabs data from mongo compass
let accountData = document.getElementById("EmailHTag");
let birthday = document.getElementById("Birthday");
let sunSign = document.getElementById("sunSign");
let moonSign = document.getElementById("moonSign");
let risingSign = document.getElementById("risingSign");
fetch("http://localhost:3000/getInfo").then(response=> response.json()).then(data=>{
    accountData.innerText = data.Name;
    birthday.innerText = data.birthDate;
    sunSign.innerText = data.sunSign;
    moonSign.innerText = data.moonSign;
    risingSign.innerText = data.risingSign;
})