song="";
leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;

function preload(){
    song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");
    if(scorerightwrist > 0.2){
    
    circle(rightwristX, rightwristY, 20);
    if(rightwristY > 0 && rightwristY <= 100){
        document.getElementById("speed").innerHTML="speed=0.5x";
        song.rate(0.5);
    }
    else if(rightwristY > 100 && rightwristY <= 200){
        document.getElementById("speed").innerHTML="speed=1x";
        song.rate(1);
    }

    else if(rightwristY > 200 && rightwristY <= 300){
        document.getElementById("speed").innerHTML="speed=1.5x";
        song.rate(1.5);
    }

    else if(rightwristY > 300 && rightwristY <= 400){
        document.getElementById("speed").innerHTML="speed=2x";
        song.rate(2);
    }

    else if(rightwristY > 400 && rightwristY <= 500){
        document.getElementById("speed").innerHTML="speed=2x";
        song.rate(2);
    }
}

    if(scoreleftwrist > 0.2){
        circle(leftwristX, leftwristY, 20);
        inNumberleftwristY=Number(leftwristY);
        remove_decimal=floor(inNumberleftwristY);
        volume=remove_decimal/500;
        document.getElementById("volume").innerHTML="volume="+volume;
        song.setVolume(volume);
    }

}
function check(){
    playing= music.isPlaying();
    console.log("Song is Playing"+ playing);
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("PoseNet is Initialised");
}

function gotPoses(){
    if (results.length > 0){
        console.log(results);
        scorerightwrist=results[0].pose.keypoints[10].score;
        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist="+scoreleftwrist);
        console.log("scorerightwrist="+scorerightwrist);
        leftwristX=results[0].pose.leftwrist.X;
        leftwristY=results[0].pose.leftwrist.Y;
        rightwristX=results[0].pose.rightwrist.X;
        reghtwristY=results[0].pose.rightwrist.Y;

        console.log("leftwristX="+leftwristX+"leftwristY="+leftwristY);
        console.log("rightwristX="+rightwristX+"rightwristY"+rightwristY);
    }
}