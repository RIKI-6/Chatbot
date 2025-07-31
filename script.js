const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

// Smart keyword-based responses
const smartResponses = [{
        keywords: ["hello", "hi", "hey"],
        responses: ["Hello! 👋", "Hi there! How can I assist you?", "Hey! What's up?"]
    },
    {
        keywords: ["how are you", "how do you do"],
        responses: ["I'm great! Thanks for asking.", "Doing well, how about you?"]
    },
    {
        keywords: ["your name", "who are you"],
        responses: ["I'm SmartBot, your friendly assistant.", "You can call me SmartBot!"]
    },
    {
        keywords: ["help", "support", "assist"],
        responses: ["I'm here to help. Ask me anything.", "What can I assist you with today?"]
    },
    {
        keywords: ["bye", "goodbye", "see you"],
        responses: ["Goodbye! Have a great day!", "See you again soon 👋"]
    },
    {
        keywords: ["time"],
        responses: [() => `The time is ${new Date().toLocaleTimeString()}`]
    },
    {
        keywords: ["date", "today"],
        responses: [() => `Today is ${new Date().toLocaleDateString()}`]
    }
];

function getTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function addMessage(text, sender) {
    const message = document.createElement("div");
    message.classList.add("message", sender);
    message.setAttribute("data-time", getTime());
    message.textContent = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping(callback) {
    const typing = document.createElement("div");
    typing.classList.add("message", "bot", "typing");
    typing.textContent = "SmartBot is typing...";
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
        typing.remove();
        callback();
    }, 1000);
}

function getBotResponse(message) {
    message = message.toLowerCase();
    for (let intent of smartResponses) {
        if (intent.keywords.some(keyword => message.includes(keyword))) {
            const response = intent.responses[Math.floor(Math.random() * intent.responses.length)];
            return typeof response === "function" ? response() : response;
        }
    }
    return "I'm not sure how to respond to that. Can you try rephrasing?";
}

chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, "user");
    userInput.value = "";

    showTyping(() => {
        const reply = getBotResponse(message);
        addMessage(reply, "bot");
    });
});

window.onload = () => {
    setTimeout(() => {
        addMessage("Hello! I’m SmartBot. How can I help you today?", "bot");
    }, 500);
};