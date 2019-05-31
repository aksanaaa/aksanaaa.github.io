// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDNcZ9-8jvqYJRth7LfTwY58F4qhlOkae4",
    authDomain: "aksana-project-0705.firebaseapp.com",
    databaseURL: "https://aksana-project-0705.firebaseio.com",
    projectId: "aksana-project-0705",
    storageBucket: "aksana-project-0705.appspot.com",
    messagingSenderId: "612280693579",
    appId: "1:612280693579:web:17d9ac032eb31d3c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
let database = firebase.database()  
let scoreboard = {  }
let dog2 = document.getElementById("dog")
let x
let y
let f
let g
let c
let d
let direction  
let direction2
let score
let m
let n
let direction3
let villain
let level
let baddie
let time

function setup() {
  createCanvas(windowWidth, windowHeight);  
  s = width/887
  x = 150 
  y = 120 
  f = 500
  g = 420
  c = 500
  d = 250
  direction = 1
  direction2 = [1,1,1]
  score = 0	
  c = [ 100, 300, 500, ]
  d = [ 200, 400, 600, ]
  m = [ 100, 300, 500, 700, ]
  n = [ 600, 400, 200, 100, ]
  direction3 = [1,1,1,1]
  villain = 1
  level = 1
  baddie = 1
  time = 1000
}

function draw() { 
  
  if (time > 0) {
  background(0,128,128);
  fill(169,169,169)
  circle(x*s, y, 70*s)
  if (keyIsDown(LEFT_ARROW)) {
    x = x - 10
  }
  if (keyIsDown(RIGHT_ARROW)) {
    x = x + 10
  }
  if (keyIsDown(UP_ARROW)) {
    y = y - 10
  }
  if (keyIsDown(DOWN_ARROW)) {
    y = y + 10
  }
  if (touches.length == 0)   {

	controls for main character

}
  else { 
		150 = touches[0].x
		120 = touches[0].y
}

  fill(252, 160, 85)
  circle(f*s, g, 50*s)
  f = f + 5*direction
  if ( f > width || f < 0) {
    direction = direction * -1	    
  }

  textSize(25)
  text("Score: " +score, 400, 100)	
  if (dist( x, y, f, g) < 70 + 50) {
	score = score + 1
  }
  
  text("Time: " +time.toFixed(1), 400, 130)
  time = time - 0.3
  
  
  
  for (i=0; i<villain; i=i+1) {

    fill(94, 142, 168)  
    circle(c[i]*s, d[i], 90*s)  
    c[i] = c[i] + 7*direction2[i]
    if ( c[i] > width || c[i] < 0) {
      direction2[i] = direction2[i] * -1	
    }
    if (dist( c[i], d[i], x, y) < 90 + 70) {
      score = score - 1
    }
 }
 

  
  for (i=0; i<baddie; i=i+1) {
    fill(176, 244, 205)
    circle(m[i]*s, n[i], 30*s)
    n[i] = n[i] + 6*direction3[i]
    if ( n[i] > height || n[i] < 0) {
      direction3[i] = direction3[i] * -1
    }
    if (dist( x, y, m[i], n[i]) < 70 + 15) {
      score = score - 1
    }
  }

  
  
  if (score > 300 && level == 1) {
    villain = villain + 1
    level = 2
    c.push.apply(c, [300])
    d.push.apply(d, [400])
    direction2.push.apply(direction,[1]) 
}
if (score > 500 && level == 2) {
    villain = villain + 1
    level = 3
    c.push.apply(c, [300,500])
    d.push.apply(d, [400,600])
    direction2.push.apply(direction,[1]) 
}
if (score > 700 && level == 3) {
    baddie = baddie + 1
    level = 4
    m.push.apply(m, [100])
    n.push.apply(n, [200])
    direction3.push.apply(direction,[1]) 
}
if (score > 900 && level == 4) {
    baddie = baddie + 1
    level = 5
    m.push.apply(m, [100,300])
    n.push.apply(n, [600,400])
    direction3.push.apply(direction,[1]) 
}
if (score > 1100 && level == 5) {
    baddie = baddie + 1
    level = 6 
    m.push.apply(m, [700])
    n.push.apply(n, [100])
    direction3.push.apply(direction,[1]) 
}
    
  }
  else {

    dog2.innerHTML = "Name? <input id='key'><button    onclick='restart()'>Restart</button>"
    noLoop()

}

}

function restart() { 
		let dog = document.getElementById("key")
		name = dog.value 
		database.ref(name).set(score)
		if (name != "") { 
			scoreboard[name] = score
		}
		alert("Scoreboard: " +JSON.stringify(scoreboard,null,1)) 
		time = 1000
		score = 0
		loop()
		dog2.innerHTML = ""
		generate_leaderboard()
}
onclick=generate_alltime_leaderboard()

function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}
function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
		alltime_leaderboard[data.key] = data.val()
		});
    	});
	if (Object.values(alltime_leaderboard).length > 0) {
	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
    	}
}

generate_alltime_leaderboard()
