function log(val) {
		console.log(`[EBF Editor]: ${val}\nCounter: ${ln_num}`);
		ln_num++;
	}
	
	function _null(...vari) {
		for (const val of vari) {
			if (!val) { return true; log("Variable Null"); }
			else return false;
        }
	}
	
	function set(targ, type, content) {
		switch (type) {
			case 'text':
				if(_null(content, targ)) return;
				get(targ).textContent = content;
			case 'html':
				if (targ instanceof HTMLElement) {
			        get(targ).innerHTML = content;
			    } else return;
		}
	}

function createPromptModal(text, placeholder) {
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'prompt';
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 20;
        animation: fadeIn 0.3s ease;
    `;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 30px;
        border-radius: 8px;
        background: white;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 20;
        min-width: 350px;
        animation: slideIn 0.3s ease;
    `;

    const title = document.createElement('h2');
    title.id = 'title';
    title.style.cssText = `
        margin-top: 0;
        margin-bottom: 12px;
        color: #333;
    `;
    title.innerHTML = `${text} <span id="x" style="cursor: pointer; font-size: 24px;" title="Cancel">&times;</span>`;

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'p_text';
    input.autocomplete = 'off';
    input.style.cssText = `
        border: 2px solid #ccc;
        width: 327px;
        padding: 10px;
        margin: 10px 3px;
        border-radius: 6px;
        margin-bottom: 20px;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
    `;

    input.addEventListener('focus', () => {
        input.style.borderColor = '#007bff';
        input.style.boxShadow = '0 0 0 1.5px rgba(0, 123, 255, 0.5)';
    });

    input.addEventListener('blur', () => {
        input.style.borderColor = '#ccc';
        input.style.boxShadow = 'none';
    });

    if (placeholder) {
        input.value = placeholder;
    }

    const confirm = document.createElement('button');
    confirm.id = 'conf';
    confirm.title = 'Set';
    confirm.style.cssText = `
        padding: 10px 20px;
        margin: 5px;
        border: none;
        border-radius: 6px;
        background: linear-gradient(to right, #007bff, #0056b3);
        color: white;
        cursor: pointer;
    `;

    confirm.innerText = 'Confirm';

    confirm.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
        resolve(input.value);
    });

    modal.appendChild(title);
    modal.appendChild(input);
    modal.appendChild(confirm);
    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);

    return new Promise((resolve, reject) => {
        modalOverlay.style.display = 'flex';
        input.focus();

        const closeModal = () => {
            modalOverlay.style.display = 'none';
            reject(new Error('Modal closed.'));
        };

        document.getElementById('x').addEventListener('click', closeModal);
        input.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                closeModal();
                resolve(input.value);
            }
        });
    });
}
