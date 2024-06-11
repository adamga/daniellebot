// Client-side logic for the chatbot

document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('sendButton');
    const inputArea = document.getElementById('inputArea');
    const responseArea = document.getElementById('responseArea');

    sendButton.addEventListener('click', function() {
        const userMessage = inputArea.value.trim();
        if (userMessage) {
            displayMessage(userMessage, 'user');
            fetchChatResponse(userMessage);
        }
    });

    function displayMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.className = sender;
        responseArea.appendChild(messageElement);
        responseArea.scrollTop = responseArea.scrollHeight;
    }

    function fetchChatResponse(message) {
        // Placeholder for API call to fetch chat response
        // This should be replaced with an actual call to the server-side API
        // For demonstration, we simulate a chatbot response
        setTimeout(() => {
            const botResponse = "This is a simulated response to: " + message;
            displayMessage(botResponse, 'bot');
        }, 1000);
    }
});
