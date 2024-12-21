const socket = io();
const canvas2 = document.createElement('canvas');

function submitPoke(){
    const poke_try = document.getElementById("submit").value
    socket.emit('Try_Guess', poke_try)  
}

function drawPokePixel(Pixel_bool) {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d") ;
    var img = document.getElementById("Poke_image");
    canvas.height = img.naturalHeight ;
    canvas.width = img.naturalWidth ;

    if (Pixel_bool) {
        canvas2.width = canvas.width
        canvas2.height = canvas.height
        const context2 = canvas2.getContext('2d');
        img.onload = function() {
            context2.drawImage(img, 0,0,canvas.width*0.4,canvas.height*0.4);
            context.drawImage(canvas2, 0, 0,canvas.width,canvas.height,0,0,canvas2.width*2.5,canvas2.height*2.5)
    }} else {
        context.drawImage(img, 0,0,canvas.width,canvas.height)
    }
};


socket.on("lifeReset", (res) => {
    document.getElementById("vie1").style.fill = "#81EDFF";
    document.getElementById("vie2").style.fill = "#4DA32E";
    document.getElementById("vie3").style.fill = "#FF8500";
    document.getElementById("canvas").style.filter = "grayscale(100%)";
    document.getElementById("submit").value = "";
});

socket.on("Record", (res) => {
    document.getElementById("record").innerText = `Record : ${res}`;
})
socket.on("Score", (res) => {
    document.getElementById("score").innerText = `Score : ${res}`;
})
socket.on("PokeImage", (res) => {
    document.getElementById("Poke_image").src = res;
    drawPokePixel(true)
})

socket.on("Life-1", (res) => {
    if (res == 2) {
        document.getElementById("vie1").style.fill = "black";
        document.getElementById("canvas").style.filter = "grayscale(0%)";
    }
    if (res == 1) {
        document.getElementById("vie2").style.fill = "black";
        drawPokePixel(false)
    }
})