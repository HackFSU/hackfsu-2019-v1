function main() {

	//var logoBaseCan = document.createElement("canvas");
	var logoImg = document.getElementById("logo");
	var logoImgData = null;
	//var logoOverCan = document.createElement("canvas");

	// probably want to have a larger image and use scale <=1 to prevent blur
	var logoScale = 0.4;
	var logoW, logoH; // was 196 by 58

	var getUpdatesBtn = document.getElementById("getUpdatesBtn");

	init();

	function init() {
		setupLogo();
		window.setTimeout(animateLogo.bind(null, logoW / 1.6, logoH), 50);

		addListeners();
	}

	function addListeners() {
		getUpdatesBtn.addEventListener("mousedown", function() { console.log("getting updates!"); }); // TODO
	}

	function setupLogo() {
		logoW = logoImg.width  * logoScale;
		logoH = logoImg.height * logoScale;
		logoImg.style.width  = logoW + "px";
		logoImg.style.height = logoH + "px";
		logoBaseCan.width = logoW;
		logoBaseCan.height = logoH;
		var logoBaseCtx = logoBaseCan.getContext("2d");
		logoBaseCtx.drawImage(logoImg, 0, 0, logoW, logoH);

		logoImgData = logoBaseCtx.getImageData(0, 0, logoW, logoH);
		var data = logoImgData.data;
		for (var i = 0, iLen = data.length; i < iLen; i += 4) {
			data[i + 4] = Math.floor((data[i] + data[i + 1] + data[i + 2]) / 3);
			data[i]     = 54;
			data[i + 1] = 199;
			data[i + 2] = 226;
		}
		logoBaseCtx.putImageData(logoImgData, 0, 0);
		var logoParent = logoImg.parentNode;
		logoParent.removeChild(logoImg);
		logoParent.appendChild(logoBaseCan);
		logoOverCan.style.position = "absolute";
		logoOverCan.style.left = "0px";
		logoOverCan.style.top  = "0px";
		logoParent.appendChild(logoOverCan);
	}
/*
	function animateLogo(x, y, o) {
		if (! o) {
			o = {
				ax: 0.5, ainc: .008, amax: 0.6,
				vx: -0.2, vmax: 0.8,
				x: x,
				maxX: logoW * 0.9,
				minX: x * 1.25,
				r: logoW / 2.7,
				update: 80
			};
		}

		if (x > o.maxX && o.ainc > 0)
			o.ainc *= -1;
		if (x < o.minX && o.ainc < 0)
			o.ainc *= -1;
		o.ax = Math.max(-o.amax, Math.min(o.amax, o.ax + o.ainc));
		o.vx = Math.max(-o.amax, Math.min(o.amax, o.vx + o.ax));
		x += o.vx;

		logoOverCan.width = logoW; logoOverCan.height = logoH;
		var logoOverCtx = logoOverCan.getContext("2d");
		logoOverCtx.putImageData(logoImgData, 0, 0);
		logoOverCtx.beginPath();
		logoOverCtx.arc(x, y, o.r, 0, 2 * Math.PI);
		logoOverCtx.globalCompositeOperation = "source-in";
		logoOverCtx.fillStyle = "#2fddf4";
		logoOverCtx.fill();

		window.setTimeout(animateLogo.bind(this, x, y, o), o.update);
	}
	*/

}

window.onload = main;
