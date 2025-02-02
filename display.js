function display(type, text, placeholder = '') {
    return new Promise((resolve) => {
        // Create modal elements
        const modal = document.createElement('div');
        modal.style.display = 'flex';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';

        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = 'white';
        modalContent.style.padding = '20px';
        modalContent.style.borderRadius = '5px';
        modalContent.style.textAlign = 'center';

        // Configure modal behavior
        if (type === 'prompt') {
            confirmBtn.style.display = 'inline-block';
            alertMsg.style.display = 'none';
            okBtn.style.display = 'none';

            // Create prompt elements
            const modalTitle = document.createElement('h2');
            modalTitle.textContent = text;
            
            const modalInput = document.createElement('input');
            modalInput.type = 'text';
            modalInput.placeholder = placeholder;
            modalInput.style.marginBottom = '10px';

            const confirmBtn = document.createElement('button');
            confirmBtn.textContent = 'Confirm';
            modalContent.appendChild(modalTitle);
            modalContent.appendChild(modalInput);
            modalContent.appendChild(confirmBtn);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);

            confirmBtn.onclick = function() {
                const value = modalInput.value;
                document.body.removeChild(modal);
                resolve(value);
            };

            modalInput.onkeyup = (e) => {
                if (e.key === 'Enter') {
                    const value = modalInput.value;
                    document.body.removeChild(modal);
                    resolve(value);
                }
            };
        } else if (type === 'alert') {
            alertMsg.style.display = 'block';
            okBtn.style.display = 'inline-block';

            // Create alert elements
            const alertMsg = document.createElement('h3');
            alertMsg.textContent = placeholder;

            const okBtn = document.createElement('button');
            okBtn.textContent = 'OK';
            okBtn.onclick = function() {
                document.body.removeChild(modal);
                resolve();
            };

            modalContent.appendChild(alertMsg);
            modalContent.appendChild(okBtn);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);

            modal.onkeyup = (e) => {
                if (e.key === 'Enter') {
                    document.body.removeChild(modal);
                }
            };
        }
    });
}
