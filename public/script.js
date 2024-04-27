
function buttom(){
async () => {
    const inputElement = document.getElementById('chat-input');
    const chatBox = document.getElementById('chat-box');
    const message = inputElement.value;
    inputElement.value = ''; // Limpiar el input

    // Mostrar el mensaje enviado en el chat
    chatBox.innerHTML += `<div> Yo: ${message}</div>`;
    try {
        const response = await fetch('/enviar-mensaje', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (response.ok) {
            const data = await response.json();
            chatBox.innerHTML += `<div>AssistantsAI: ${data.message}</div>`;
        } else {
            console.error('Error en la respuesta del servidor');
        }
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
    }
}}