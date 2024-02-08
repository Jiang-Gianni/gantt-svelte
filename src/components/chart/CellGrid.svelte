<script>
	export let width;
	export let height;

	let color = "#ebebeb";

	function generateCellGridBackground(width, height, color) {
		return `url("data:image/svg+xml,${encodeURIComponent(
			`<svg xmlns='http://www.w3.org/2000/svg' width='${width}px' height='${height}px'>
            <rect fill='none' width='100%' height='100%' stroke='${color}' stroke-width='3'/>
         </svg>`,
		)}")`;
	}
</script>

<div
	style="width:100%; height:100%; background:{generateCellGridBackground(
		width,
		height,
		color,
	)}"
/>
