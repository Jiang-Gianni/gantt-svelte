<script>
    import Gantt from "./components/Gantt.svelte";
    import DefaultTheme from "./wx/DefaultTheme.svelte";
    import { onMount } from "svelte";

    const scales = [
        { unit: "month", step: 1, format: "MMMM yyy" },
        { unit: "day", step: 1, format: "d" },
    ];

    let tasks = [
        {
            id: 1,
            open: true,
            start_date: "2020-11-06",
            duration: 8,
            text: "Svelte Gantt Widget",
            progress: 60,
            type: "project",
        },
        {
            id: 2,
            parent: 1,
            start_date: "2020-11-06",
            duration: 4,
            text: "Lib-Gantt",
            progress: 80,
        },
    ];

    const links = [{ source: 2, target: 1, type: 0 }];

    // let tasks = [];
    // let myTaskList = [];
    // onMount(async () => {
    //     const res = await fetch("http://localhost:3000/tasks");
    //     myTaskList = await res.json();
    //     tasks = myTaskList;
    //     console.log(myTaskList);
    // });
</script>

<DefaultTheme>
    <Gantt
        {scales}
        {tasks}
        {links}
        on:save={(ev) => {
            console.log(ev.detail);
        }}
    />
</DefaultTheme>
