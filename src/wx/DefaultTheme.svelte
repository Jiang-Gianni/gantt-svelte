<script>
	const font =
		"https://fonts.googleapis.com/css?family=Roboto:400,500,700,900&display=swap&subset=cyrillic-ext";
	const icons =
		"https://cdn.materialdesignicons.com/2.7.94/css/materialdesignicons.css";

	const SLOTS = $$props.$$slots;
</script>

<svelte:head>
	{@html `<link href="${font}" rel="stylesheet" type="text/css">`}
	{@html `<link href="${icons}" rel="stylesheet" type="text/css" charset="utf-8">`}
</svelte:head>

{#if SLOTS && SLOTS.default}
	<div class="wx-default" style="height:100%;">
		<slot />
	</div>
{/if}

<style>
	:global(.wx-default) {
		/* common */
		--wx-font: 400 14px Arial;
		--wx-font-color: #5f5f5f;
		--wx-border-color: #ebebeb;

		/* buttons */
		--wx-button-font: 500 14px Roboto;
		--wx-button-primary-font-color: #fff;
		--wx-button-danger-font-color: #ff5252;
		--wx-button-primary-color: #0db5cb;
		--wx-button-primary-color-hover: #2898b0;
		--wx-button-danger-color: transparent;
		--wx-button-danger-color-hover: rgba(255, 82, 82, 0.2);
		--wx-button-radius: 2px;

		/* bars */
		--wx-gantt-bar-font: 400 12px Arial;
		--wx-gantt-bar-border-radius: 2px;

		--wx-gantt-task-color: #00bed7;
		--wx-gantt-task-font-color: #fff;
		--wx-gantt-task-fill-color: #2898b0;
		--wx-gantt-task-border-color: #2898b0;

		--wx-gantt-project-color: #2acc69;
		--wx-gantt-project-font-color: #fff;
		--wx-gantt-project-fill-color: #3c9445;
		--wx-gantt-project-border-color: #3c9445;

		--wx-gantt-milestone-color: #d33daf;

		--wx-gantt-select-color: #fff797;
		--wx-gantt-link-color: #ffa011;

		/* shadows */
		--wx-top-shadow: none;

		/* grid */
		--wx-grid-header-font: 400 12px Arial;
		--wx-grid-header-font-color: #a6a6a6;
		--wx-grid-header-text-transform: capitalize;
		--wx-grid-header-shadow: var(--wx-top-shadow);

		--wx-grid-body-font: 400 13px Arial;
		--wx-grid-body-font-color: #5f5f5f;
		--wx-grid-body-row-border: 1px solid var(--wx-border-color);

		/* timescale */
		--wx-timescale-font: 400 12px Arial;
		--wx-timescale-font-color: #a6a6a6;
		--wx-timescale-text-transform: capitalize;
		--wx-timescale-shadow: var(--wx-top-shadow);
		--wx-timescale-border: 1px solid var(--wx-border-color);

		/* input */
		--wx-label-font: 700 13px Arial;
		--wx-label-font-color: #5f5f5f;

		--wx-input-font: 400 12px Arial;
		--wx-input-font-color: #4f4f4f;
		--wx-input-padding: 8px 11px;
		--wx-input-border: 1px solid #dfdfdf;
		--wx-input-border-radius: 2px;
		--wx-input-focus-color: #2898b0;

		/* calendar */
		--wx-calendar-border: 1px solid #dfdfdf;
		--wx-calendar-month-font: 400 12px Arial;
		--wx-calendar-month-font-color: #5f5f5f;
		--wx-calendar-days-font: 400 10px Arial;
		--wx-calendar-days-font-color: rgba(0, 0, 0, 0.5);
		--wx-calendar-dates-font: 400 12px Arial;
		--wx-calendar-dates-font-color: #4f4f4f;

		/* markers */
		--wx-gantt-marker-font: 400 12px Arial;
		--wx-gantt-marker-font-color: #fff;
		--wx-gantt-marker-color: rgba(43, 111, 173, 0.77);

		/* tooltips */
		--wx-tooltip-font: 400 12px Arial;
		--wx-tooltip-font-color: #5f5f5f;

		/* icons */
		--wx-add-btn-icon: url("data:image/svg+xml,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.6 4.59998V6.99998H6.59995V11H4.19995V6.99998H0.199951V4.59998H4.19995V0.599976H6.59995V4.59998H10.6Z' fill='%233DB9D3'/%3E%3C/svg%3E ");
		--wx-close-btn-icon: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Crect width='14' height='14' fill='url(%23pattern0)'/%3E%3Cdefs%3E%3Cpattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'%3E%3Cuse xlink:href='%23image0' transform='scale(0.0555556)'/%3E%3C/pattern%3E%3Cimage id='image0' width='18' height='18' xlink:href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAkUlEQVQ4T2NkoBJgpJI5DEPAoFOnTv0/c+YMQR+bmJgwmJmZwX2E4bVp06b9j4yMZODg4MBp2I8fPxiWL1/OkJWVNeIN4uTkxAin79+/M5AcRtgCHGQIyQbhijaiDQoKDmZgZ2PDGf0/f/1iWLd2LeHod3d3Z2BkYsJp0P9//xh27tyJ3yCqpWyCeQOHgsGX+wEZpW4T5LCxKwAAAABJRU5ErkJggg=='/%3E%3C/defs%3E%3C/svg%3E%0A");
		--wx-open-btn-icon: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Crect width='14' height='14' fill='url(%23pattern0)'/%3E%3Cdefs%3E%3Cpattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'%3E%3Cuse xlink:href='%23image0' transform='scale(0.0555556)'/%3E%3C/pattern%3E%3Cimage id='image0' width='18' height='18' xlink:href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAArklEQVQ4T2NkoBJgpJI5DEPAoFOnTv0/c+YMQR+bmJgwmJmZwX2E4bVp06b9j4yMZODg4MBp2I8fPxiWL1/OkJWVNUAGcXJyMnz//h3uQrJdRLFBIAPQAchlJLsIFuCMjIwM////B5sJMoRkg2CuIdtrQcHBDOxsbHBfCQgIMHz48AHO//nrF8O6tWsJR7+7uzsDIxMTznT0/98/hp07d+I3iGopm2DewKFg8OV+AJWkfRMrTobLAAAAAElFTkSuQmCC'/%3E%3C/defs%3E%3C/svg%3E ");
		--wx-close-sb-icon: url("data:image/svg+xml,%3Csvg width='15' height='14' viewBox='0 0 15 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.0344 1.42188L12.6281 0.015625L7.04999 5.59375L1.47186 0.015625L0.0656128 1.42188L5.64374 7L0.0656128 12.5781L1.47186 13.9844L7.04999 8.40625L12.6281 13.9844L14.0344 12.5781L8.45624 7L14.0344 1.42188Z' fill='black' fill-opacity='0.54'/%3E%3C/svg%3E%0A");
		--wx-show-more-icon: url("data:image/svg+xml,%3Csvg width='10' height='5' viewBox='0 0 10 5' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.820312 0.820312L5 5L9.17969 0.820312H0.820312Z' fill='black' fill-opacity='0.5'/%3E%3C/svg%3E ");
		--wx-calendar-icon: url("data:image/svg+xml,%3Csvg width='16' height='17' viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.8203 15.3203H2.17969V6.17969H13.8203V15.3203ZM11.3203 0.320312V2H4.67969V0.320312H3V2H2.17969C1.6849 2 1.28125 2.15625 0.96875 2.46875C0.65625 2.78125 0.5 3.1849 0.5 3.67969V15.3203C0.5 15.7891 0.65625 16.1927 0.96875 16.5312C1.30729 16.8438 1.71094 17 2.17969 17H13.8203C14.2891 17 14.6797 16.8438 14.9922 16.5312C15.3307 16.1927 15.5 15.7891 15.5 15.3203V3.67969C15.5 3.1849 15.3307 2.78125 14.9922 2.46875C14.6797 2.15625 14.2891 2 13.8203 2H13V0.320312H11.3203ZM12.1797 9.5H8V13.6797H12.1797V9.5Z' fill='black' fill-opacity='0.5'/%3E%3C/svg%3E ");
		--wx-remove-link-icon: url("data:image/svg+xml,%3Csvg width='12' height='15' viewBox='0 0 12 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 13.3203C1 13.7891 1.15625 14.1927 1.46875 14.5312C1.80729 14.8438 2.21094 15 2.67969 15H9.32031C9.78906 15 10.1797 14.8438 10.4922 14.5312C10.8307 14.1927 11 13.7891 11 13.3203V3.32031H1V13.3203ZM3.03125 7.38281L4.24219 6.21094L6 8.00781L7.75781 6.21094L8.92969 7.38281L7.17188 9.17969L8.92969 10.9375L7.75781 12.1094L6 10.3516L4.24219 12.1094L3.07031 10.9375L4.82812 9.17969L3.03125 7.38281ZM8.92969 0.820312L8.07031 0H3.92969L3.07031 0.820312H0.179688V2.5H11.8203V0.820312H8.92969Z' fill='black' fill-opacity='0.5'/%3E%3C/svg%3E ");
	}
</style>
