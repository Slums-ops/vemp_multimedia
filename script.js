document.addEventListener("DOMContentLoaded", function(){

const video = document.querySelector(".hero-video");

video.play().catch(function(error){
console.log("Autoplay prevented. User interaction required.");
});

});// JavaScript Document