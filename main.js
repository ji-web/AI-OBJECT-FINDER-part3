status1="";
value="";
results=[];
objects=[];

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}

function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Object";
    object_name=document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log("model is loaded");
    status1=true;
}

function draw(){
    image(video,0,0,480,380);
    if(status1 !="" ){
        objectDetector.detect(video,gotResults);
        for(var i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="status : objects detected";
            fill("#FF0000");
             percentage=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percentage+"%",objects[i].x +15,objects[i].y +15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label==object_name){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("object_status").innerHTML=object_name+" Found";
                synth=window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(object_name+"Found");
                synth.speak(utterThis);
                
            }
            else{
                document.getElementById("object_status").innerHTML=object_name+"not found"
            }
        }
    }
    
}

function gotResults(results,error){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
        
    }
}

function preload(){
    video=createVideo("images.jpg");
    video.hide();
}