import React, { useRef, useEffect } from "react";
import styles from "./Canvas.module.css";
const Canvas = ({data, topGap, ...rest}) => {
  const canvasRef = useRef(null);
  const footerHeight = 40;
  const colors = ["255, 0, 0", "0, 255, 0"];
  const circles = [];
  const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
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
      this.drawImage(this.image, 0.5, 0.1);
      this.top += this.currentRadius / 16;
      this.drawText(this.name, 0.25, "Arial", "white", true);
      this.top += this.currentRadius / 16;
      this.drawText(this.content, 0.4, "Arial", this.content[0] === "-" ? "rgb(255, 0, 0)" : "rgb(0, 255, 0)");
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

      this.showBorder = false;
      const distancePointerToCenter = findDistance(
        this.x,
        this.y,
        mouse.x,
        mouse.y
      );
      const isThisBubble =
        findDistance(this.x, this.y, mouse.x, mouse.y) < this.currentRadius;
      if (this.currentRadius < this.radius) {
        this.currentRadius += this.growthRate;
      }
      if (this.x + this.currentRadius > this.canvas.width) {
        this.x = this.canvas.width - this.currentRadius;
        this.dx = -this.dx;
      } else if (this.x - this.currentRadius < 0) {
        this.x = this.currentRadius;
        this.dx = -this.dx;
      }
      if (this.y + this.currentRadius > this.canvas.height) {
        this.y = this.canvas.height - this.currentRadius;
        this.dy = -this.dy;
      } else if (this.y - this.currentRadius < 0) {
        this.y = this.currentRadius;
        this.dy = -this.dy;
      }
      if (isThisBubble) {
        // hover effect
        this.showBorder = true;
      }
      if (mouse.onPress) {
        // click effect
        if (isThisBubble) {
          this.x = mouse.x;
          this.y = mouse.y;
        } else {
          const angle = Math.atan2(mouse.y - this.y, mouse.x - this.x);
          const force = 0.1;
          const i = Math.cos(angle) * force;
          const j = Math.sin(angle) * force;
          this.applyForce(-i, -j);
        }
      }
      circles.forEach((otherCircle) => {
        // Repulsion force
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
          const force = 0.05;
          const i = Math.cos(angle) * force;
          const j = Math.sin(angle) * force;
          this.applyForce(-i, -j);
          otherCircle.applyForce(i, j);
        }
      });

      this.x += this.dx;
      this.y += this.dy;
      this.top = this.y - this.currentRadius;
      this.dx *= 0.99; // friction
      this.dy *= 0.99; // friction
      this.draw();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - topGap - footerHeight;
    // Event Listeners
    window.addEventListener("mousemove", (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY - topGap;
    });

    window.addEventListener("mousedown", () => (mouse.onPress = true));
    window.addEventListener("mouseup", () => (mouse.onPress = false));

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - topGap - footerHeight;
    });
    if (!data) return;
    const contents = data.map((e) => Math.abs(parseFloat(e.content)));
    const max = Math.max(...contents);
    const min = Math.min(...contents);
    data.map((e) => {
      const minRadius = 20;
      const maxRadius = 100;
      const radius = (Math.abs((parseFloat(e.content)) - min) / (max - min)) * (maxRadius - minRadius) + minRadius;
      const x = Math.random() * (canvas.width - radius * 2) + radius;
      const y = Math.random() * (canvas.height - radius * 2) + radius;
      const color = colors[e.content[0]==="-" ? 0 : 1];
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
    };
    animate();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [data]);

  return <canvas className={styles.canvas} ref={canvasRef} {...rest} />;
};

export default Canvas;
