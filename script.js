let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let pencilButton = document.getElementById("pencil");
let brushButton = document.getElementById("brush");
let clearButton = document.getElementById("clear");
let strokeColor = document.getElementById("strokeColor");
let brushSize = document.getElementById("brushSize");
let saveButton = document.getElementById("save");
let downloadButton = document.getElementById("download");

let tool = {
    pencil: "pencil",
    brush: "brush",
};

let activeTool = tool.pencil;
let coord = { x: 0, y: 0 };

pencilButton.addEventListener("click", () => {
    activeTool = tool.pencil;
    brushSize.value = 1;
});
brushButton.addEventListener("click", () => {
    activeTool = tool.brush;
    brushSize.value = 10;
});
clearButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});


if (localStorage.getItem("canvas")) {
    let img = new Image();
    img.src = localStorage.getItem("canvas");
    img.onload = () => {
        ctx.drawImage(img, 0, 0);
    };
}


canvas.addEventListener("mousedown", start);
canvas.addEventListener("mouseup", stop);
canvas.addEventListener("mousemove", draw);

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;



function start(event) {
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
    canvas.addEventListener("mousemove", draw);
}

function stop() {
    canvas.removeEventListener("mousemove", draw);
}

function draw(event) {
    //swith
    switch (activeTool) {
        case tool.pencil:
            ctx.lineWidth = brushSize.value;
            ctx.lineCap = "butt";
            ctx.strokeStyle = strokeColor.value;
            ctx.lineTo(event.offsetX, event.offsetY);
            ctx.stroke();
            break;

        case tool.brush:
            ctx.lineWidth = brushSize.value;
            ctx.lineCap = "round";
            ctx.lineTo(event.offsetX, event.offsetY);
            ctx.stroke();
            break;
    }
}



