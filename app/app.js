// Client-side logic for the chatbot with Azure Active Directory authentication

// Import and configure the MSAL library
import * as msal from '@azure/msal-browser';

const msalConfig = {
    auth: {
        clientId: 'YOUR_AZURE_AD_CLIENT_ID',
        authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID'
    }
};

const myMSALObj = new msal.PublicClientApplication(msalConfig);

document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('sendButton');
    const inputArea = document.getElementById('inputArea');
    const responseArea = document.getElementById('responseArea');

    sendButton.addEventListener('click', function() {
        const userMessage = inputArea.value.trim();
        if (userMessage) {
            signIn().then(() => {
                fetchChatResponse(userMessage);
            });
        }
    });

    async function signIn() {
        try {
            const loginResponse = await myMSALObj.loginPopup();
            console.log('login response', loginResponse);
            if (myMSALObj.getAccount()) {
                console.log('logged in');
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function getToken() {
        try {
            const silentTokenRequest = {
                scopes: ['User.Read']
            };
            const tokenResponse = await myMSALObj.acquireTokenSilent(silentTokenRequest);
            return tokenResponse.accessToken;
        } catch (error) {
            console.error(error);
            if (error instanceof msal.InteractionRequiredAuthError) {
                const tokenResponse = await myMSALObj.acquireTokenPopup(silentTokenRequest);
                return tokenResponse.accessToken;
            }
        }
    }

    function displayMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.className = sender;
        responseArea.appendChild(messageElement);
        responseArea.scrollTop = responseArea.scrollHeight;
    }

    async function fetchChatResponse(message) {
        const accessToken = await getToken();
        // Placeholder for API call to fetch chat response
        // This should be replaced with an actual call to the server-side API
        // For demonstration, we simulate a chatbot response
        setTimeout(() => {
            const botResponse = "This is a simulated response to: " + message;
            displayMessage(botResponse, 'bot');
        }, 1000);
    }
});
