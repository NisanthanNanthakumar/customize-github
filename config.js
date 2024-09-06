document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('username');
    const saveButton = document.getElementById('save');
    const statusDiv = document.getElementById('status');

    // Load saved username
    chrome.storage.sync.get(['username'], function(result) {
        usernameInput.value = result.username || '';
    });

    // Save username
    saveButton.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        if (username) {
            chrome.storage.sync.set({username: username}, function() {
                statusDiv.textContent = 'Username saved successfully!';
                setTimeout(() => {
                    window.close();
                }, 1500);
            });
        } else {
            statusDiv.textContent = 'Please enter a valid username.';
        }
    });
});