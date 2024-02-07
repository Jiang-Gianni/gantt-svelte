export const _layout = {};

export function sizeStyles(
	width,
	height,
	minWidth,
	minHeight,
	maxWidth,
	maxHeight,
	gravity,
	self,
	layout
) {
	if (typeof width === "number") width = width + "px";
	if (typeof height === "number") height = height + "px";
	if (typeof minWidth === "number") minWidth = minWidth + "px";
	if (typeof minHeight === "number") minHeight = minHeight + "px";
	if (typeof maxWidth === "number") maxWidth = maxWidth + "px";
	if (typeof maxHeight === "number") maxHeight = maxHeight + "px";

	let growX = 0;
	let growY = 0;
	if (layout.cols) {
		if ((width && width.indexOf("%") !== -1) || !width) {
			growX = gravity;
		}
	} else if (layout.rows) {
		if ((height && height.indexOf("%") !== -1) || !height) {
			growY = gravity;
		}
	} else {
		growX = growY = gravity;
	}

	let styles = "";
	if (minWidth) {
		styles += `min-width:${minWidth};`;
	}
	if (maxWidth) {
		styles += `max-width:${maxWidth};`;
	}
	if (!width) {
		if (growX) {
			styles += `width:100%;`;
		}
		if (layout.cols) {
			styles += `flex:${growX || 1} ${
				self.cols || self.rows
					? "0 " + (self.rows && growX ? "1px" : "auto")
					: "1 1px"
			};`;
		}
	} else {
		if (width === "auto") {
			if (layout.cols) {
				styles += "flex: 0 0 auto;";
			}
		} else {
			styles += `width:${width};`;
		}
	}

	if (minHeight) {
		styles += `min-height:${minHeight};`;
	}
	if (maxHeight) {
		styles += `max-height:${maxHeight};`;
	}
	if (!height) {
		if (growY) {
			styles += `height:100%;`;
		}
		if (layout.rows) {
			styles += `flex:${growY || 1} ${
				self.cols || self.rows ? "0 " + (self.rows ? "1px" : "auto") : "1 1px"
			};`;
		}
	} else {
		if (height === "auto") {
			if (layout.rows) {
				styles += "flex: 0 0 auto;";
			}
		} else {
			styles += `height:${height};`;
		}
	}

	if (
		self.type === "empty" ||
		(self.type === "wide" &&
			(layout.type === "space" || layout.type === "wide"))
	) {
		styles += "border:none;";
	}

	return styles;
}
