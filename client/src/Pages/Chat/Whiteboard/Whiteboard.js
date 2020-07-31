import React, { useRef, useEffect } from "react";
import { socket } from "../../../context/Socket";
import "./Whiteboard.css";

const Board = () => {
	const canvasRef = useRef(null);
    const colorsRef = useRef(null);
    const containerRef =useRef(null);

	useEffect(() => {
		// --------------- getContext() method returns a drawing context on the canvas-----

		const canvas = canvasRef.current;
		const test = colorsRef.current;
        const context = canvas.getContext("2d");
        const container = containerRef.current;
        console.log(container.offsetHeight);
		// ----------------------- Colors --------------------------------------------------

		const colors = document.getElementsByClassName("color");
		console.log(colors, "the colors");
		console.log(test);
		// set the current color
		const current = {
			color: "black",
		};

		// helper that will update the current color
		const onColorUpdate = (e) => {
			current.color = e.target.className.split(" ")[1];
		};

		// loop through the color elements and add the click event listeners
		for (let i = 0; i < colors.length; i++) {
			colors[i].addEventListener("click", onColorUpdate, false);
		}
		let drawing = false;

		// ------------------------------- create the drawline ----------------------------

		const drawLine = (x0, y0, x1, y1, color, emit) => {
			context.beginPath();
			context.moveTo(x0, y0);
			context.lineTo(x1, y1);
			context.strokeStyle = color;
			context.lineWidth = 2;
			context.stroke();
			context.closePath();

			if (!emit) {
				return;
			}
			const w = canvas.width;
			const h = canvas.height;

			socket.emit("drawing", {
				x0: x0 / w,
				y0: y0 / h,
				x1: x1 / w,
				y1: y1 / h,
				color,
			});
		};

		// ---------------- mouse movement --------------------------------------

		const onMouseDown = (e) => {
            var rect = e.target.getBoundingClientRect();
            console.log(rect);
			drawing = true;
			current.x = e.clientX - rect.left || e.touches[0].clientX;
			current.y = e.clientY - rect.top || e.touches[0].clientY;
		};

		const onMouseMove = (e) => {
            var rect = e.target.getBoundingClientRect();
			if (!drawing) {
				return;
			}
			drawLine(
				current.x,
				current.y,
				e.clientX - rect.left|| e.touches[0].clientX,
				e.clientY - rect.top|| e.touches[0].clientY,
				current.color,
				true
			);
			current.x = e.clientX - rect.left || e.touches[0].clientX;
			current.y = e.clientY - rect.top || e.touches[0].clientY;
		};

		const onMouseUp = (e) => {
            var rect = e.target.getBoundingClientRect();
			if (!drawing) {
				return;
			}
			drawing = false;
			drawLine(
				current.x,
				current.y,
				e.clientX - rect.left|| e.touches[0].clientX,
				e.clientY - rect.top || e.touches[0].clientY,
				current.color,
				true
			);
		};

		// ----------- limit the number of events per second -----------------------

		const throttle = (callback, delay) => {
			let previousCall = new Date().getTime();
			return function () {
				const time = new Date().getTime();

				if (time - previousCall >= delay) {
					previousCall = time;
					callback.apply(null, arguments);
				}
			};
		};

		// -----------------add event listeners to our canvas ----------------------

		canvas.addEventListener("mousedown", onMouseDown, false);
		canvas.addEventListener("mouseup", onMouseUp, false);
		canvas.addEventListener("mouseout", onMouseUp, false);
		canvas.addEventListener("mousemove", throttle(onMouseMove, 10), false);

		// Touch support for mobile devices
		canvas.addEventListener("touchstart", onMouseDown, false);
		canvas.addEventListener("touchend", onMouseUp, false);
		canvas.addEventListener("touchcancel", onMouseUp, false);
		canvas.addEventListener("touchmove", throttle(onMouseMove, 10), false);

		// -------------- make the canvas fill its parent component -----------------

		const onResize = () => {
			canvas.width = container.offsetWidth;
			canvas.height = container.offsetHeight;
		};

		window.addEventListener("resize", onResize, false);
		onResize();

		// ----------------------- socket.io connection ----------------------------
		const onDrawingEvent = (data) => {
			const w = canvas.width;
			const h = canvas.height;
			drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
		};

		socket.on("drawing", onDrawingEvent);
	}, []);

	// ------------- The Canvas and color elements --------------------------

	return (
		<div ref={containerRef} className="whiteboard-container">
			<canvas ref={canvasRef} className="whiteboard" />

			<div ref={colorsRef} className="colors">
				<div className="color black" />
				<div className="color red" />
				<div className="color green" />
				<div className="color blue" />
				<div className="color yellow" />
			</div>
		</div>
	);
};

export default Board;
