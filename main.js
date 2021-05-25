var prediction1 = "";
var prediction2 = "";
Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});
var camara = document.getElementById("camara");
Webcam.attach("#camara")
function capture() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_img" src="' + data_uri + '"/>'
    })
}
console.log("ml5 version", ml5.version);
var classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/3ZBPsJSf2/model.json', modelLoaded);
function modelLoaded() {
    console.log("modelLoaded");
}
function speak() {
    var synth = window.speechSynthesis;
    var speakdata1 = "The  first prediction is " + prediction1;
    var speakdata2 = "The  second prediction is " + prediction2;
    var utter = new SpeechSynthesisUtterance(speakdata1 + speakdata2);
    synth.speak(utter);
}
function identify() {
    var image = document.getElementById("captured_img")
    classifier.classify(image, gotResult);
}
function gotResult(error, result) {
    if (error) { console.error(error); }
    else { console.log(result); 
    document.getElementById("emotion1").innerHTML=result[0].label;
    document.getElementById("emotion2").innerHTML=result[1].label;
    prediction1=result[0].label;
    prediction2=result[1].label;
    speak();
    if (result[0].label=="Happy"){
        document.getElementById("emoticon1").innerHTML="&#x1F601";
    }
    if (result[0].label=="Sad"){
        document.getElementById("emoticon1").innerHTML="&#x1F614";
    }if (result[0].label=="Crying"){
        document.getElementById("emoticon1").innerHTML="&#x1F622";
    }if (result[0].label=="Angry"){
        document.getElementById("emoticon1").innerHTML="&#x1F620";
    }
    if (result[1].label=="Happy"){
        document.getElementById("emoticon2").innerHTML="&#x1F601";
    }
    if (result[1].label=="Sad"){
        document.getElementById("emoticon2").innerHTML="&#x1F614";
    }if (result[1].label=="Crying"){
        document.getElementById("emoticon2").innerHTML="&#x1F622";
    }if (result[1].label=="Angry"){
        document.getElementById("emoticon2").innerHTML="&#x1F620";
    }
}
}