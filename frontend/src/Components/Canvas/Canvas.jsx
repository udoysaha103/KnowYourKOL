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
    constructor(canvas, context, x, y, radius, color) {
      this.canvas = canvas;
      this.c = context;
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.borderColor = color;
      this.dx = 3;
      this.dy = 3;
      this.growthRate = 1;
      this.currentRadius = 0;
    }

    draw() {
      const grad = this.c.createRadialGradient(
        this.x,
        this.y,
        this.currentRadius,
        this.x,
        this.y,
        this.currentRadius / 2
      );
      // this.c.addColorStop(0, `rgba(${this.color}, 0.05)`);
      // this.c.addColorStop(0.9, `rgba(${this.color}, 0.1)`);
      // this.c.addColorStop(0.9, `rgba(${this.color}, 0.4)`);
      // this.c.addColorStop(1, `rgb(${this.color})`);
      grad.addColorStop(0, "rgba(84, 188, 84, 0.05)");
      grad.addColorStop(0.9, "rgba(84, 188, 84, 0.1)");
      grad.addColorStop(0.9, "rgba(84, 188, 84, 0.4)");
      grad.addColorStop(1, "rgb(84, 188, 84)");
      this.c.beginPath();
      this.c.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2, false);
      this.c.fillStyle = grad;
      this.c.fill();
      this.c.lineWidth = 5;
      this.c.strokeStyle = this.borderColor;
      this.c.stroke();
      this.c.closePath();
    }
    update() {
      this.borderColor = this.color;
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
        this.borderColor = "white";
      }
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
    // const objects = [] //Our objects will be stored here
    const circle = new Circle(canvas, context, 300, 300, 100, colors[3]);
    //Our draw came here
    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate);
      context.clearRect(0, 0, canvas.width, canvas.height);
      circle.update();
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
