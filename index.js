import dotenv from "dotenv";
import express from "express";
import { join, resolve } from "path";
import exphbs from "express-handlebars";

import loginRouter from "./routes/login.js";
import registrationRouter from "./routes/registration.js";
import adminRouter from "./routes/admin.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

const hbs = exphbs.create({
	extname: ".hbs",
	defaultLayout: "main",
	layoutsDir: join(resolve(process.cwd()), "views", "layouts"),
	partialsDir: join(resolve(process.cwd()), "views", "partials"),
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use("/", loginRouter);
app.use("/registration", registrationRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => {
	console.log(`Сервер запущен на http://localhost:${PORT}`);
});
