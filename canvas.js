let canvas = document.querySelector('canvas');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Interactions

let mouse = {
  x: undefined,
  y: undefined
}

const maxRadius = 40;
let colors = ['#F20587','#2E038C','#F2B705','#F28705','#BF3604'];


window.addEventListener('mousemove',(event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize',()=>{
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
})

let c = canvas.getContext('2d');

  class Circle {
    constructor(x, y, dx, dy,radius) {
      
      this.x = x;
      this.y = y;
      this.dy = dy;
      this.dx = dx;
      this.radius = radius;
      this.minRadius = radius;
      this.color = colors[Math.floor(Math.random() * colors.length)]

      
      this.draw = () => {
      c.beginPath();
      c.arc(this.x,this.y,this.radius,0,Math.PI * 2, false);
      c.fillStyle = this.color ;
      c.fill();
    }

    this.update = () => {
      
      if(this.x+this.radius > innerWidth || this.x-this.radius < 0){
        this.dx = -this.dx;
      }
    
      if(this.y+this.radius > innerHeight || this.y-this.radius < 0){
        this.dy = -this.dy;
      }
      this.x+=this.dx;
      this.y+=this.dy;

      // interactivity
      if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50 ){
        if(this.radius < maxRadius){
          this.radius+=1;
        }
      }else if(this.radius > this.minRadius){
        this.radius-=1;
      }
      this.draw();
    }
  }
}


let circleArray = [];

const init = () => {
  circleArray = []
  for(let i = 0; i<800; i++){
    let x = Math.random() * innerWidth;
    let dx = (Math.random() - 0.5) * 5;
    let y = Math.random() * innerWidth;
    let dy = (Math.random() - 0.5) * 5;
    let radius = Math.random() * 10 + 1;
    let circle = new Circle(x,y,dx,dy,radius);
    circleArray.push(circle);
  } 
  animate();
}


function animate(){
  requestAnimationFrame(animate);

  // circleArray[0].draw();
  c.clearRect(0,0,innerWidth,innerHeight);
  
  for(let i = 0; i<circleArray.length; i++){
    circleArray[i].update();
  }
  
}

init();
