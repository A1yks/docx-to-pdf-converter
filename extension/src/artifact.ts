const artifact = document.createElement('div');

artifact.style.position = 'fixed';
artifact.style.bottom = '7px';
artifact.style.right = '7px';
artifact.style.width = '20px';
artifact.style.height = '20px';
artifact.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
artifact.style.borderRadius = '50%';
artifact.style.zIndex = '1000';
artifact.style.cursor = 'pointer';
artifact.title = 'Click to open DOCX to PDF converter popup';

document.body.appendChild(artifact);

artifact.addEventListener('click', () => {
    if (chrome.runtime?.id) {
        chrome.runtime.sendMessage({ action: 'showPopup' });
    }
});
