import React, { useRef, useEffect } from "react";
import styles from "./Canvas.module.css";
const Canvas = (props) => {
  const canvasRef = useRef(null);
  const navbarHeight = 80;
  const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];
  const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };
  const findDistance = (x1, y1, x2, y2) =>
    Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  class Circle {
    constructor(canvas, context, x, y, radius, color, borderColor) {
      this.canvas = canvas;
      this.c = context;
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.borderColor = borderColor;
      this.dx = 3;
      this.dy = 3;
      this.growthRate = 1;
      this.currentRadius = 0;
      this.showBorder = false;
    }

    draw() {
      const grad = this.c.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.currentRadius
      );
      grad.addColorStop(0, `rgba(${this.color}, 0.05)`);
      grad.addColorStop(0.8, `rgba(${this.color}, 0.1)`);
      grad.addColorStop(0.9, `rgba(${this.color}, 0.4)`);
      grad.addColorStop(1, `rgb(${this.color})`);
      this.c.beginPath();
      this.c.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2, false);
      this.c.fillStyle = grad;
      this.c.fill();
      if(this.showBorder) {
        this.c.lineWidth = 2;
        this.c.strokeStyle = this.borderColor;
        this.c.stroke();
      }
      this.c.closePath();
    }
    update() {
      this.showBorder = false;
      if (this.currentRadius < this.radius) {
        this.currentRadius += this.growthRate;
      }
      if (
        this.x + this.radius > this.canvas.width ||
        this.x - this.radius < 0
      ) {
        this.dx = -this.dx;
      }
      if (
        this.y + this.radius > this.canvas.height ||
        this.y - this.radius < 0
      ) {
        this.dy = -this.dy;
      }
      if (findDistance(this.x, this.y, mouse.x, mouse.y) < this.radius) {
        this.showBorder = true;
      }
      this.x += this.dx;
      this.y += this.dy;
      this.draw();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - navbarHeight;
    // Event Listeners
    window.addEventListener("mousemove", (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY - navbarHeight;
    });

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - navbarHeight;
    });

    let animationFrameId;
    //Our draw came here
    const colors = ["255, 0, 0",  "0, 255, 0"];
    const circles = [];
    for (let i = 0; i < 10; i++) {
      const radius = Math.random() * (100 - 10) + 10;
      const x = Math.random() * (canvas.width - radius * 2) + radius;
      const y = Math.random() * (canvas.height - radius * 2) + radius;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const borderColor = "#000000";
      circles.push(new Circle(canvas, context, x, y, radius, color, borderColor));
    }

    circles.forEach(circle => circle.draw());
    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate);
      context.clearRect(0, 0, canvas.width, canvas.height);
      circles.forEach(circle => circle.update());
      // objects.forEach(object => {
      //  object.draw()
      // })
    };
    animate();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas className={styles.canvas} ref={canvasRef} {...props} />;
};

export default Canvas;
