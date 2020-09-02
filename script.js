//Bugs:
// make it so the fire doesn't burn RIGHT after you build it
// wood isn't taken when u build the fire
// make feed fire a different speed than gather wood cause i want it to be that way
// don't disable the fire button if the fire is already hot
// change wheat farm hover text to say WHEAT farm
// also maybe change all instances of "farm" to wheat farm but thats kinda annoying
// maybe dont update text EVERY 0.1 SECONDS JEEZ LET ME HIGHLIGHT 
// Wait untill the whole shit is filled out on the first page to do gold trading because otherwise the gold wont show up


//Features:
// add text in readout for the first time you perform a task.  Ex. "You venture into the woods to catch some animals and manage to gather some steak."
// when you hover over supplies it should have a tooltip with info for example when you hover over population have it say "+3 gold/s" or a wheat farm "+.1 food/s"
// add cookie saving!
// add manual saving!
//		make sure to skip the intro if you do saving.and also enable everything
// add dark mode once CSS is done
//		use filter: invert(100%)
//		code is already there its commented out

var darkModeOn = false;

var wood = 0;
var food = 0;
var stone = 0;
var pelt = 0;
var gold = 0;

var population = 0;
var maxpopulation = 0;
var houses = 0;
var farms = 0;
var treeFarms = 0;
var mines = 0;

var num = 0;  //Used for random numbers
var num2 = 0;  //Used for random numbers

var heat = 0;
var heatTimer = 0;  //Used to time random fire events

var wandererTimer = 10;  //Used to time wanderer events (30 so it's not inline with the heat)

var supplyTimer = 20; //Used to time villagers eating
var foodChange = 0;
var woodChange = 0;
var stoneChange = 0;

var seconds = 0;

var ans;  //Used for message box

document.getElementById("feedFireContainer").style.visibility = "hidden";			//make all this shit hidden by looping through the getElementsByClassName("tab1")
document.getElementById("goHuntingContainer").style.visibility = "hidden";			//												   getElementsByClassName("tab2")
document.getElementById("collectStonesContainer").style.visibility = "hidden";		//												   getElementsByClassName("tab3")
																					//and just hide all elements tab1[i].style.visibility = "hidden";
document.getElementById("food").style.visibility = "hidden";
document.getElementById("pelt").style.visibility = "hidden";
document.getElementById("stone").style.visibility = "hidden";
document.getElementById("gold").style.visibility = "hidden";

document.getElementById("buildFarmContainer").style.visibility = "hidden";
document.getElementById("buildTreeFarmContainer").style.visibility = "hidden";
document.getElementById("buildMineContainer").style.visibility = "hidden";
document.getElementById("buildDockContainer").style.visibility = "hidden";

document.getElementById("houses").style.visibility = "hidden";
document.getElementById("farms").style.visibility = "hidden";
document.getElementById("treeFarms").style.visibility = "hidden";
document.getElementById("mines").style.visibility = "hidden";

document.getElementById("tab1").style.display = "none";
document.getElementById("tab2").style.display = "none";
document.getElementById("tab3").style.display = "none";

document.getElementById("tab1").disabled = true;

/*
var tempCheatVariable = true;

function tempCheat() {			//=====================================================REMOVE=====================================================================
	wood += 1000;
	food += 1000;
	pelt += 1000;
	stone += 1000;
	gold += 10;
	population += 1;
	maxpopulation += 1;
}
*/

document.getElementById("hatchASCII").style.display = "none";	

function dockHatch() {			//============dock shit==============

	addEvent("You found a secret hatch");

	document.getElementById("dockASCII").style.display = "none";
	document.getElementById("hatchASCII").style.display = "inline-block";
	document.getElementsByClassName("preContainer").style.textAlign = "center";
	document.getElementById("hatchASCII").style.textAlign = "center";
}

var allowHatchGold = true;
var hatchGolds = document.getElementsByClassName("hatchGold");

function hatchGold() {
	if (allowHatchGold) {
		gold += 29;

		for (var i = 0; i < hatchGolds.length; i++) {
			hatchGolds[i].style.color = "#555";
		}

		allowHatchGold = false;

		addReadout("+29 gold");
	}
}

function darkMode() {
	if (darkModeOn) {
		/*document.getElementById("pageStyle").setAttribute("href", "style.css");*/				//You could active another style sheet on TOP of the normal one thats really small
		alert("This is a work in progress,\nit's not finished yet sorry!");						//and just inverts the colors for the body and fixes a few things?
		document.getElementById("darkMode").innerHTML = "Dark mode";
		darkModeOn = false;
	} else {
		/*document.getElementById("pageStyle").setAttribute("href", "darkModeStyle.css");*/
		alert("This is a work in progress,\nit's not finished yet sorry!");
		document.getElementById("darkMode").innerHTML = "Light mode";
		darkModeOn = true;
	}
}

/*if (!tempCheatVariable) {*/	//=====================================================REMOVE=====================================================================
	// vvv Gets rid of all other tab content vvv
	var tab1 = document.getElementsByClassName("tab1");
	for (var i = 0; i < tab1.length; i++) {
		tab1[i].style.display = "none";
	}
	document.getElementById("header").style.visibility = "hidden";

	setTimeout(function () { document.getElementById("beginning").innerHTML = "You are in the woods."; }, 3000);
	setTimeout(function () { document.getElementById("beginning").innerHTML = "You remember nothing."; }, 7000);
	setTimeout(function () { document.getElementById("beginning").innerHTML = "You are alone."; }, 11000);
	setTimeout(function () { document.getElementById("beginning").style.display = "none"; }, 15000);

	setTimeout(function () {
		for (var i = 0; i < tab1.length; i++) {
			tab1[i].style.display = "block";
		}

		document.getElementById("header").style.visibility = "visible";

		document.getElementById("tab1fade").className = "active";
		document.getElementById("header").className = "active";

		function fadeDelay2() {
			document.getElementById("tab1fade").className = "inactive";
			document.getElementById("header").className = "inactive";
		}
		setTimeout(fadeDelay2, 10);
	}, 17000);

/*}*/

addEvent("You wake up shivering, you are alone");

//Add village tab and upgrades tab.  Village tab will have population, build house, taxes for gold, etc.  Uggrades tab will apear once all actioans on main page are filled out
//Market is a possibility to trade gold with.  Costs a bunch of gold to but a market which opens up the third tab

//Possibility: tabs unlock up as you buy them.
//Ex.  Buy a dock in the village which unlocks Dock tab.  In the dock tab you can buy fishing boats (+X food every few minutes) or a transportation boat which increases population increase chance.  
//Ex.  Buy a market to unlock market tab used for gold

//Add save game with encrypted base variabled (food, wood, population, etc.) MAYBE??

//Fix things that are able to happen before they should.
//Ex.  Message box (probably should wait untill all stats are filled in the forest)
//Ex.  Fire can burn before you built a fire
//Ex.  Anything that can happen before the begining text is over (not sure if there is any)

var fireText = "Build fire";

function main() {
	//																		ALL UNLOCKS ARE HERE
	if (wood >= 15) {
		document.getElementById("feedFireContainer").style.visibility = "visible";
		document.getElementById("feedFire").innerHTML = fireText;
	}
	if (wood >= 30) {
		document.getElementById("goHuntingContainer").style.visibility = "visible";
		document.getElementById("food").style.visibility = "visible";
		document.getElementById("pelt").style.visibility = "visible";
	}
	if (food >= 20) {
		document.getElementById("collectStonesContainer").style.visibility = "visible";
		document.getElementById("stone").style.visibility = "visible";
	}
	if (stone >= 40) {
		document.getElementById("tab1").style.display = "inline-block";
		document.getElementById("tab2").style.display = "inline-block";

		document.getElementById("gold").style.visibility = "visible";

		document.getElementById("population").style.visibility = "visible";
		document.getElementById("houses").style.visibility = "visible";
	}
	if (houses > 0) {
		document.getElementById("buildFarmContainer").style.visibility = "visible";
		document.getElementById("farms").style.visibility = "visible";
		document.getElementById("buildTreeFarmContainer").style.visibility = "visible";
		document.getElementById("treeFarms").style.visibility = "visible";
		document.getElementById("buildMineContainer").style.visibility = "visible";
		document.getElementById("mines").style.visibility = "visible";
		try {
			document.getElementById("buildDockContainer").style.visibility = "visible";
		} catch (error) {
			//dock button don't exist no more
		}
	}

	heatTimer += 0.1;
	if (heatTimer >= 60 && fireText == "Feed fire") {
		heatTimer = 0;
		if (rand(0, 100) <= 33) {
			if (heat > 0) {
				heat -= 1;
				if (heat == 1) {
					addEvent("The fire flickers, it is cool");
				} else if (heat == 2) {
					addEvent("The fire flickers, it is warm");
				} else if (heat == 3) {
					addEvent("The fire flickers, it is very warm");
				} else if (heat == 4) {
					addEvent("The fire flickers, it is hot");  //This probably isn't needed
				}
			} else {
				if (population > 0) {
					addEvent("It is freezing, a villager died from the cold");
					population -= 1;
				} else {
					addEvent("It is freezing");
				}
			}
		} else {
			if (heat == 0) {
				addEvent("It is unbearably cold");
			} else if (heat < 4) {
				addEvent("The fire burns");
			} else {
				addEvent("The fire lights up with heat");
			}
		}
	}

	wandererTimer += 0.1;
	if (population < maxpopulation) {
		if (wandererTimer > 60 * 3) {
			if (rand(0, 100) <= 10) {
				addEvent("A wanderer arives");
				population += 1;
				wandererTimer = 0;
			}
		}
	}

	supplyTimer += 0.1;
	if (supplyTimer > 1) {				//every second

		if (food >= 0 - foodChange) {
			food += foodChange;
			food += -population/10;		//this isn't a good way to do it becasue foodChange doesn't represent the change in food but idk how else to do it
			food = Math.round(food * 100) / 100;
		} else {
			addEvent("A villager dies from starvation");
			addReadout("-1 population");
			food = 0;
			supplyTimer = 0;
			population -= 1;
			foodChange += 1;
		}

		if (wood >= 0 - woodChange) {
			wood += woodChange;
			wood = Math.round(wood * 100) / 100;
		} else {
			wood = 0;
		}

		if (stone >= 0 - stoneChange) {
			stone += stoneChange;
			stone = Math.round(stone * 100) / 100;
		} else {
			stone = 0;
		}

		supplyTimer = 0;
	}


	var changeText = (woodChange >= 0) ? ((woodChange == 0) ? "" : " +" + woodChange + "/s") : " " + woodChange + "/s";
	document.getElementById("wood").innerHTML = "Wood: " + wood + changeText;
	var changeText = (foodChange - (population/10) >= 0) ? ((foodChange - (population/10) == 0) ? "" : " +" + (foodChange - (population/10)) + "/s") : " " + (foodChange - (population/10)) + "/s";  //this isn't a good way to do it becasue foodChange doesn't represent the change in food but idk how else to do it
	document.getElementById("food").innerHTML = "Food: " + food + changeText;
	document.getElementById("pelt").innerHTML = "Pelt: " + pelt;
	var changeText = (stoneChange >= 0) ? ((stoneChange == 0) ? "" : " +" + stoneChange + "/s") : " " + stoneChange + "/s";
	document.getElementById("stone").innerHTML = "Stone: " + stone + changeText;
	document.getElementById("gold").innerHTML = "Gold: " + gold;

	document.getElementById("population").innerHTML = "Population: " + population + "/" + maxpopulation;
	document.getElementById("houses").innerHTML = "Houses: " + houses;
	document.getElementById("farms").innerHTML = "Wheat farms: " + farms;
	document.getElementById("treeFarms").innerHTML = "Tree farms: " + treeFarms;
	document.getElementById("mines").innerHTML = "Mines: " + mines;

	if (rand(1, 10 * 60 * 8 /*~8m*/) == 1 && pelt > 10) {
		var askPrice = rand(pelt * 0.3, pelt * 0.7)											//make this nicer pls
		var givePrice = rand(Math.ceil((pelt * 0.3) / 5), Math.ceil((pelt * 0.7) / 5));		//I dont know how these work

		messageBox("A merchant arives.  He is asking for " + askPrice + " pelt in exchange for " + givePrice + " gold.  Do you want to trade?", yesFunction1, noFunction1);

		function yesFunction1() {
			if (pelt > askPrice) {
				addEvent("You accept and the merchant leaves");
				addReadout("-" + askPrice + " pelt, +" + givePrice + " gold");
				pelt -= askPrice;
				gold += givePrice;
			} else {
				addEvent("You can't afford to trade.  The merchant leaves.");
			}
		}
		function noFunction1() {
			addEvent("The merchant leaves");
		}

	}

	//these numbers need to be changed because theyre super not accurate
	//https://en.wikipedia.org/wiki/Settlement_hierarchy
	//ask a js discord if this is the most efficent way to do this

	if (population == 0) {
		populationTextInput = "You are alone";
	} else if (population > 0 && population <= 3) {
		populationTextInput = "You are together";
	} else if (population > 3 && population <= 9) {
		populationTextInput = "You are part of something";
	} else if (population > 9 && population <= 12) {
		populationTextInput = "You are a community";
	} else if (population > 12 && population <= 22) {
		populationTextInput = "You are a village";
	} else if (population > 22 && population <= 52) {
		populationTextInput = "You are a town";
	} else if (population > 52 && population <= 200) {
		populationTextInput = "You are a large town";
	} else if (population > 200 && population <= 500) {
		populationTextInput = "You are a city";
	} else if (population > 500 && population <= 1000) {
		populationTextInput = "You are a large city";
	} else if (population > 1000 && population <= 5000) {
		populationTextInput = "You are a metropolis";
	} else if (population > 5000 && population <= 10000) {
		populationTextInput = "You are a conurbation";
	} else if (population > 10000 && population <= 99999) {
		populationTextInput = "You are a megalopolis";
	} else {
		populationTextInput = "You are an ecumenopolis ( you win :) )";		//You win!
	}

	changePopulationText(populationTextInput);
}

setInterval(main, 100);

function changePopulationText(text) {
	document.getElementById("header").innerHTML = text;
}

function gatherWood() {
	num = rand(1, 3);
	wood += num;

	disableId("gatherWood", "loadingBarWood", 2.5);

	addReadout("+" + num + " wood");
}

function feedFire() {
	if (fireText == "Build fire") {
		addEvent("You built a small fire");
		disableId("feedFire", "feedFireProgress", 10);
		fireText = "Feed fire";
	} else {
		if (wood > 0) {
			if (heat < 4) {
				wood -= 1;
				heat += 1;

				if (heat == 1) {
					addReadout("-1 wood");
					addEvent("It is cool");
				} else if (heat == 2) {
					addReadout("-1 wood");
					addEvent("It is warm");
				} else if (heat == 3) {
					addReadout("-1 wood");
					addEvent("It is very warm");
				} else if (heat == 4) {
					addReadout("-1 wood");
					addEvent("It is is hot");
				}
			} else if (heat >= 4) {
				addEvent("The fire is already hot");
			}

			if (heat < 4) {
				disableId("feedFire", "feedFireProgress", 1);
			}

		} else {
			addEvent("You don't have enough wood for that");
		}
	}
}

function goHunting() {
	num = rand(5, 8);
	num2 = rand(0, 1);
	food += num;
	pelt += num2;

	addReadout("+" + num + " food, +" + num2 + " pelt");

	disableId("goHunting", "goHuntingProgress", 15);
}

function collectStones() {
	num = rand(15, 30);
	stone += num;

	addReadout("+" + num + " stone");

	disableId("collectStones", "collectStonesProgress", 30);
}
	
function switchToTab1() {										//make this a switchToTab(TAB_NUMBER) { } function
	var tab1 = document.getElementsByClassName("tab1");
	var tab2 = document.getElementsByClassName("tab2");
	var tab3 = document.getElementsByClassName("tab3");

	for (var i = 0; i < tab2.length; i++) {
		tab2[i].style.display = "none";
		tab3[i].style.display = "none";
	}

	document.getElementById("tab1").disabled = true;
	document.getElementById("tab2").disabled = false;
	document.getElementById("tab3").disabled = false;

	for (var i = 0; i < tab1.length; i++) {
		tab1[i].style.display = "block";
	}
}

function switchToTab2() {
	var tab1 = document.getElementsByClassName("tab1");
	var tab2 = document.getElementsByClassName("tab2");
	var tab3 = document.getElementsByClassName("tab3");

	for (var i = 0; i < tab1.length; i++) {
		tab1[i].style.display = "none";
		tab3[i].style.display = "none";
	}

	document.getElementById("tab1").disabled = false;
	document.getElementById("tab2").disabled = true;
	document.getElementById("tab3").disabled = false;

	for (var i = 0; i < tab1.length; i++) {
		tab2[i].style.display = "block";
	}
}

function switchToTab3() {
	var tab1 = document.getElementsByClassName("tab1");
	var tab2 = document.getElementsByClassName("tab2");
	var tab3 = document.getElementsByClassName("tab3");

	for (var i = 0; i < tab1.length; i++) {
		tab1[i].style.display = "none";
		tab2[i].style.display = "none";
	}

	document.getElementById("tab1").disabled = false;
	document.getElementById("tab2").disabled = false;
	document.getElementById("tab3").disabled = true;

	for (var i = 0; i < tab1.length; i++) {
		tab3[i].style.display = "block";
	}
}

function buildHouse() {
	if (wood >= 65 && stone >= 15) {
		houses += 1;
		wood -= 65;
		stone -= 15;
		maxpopulation += 3;

		addReadout("+1 house, -65 wood, -15 stone");

		disableId("buildHouse", "buildHouseProgress", 60);
	} else {
		addEvent("You can't afford that");					//maybe make these custom (you can't build a house right now)
	}
}

function buildFarm() {
	if (wood >= 50) {
		farms += 1;
		wood -= 50;

		addReadout("+1 wheat farm, -50 wood");

		foodChange += 0.2;

		disableId("buildFarm", "buildFarmProgress", 60);
	} else {
		addEvent("You can't afford that");
	}
}

function buildTreeFarm() {
	if (wood >= 68) {
		treeFarms += 1;
		wood -= 68;

		addReadout("+1 tree farm, -68 wood");

		woodChange += 0.1;

		disableId("buildTreeFarm", "buildTreeFarmProgress", 60);
	} else {
		addEvent("You can't afford that");
	}
}

function buildMine() {
	if (wood >= 30 && stone >= 120) {
		mines += 1;
		wood -= 30;
		stone -= 120;

		addReadout("+1 mine, -30 wood, -120 stone");

		stoneChange += 0.1;

		disableId("buildMine", "buildMineProgress", 60);
	} else {
		addEvent("You can't afford that");
	}
}

function buildDock() {
	if (wood >= 85 && stone >= 45) {
		
		wood -= 85;
		stone -= 45;

		addReadout("Built a dock, -30 wood, -120 stone");

		document.getElementById("tab3").style.display = "inline-block";

		var element = document.getElementById("buildDockContainer");
		element.parentNode.removeChild(element);

	} else {
		addEvent("You can't afford that");
	}
}

function moveDownReadoutList() {
	document.getElementById("i4").innerHTML = document.getElementById("i3").textContent;
	document.getElementById("i3").innerHTML = document.getElementById("i2").textContent;
	document.getElementById("i2").innerHTML = document.getElementById("i1").textContent;

	document.getElementById("i42").innerHTML = document.getElementById("i32").textContent;
	document.getElementById("i32").innerHTML = document.getElementById("i22").textContent;
	document.getElementById("i22").innerHTML = document.getElementById("i12").textContent;

}
function moveDownEventList() {
	document.getElementById("e4").innerHTML = document.getElementById("e3").textContent;
	document.getElementById("e3").innerHTML = document.getElementById("e2").textContent;
	document.getElementById("e2").innerHTML = document.getElementById("e1").textContent;

	document.getElementById("e42").innerHTML = document.getElementById("e32").textContent;
	document.getElementById("e32").innerHTML = document.getElementById("e22").textContent;
	document.getElementById("e22").innerHTML = document.getElementById("e12").textContent;
}

function addReadout(text) {
	moveDownReadoutList();
	document.getElementById("i1").innerHTML = text;
	document.getElementById("i12").innerHTML = text;

	document.getElementById("i1").className = "active";
	document.getElementById("i12").className = "active";

	function fadeDelay() {
		document.getElementById("i1").className = "inactive";
		document.getElementById("i12").className = "inactive";
	}

	setTimeout(fadeDelay, 10);
}

function addEvent(text) {
	moveDownEventList();
	document.getElementById("e1").innerHTML = text;
	document.getElementById("e12").innerHTML = text;

	document.getElementById("e1").className = "active";
	document.getElementById("e12").className = "active";

	function fadeDelay() {
		document.getElementById("e1").className = "inactive";
		document.getElementById("e12").className = "inactive";
	}

	setTimeout(fadeDelay, 10);
}

function messageBox(text, yesFunction, noFunction) {

	var modal = document.getElementById('myModal');

	modal.style.display = "block";

	var yesButton = document.getElementById("messageBoxYes");
	var noButton = document.getElementById("messageBoxNo");
	var okButton = document.getElementById("messageBoxOk");

	document.getElementById("messageBoxText").innerHTML = text;

	if (arguments.length == 3) {

		

		document.getElementById("messageBoxYes").style.visibility = "visible";
		document.getElementById("messageBoxNo").style.visibility = "visible";
		document.getElementById("messageBoxOk").style.visibility = "hidden";

		yesButton.onclick = function () {
			yesFunction();
			modal.style.display = "none";
		}

		noButton.onclick = function () {
			noFunction();
			modal.style.display = "none";
		}

	} else if (arguments.length == 1) {

		document.getElementById("messageBoxYes").style.visibility = "hidden";
		document.getElementById("messageBoxNo").style.visibility = "hidden";
		document.getElementById("messageBoxOk").style.visibility = "visible";

		okButton.onclick = function () {
			modal.style.display = "none";
		}

	}

}

function disableId(buttonID, progressID, time) {
	progress(buttonID, progressID, time);				//the only reason this is like this is because
									//I didn't want to change every call of disableID
}		//just copy paste progress function into here u lazy fuck
		//(and change variables)

function progress(buttonID, progressID, time) {
	//the button "jumps" non-disabled when you click it I dont know why
	var buttonElem = document.getElementById(buttonID);
	var progressElem = document.getElementById(progressID);		//MAKE IT SO THIS IS JUST buttonElem + "Progress"
	buttonElem.disabled = true;
	progressElem.style.opacity = 0.5;	//try making this 0.5?
	var width = 1;
	var id = setInterval(frame, time);
	function frame() {
		if (width >= 100) {
			clearInterval(id);
			buttonElem.disabled = false;
			progressElem.style.opacity = 0;
		} else {
			width += 0.1;
			progressElem.style.width = width + '%';
		}
	}
}


function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}