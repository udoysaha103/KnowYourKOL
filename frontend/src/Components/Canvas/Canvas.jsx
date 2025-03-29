import React, { useRef, useEffect } from "react";
import styles from "./Canvas.module.css";
const Canvas = ({ data, ...rest }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const colors = ["255, 0, 0", "0, 255, 0"];
  const circles = [];
  const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
    dx: 0,
    dy: 0,
    onPress: false,
  };
  const findDistance = (x1, y1, x2, y2) =>
    Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

  class Circle {
    constructor(
      canvas,
      context,
      x,
      y,
      radius,
      color,
      borderColor,
      image,
      name,
      content,
      mcap
    ) {
      this.canvas = canvas;
      this.c = context;
      this.x = x;
      this.y = y;
      this.top = y - radius;
      this.radius = radius;
      this.color = color;
      this.borderColor = borderColor;
      this.image = image;
      this.name = name;
      this.content = content;
      this.mcap = mcap;
      this.dx = 0;
      this.dy = 0;
      this.growthRate = 1;
      this.currentRadius = 0;
      this.showBorder = false;
      this.selected = false;
    }

    drawImage(img, width, padding) {
      this.top += padding * this.currentRadius;
      this.c.drawImage(
        img,
        this.x - (width / 2) * this.currentRadius,
        this.top,
        width * this.currentRadius,
        width * this.currentRadius
      );
      this.top += width * this.currentRadius;
    }
    drawText(text, size, fontFace, color, isBold = false) {
      this.c.textBaseline = "middle";
      this.c.textAlign = "center";
      let fontSize = this.currentRadius * size;
      this.c.font = `${isBold ? "bold " : ""}${fontSize}px ${fontFace}`;
      while (
        this.c.measureText(text).width > this.currentRadius * 2 &&
        fontSize > 1
      ) {
        fontSize -= 1;
        this.c.font = `${isBold ? "bold " : ""}${fontSize}px ${fontFace}`;
      }
      this.c.fillStyle = color;
      this.c.fillText(text, this.x, this.top + fontSize / 2);
      this.top += fontSize;
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
      if (this.showBorder) {
        this.c.lineWidth = 2;
        this.c.strokeStyle = this.borderColor;
        this.c.stroke();
      }
      this.c.closePath();
    }
    applyForce(i, j) {
      this.dx += i;
      this.dy += j;
    }
    update() {
      if (Math.abs(this.dx) < 0.05 && Math.abs(this.dy) < 0.05) {
        this.dx = (Math.random() - 0.5) * 0.2;
        this.dy = (Math.random() - 0.5) * 0.2;
      }
      this.x += this.dx; // velocity x
      this.y += this.dy; // velocity y
      this.top = this.y - this.currentRadius; // top of the circle's inner elements (initially it's top of the circle)
      this.dx *= 0.98;
      this.dy *= 0.98;

      this.showBorder = false;
      // content - start
      this.drawImage(this.image, 0.5, 0.1);
      this.top += this.currentRadius / 16;
      this.drawText(this.name, 0.25, "Arial", "white", true);
      this.top += this.currentRadius / 16;
      this.drawText(
        this.content.toFixed(2).toString() + "%",
        0.4,
        "Arial",
        this.content < 0 ? "rgb(255, 0, 0)" : "rgb(0, 255, 0)"
      );
      this.top += this.currentRadius / 32;
      const mcapText =
        this.mcap >= Math.pow(10, 9)
          ? Math.floor(this.mcap / Math.pow(10, 9)) + "B"
          : this.mcap >= Math.pow(10, 6)
          ? Math.floor(this.mcap / Math.pow(10, 6)) + "M"
          : this.mcap >= Math.pow(10, 3)
          ? Math.floor(this.mcap / Math.pow(10, 3)) + "K"
          : this.mcap;
      this.drawText(`Mcap: ${mcapText}`, 0.2, "Arial", "white");
      // content - end

      const isThisBubble =
        findDistance(this.x, this.y, mouse.x, mouse.y) < this.currentRadius;

      if (this.currentRadius < this.radius) {
        // bubble groiwng
        this.currentRadius += this.growthRate;
      }

      if (this.x + this.currentRadius > this.canvas.width) {
        // bounce off right wall
        this.x = this.canvas.width - this.currentRadius;
        this.dx = -this.dx;
      } else if (this.x - this.currentRadius < 0) {
        // bounce off left wall
        this.x = this.currentRadius;
        this.dx = -this.dx;
      }
      if (this.y + this.currentRadius > this.canvas.height) {
        // bounce off bottom wall
        this.y = this.canvas.height - this.currentRadius;
        this.dy = -this.dy;
      } else if (this.y - this.currentRadius < 0) {
        // bounce off top wall
        this.y = this.currentRadius;
        this.dy = -this.dy;
      }

      if (isThisBubble) {
        // hover effect
        this.showBorder = true;
      }

      if (mouse.onPress) {
        // click effect
        if (
          (isThisBubble && circles.every((circle) => !circle.selected)) ||
          this.selected
        ) {
          this.selected = true;
          this.showBorder = true;
          const distanceToCenter = findDistance(
            mouse.x,
            mouse.y,
            this.canvas.width / 2,
            this.canvas.height / 2
          );
          const force = 0.001 * distanceToCenter;
          const angle = Math.atan2(mouse.y - this.y, mouse.x - this.x);
          const i = Math.cos(angle) * force;
          const j = Math.sin(angle) * force;
          this.applyForce(i / 8, j / 8);
        } else {
          const angle = Math.atan2(mouse.y - this.y, mouse.x - this.x);
          const force = 0.001;
          const i = Math.cos(angle) * force;
          const j = Math.sin(angle) * force;
          this.applyForce(-i, -j);
        }
      } else {
        this.selected = false;
      }

      circles.forEach((otherCircle) => {
        // Repulsion force while colliding
        if (this === otherCircle) return;
        const distanceBetweenCircles = findDistance(
          this.x,
          this.y,
          otherCircle.x,
          otherCircle.y
        );
        const minDistance = this.currentRadius + otherCircle.currentRadius;
        if (distanceBetweenCircles < minDistance) {
          const angle = Math.atan2(
            otherCircle.y - this.y,
            otherCircle.x - this.x
          );
          const force = 0.005;
          const i = Math.cos(angle) * force;
          const j = Math.sin(angle) * force;
          this.applyForce(-i, -j);
          otherCircle.applyForce(i, j);
        }
      });

      this.draw();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = containerRef.current.clientWidth;
    canvas.height = containerRef.current.clientHeight;
    // Event Listeners
    window.addEventListener("mousemove", (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.dx = event.movementX;
      mouse.dy = event.movementY;
    });

    window.addEventListener("mousedown", () => (mouse.onPress = true));
    window.addEventListener("mouseup", () => (mouse.onPress = false));

    window.addEventListener("resize", () => {
      canvas.width = containerRef.current.clientWidth;
      canvas.height = containerRef.current.clientHeight;
    });
    if (!data) return;
    const contents = data.map((e) => Math.abs(e.content));
    const max = Math.max(...contents);
    const min = Math.min(...contents);
    data.map((e) => {
      const minRadius = window.innerWidth * 0.02;
      const maxRadius = window.innerWidth * 0.05;
      const radius =
        ((Math.abs(e.content) - min) / (max - min)) * (maxRadius - minRadius) +
        minRadius;
      const x = Math.random() * (canvas.width - radius * 2) + radius;
      const y = Math.random() * (canvas.height - radius * 2) + radius;
      const color = colors[e.content < 0 ? 0 : 1];
      const borderColor = "#fff";
      circles.push(
        new Circle(
          canvas,
          context,
          x,
          y,
          radius,
          color,
          borderColor,
          e.image,
          e.name,
          e.content,
          e.mcap
        )
      );
    });

    let animationFrameId;
    //Our draw came here
    circles.forEach((circle) => circle.draw());
    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate);
      context.clearRect(0, 0, canvas.width, canvas.height);
      circles.forEach((circle) => circle.update());
      // context.fillStyle = "white";
      // context.font = "16px Arial";
      // context.fillText(`dx: ${mouse.dx.toFixed(2)}, dy: ${mouse.dy.toFixed(2)}`, mouse.x, mouse.y);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [data]);

  return (
    <div ref={containerRef}>
      <canvas className={styles.canvas} ref={canvasRef} {...rest} />
    </div>
  );
};

export default Canvas;
