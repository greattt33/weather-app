

const express= require("express");

const app= express();

const bodyParser= require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
const https= require("https");
app.use(express.static("public"));
app.set("view engine","ejs");

var city_name=[];
var countryName=[];
var time_zone=[];
var pressures=[];
var temperature=[];
var humidity=[];
var weatherDescription=[];
var visilibity_see=[];
app.get("/",function(request,response){
	response.sendFile(__dirname+"/")
	response.render("list",{
		Name:city_name[0],
		
		Timezone:time_zone[0],
		Humidity:humidity[0],
		Pressure:pressures[0],
		Temperature:temperature[0]+"celcius",
		Description:weatherDescription[0],
		Visibility:visilibity_see[0],
	})
	
});
app.post("/",function(request,response){
	const inputVal= request.body.cityName;
	const apiKey="2a7eed412237d5674307d0eaab756796";
	const url="https://api.openweathermap.org/data/2.5/weather?q="+ inputVal +"&appid="+ apiKey +"&units=metric";
	
	
	https.get(url,(res)=>{
		res.on("data",(data)=>{
			const weatherData = JSON.parse(data);
			
			
			time_zone.push(weatherData.timezone);
			pressures.push(weatherData.main.pressure);
			humidity.push(weatherData.main.humidity);
			city_name.push(weatherData.name);
			temperature.push(weatherData.main.temp);
			visilibity_see.push(weatherData.visibility);
			
		})
		response.send();
		
	});	
		
		response.redirect("/");
});
app.listen(3000,function(){
	console.log("server is working");
});