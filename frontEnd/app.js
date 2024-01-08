
        
        
        let previousMessage;

        async function sendMessage() {
            const inputbox = document.getElementById('inputbox');
            const message = inputbox.value;
            appendMessage(message, 'user');


            // Clear the input box
            inputbox.value = '';

            // Make API call
            try {
                const response = await axios.post('http://localhost:1330/message', { prompt : message, previousMessage });
                appendMessage(response.data.message, 'bot');

                previousMessage = response.data.message;
            } catch (error) {
                console.error(error);
                appendMessage('Error occurred while fetching the response.', 'bot');
            }
        }

        function appendMessage(message, sender) {
            const chatbox = document.getElementById('chatbox');
            const msgElement = document.createElement('p');
            //msgElement.classList = sender === 'user' ? 'text-right' : 'text-left text-success';
            msgElement.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
            msgElement.innerText = message;
            chatbox.appendChild(msgElement);

            // Scroll to the bottom
            chatbox.scrollTop = chatbox.scrollHeight;
        }
   