import express from "express";


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


let tasks = [];
let taskId = 1;

app.get("/", (req, res) => {
    const filter = req.query.filter;
    let filteredTasks = tasks;

    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.status);
    } else if (filter === "pending") {
        filteredTasks = tasks.filter(task => !task.status);
    }

    res.render("index.ejs", { tasks: filteredTasks });
});

app.post("/add", (req, res) => {
    const { task } = req.body;
    tasks.push({ id: taskId++, task, status: false });
    res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id !== parseInt(id, 10));
    res.redirect("/");
});

app.post("/update/:id", (req, res) => {
    const { id } = req.params;
    tasks = tasks.map(task =>
        task.id === parseInt(id, 10) ? { ...task, status: !task.status } : task
    );
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
