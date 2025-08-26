class Clock {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.drawClock = this.drawClock.bind(this);
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.radius = this.canvas.height / 2;
        this.ctx.translate(this.radius, this.radius);
        this.radius = this.radius * 0.80;
    }

    drawFace() {
        // Draw the white face with black stroke for top
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = this.radius * 0.05;
        this.ctx.stroke();

        // Fill the bottom half with a different color
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.radius, 0, Math.PI);
        this.ctx.fillStyle = '#018991 ';  // Light gray color for the bottom half
        this.ctx.fill();
    
        // Draw the circle border
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = this.radius * 0.05;
        this.ctx.stroke();
    
        // Draw the center dot
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.radius * 0.05, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'black';
        this.ctx.fill();
    }

    drawNumbers() {
        this.ctx.font = "bold " + this.radius * 0.14 + "px Arial";
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "center";
        for(let num = 1; num <= 24; num++){
            let ang = (num-12) * Math.PI / 12;
            this.ctx.rotate(ang);
            this.ctx.translate(0, -this.radius * 0.85);
            this.ctx.rotate(-ang);
            this.ctx.fillText(num.toString(), 0, 0);
            this.ctx.rotate(ang);
            this.ctx.translate(0, this.radius * 0.85);
            this.ctx.rotate(-ang);
        }
    }

    drawHand(pos, length, width) {
        this.ctx.beginPath();
        this.ctx.lineWidth = width;
        // this.ctx.lineCap = "round";
        this.ctx.moveTo(0,0);
        this.ctx.rotate(pos);
        this.ctx.lineTo(0, -length);
        this.ctx.stroke();
        this.ctx.rotate(-pos);
    }

    drawTime() {
        let now = new Date();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();
        const millisecond = now.getMilliseconds();
    
        // Correct hour angle calculation for 24-hour clock
        let hourAngle = (hour % 24) * (Math.PI / 12) + (minute * Math.PI / (12 * 60)) + (second * Math.PI / (12 * 60 * 60));
        // console.log(hourAngle)
    
        // Reverse the hour angle
        hourAngle = (Math.PI - hourAngle) * -1;
    
        // Ensure the angle is within 0 to 2π
        hourAngle = (hourAngle + 2 * Math.PI) % (2 * Math.PI);
    
        let minuteAngle = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
        // let secondAngle = (second * Math.PI / 30);
        const secondAngle = (second * Math.PI / 30) + (millisecond * Math.PI / (30 * 1000));
    
        this.drawHand(hourAngle, this.radius * 0.65, this.radius * 0.05);
        // Uncomment the next line if you want to show the minute hand
        // this.drawHand(minuteAngle, this.radius * 0.8, this.radius * 0.02);
        this.drawHand(secondAngle, this.radius * 0.65, this.radius * 0.01);
    }

    drawClock() {
        this.ctx.clearRect(-this.radius, -this.radius, this.canvas.width, this.canvas.height);
        this.drawFace();
        this.drawNumbers();
        this.drawTime();
        requestAnimationFrame(this.drawClock);
    }
}

// Usage:
const canvas = document.getElementById('clockCanvas');
const clock = new Clock(canvas);
clock.drawClock();
