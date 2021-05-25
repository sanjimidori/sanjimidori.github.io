const dino = document.getElementById("dino");
const cacti = document.getElementById("cacti");
const star = document.getElementById("star");
let total = 0;
document.getElementById("total").innerHTML = "TOTAL: " + total;
//document.write(total)

document.addEventListener("keydown",function(event) {
	jump();
});

function jump(){
	if (dino.classList != "jump"){
		dino.classList.add("jump")
	}
	setTimeout(function(){
		dino.classList.remove("jump")
	},300)
}

let checkStar = setInterval(function(){
	let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"))
	let starLeft = parseInt(window.getComputedStyle(star).getPropertyValue("left"))
	if (starLeft<50 && starLeft>0 && dinoTop<=80){
		total = total + 1;
		document.getElementById("total").innerHTML = "TOTAL: " + total;
	}
},10)

let isAlive = setInterval(function(){
	let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"))
	let cactiLeft = parseInt(window.getComputedStyle(cacti).getPropertyValue("left"))
	
	if (cactiLeft<50 && cactiLeft>0 && dinoTop>=140){
		alert("GAME OVER!")
		total = 0;
	}
},10)