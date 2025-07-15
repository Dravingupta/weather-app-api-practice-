const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index", { weather: null, error: null });
});

app.post("/", async (req, res) => {
    const city = req.body.city;
    const API_KEY = "main nhi bataunga ";
    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        const weather = {
            location: data.location.name,
            country: data.location.country,
            temp_c: data.current.temp_c,
            condition: data.current.condition.text,
            icon: data.current.condition.icon,
            wind_kph: data.current.wind_kph,
            humidity: data.current.humidity,
            feelslike_c: data.current.feelslike_c,
        };

        res.render("index", { weather, error: null });

    } catch (error) {
        res.render("index", {
            weather: null,
            error: "City not found! Please try again.",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
