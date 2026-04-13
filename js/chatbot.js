console.log("chatbot.js loaded");

async function askAI() {
  console.log("askAI() called");

  const prompt = document.getElementById("prompt").value;
  const answerBox = document.getElementById("response");

  answerBox.textContent = "Loading…";

  const res = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();

  answerBox.textContent = data.reply || "No response";
}

window.askAI = askAI;
