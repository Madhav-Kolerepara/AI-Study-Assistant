const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("AI Study Assistant is running!");
});

app.post("/ask-ai", async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3.2:3b",
                prompt: prompt,
                stream: false
            })
        });

        const data = await response.json();

        res.json({
            answer: data.response
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Something went wrong while connecting to Ollama."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});