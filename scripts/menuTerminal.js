document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.menu-item');
    let selectedIdx = 0;

    const itemsToCheck = {
        'station-map': true,
        'diagnostics': null,
        'schedule': null,
        'roster': null,
        'comms': null,
        'controls': null,
        'back': true,
        'error': true
    };
    // Function to check LocalStorage and set defaults if not present
    function checkAndSetLocalStorage(obj) {
        for (const key in obj) {
            if (localStorage.getItem(key) === null || localStorage.getItem(key) === 'false') {
                if (obj[key]) {
                    localStorage.setItem(key, true);
                } else {
                    localStorage.setItem(key, false);
                }
            }
        }
    }

    function resetLocalStorage(obj) {
        for (const key in obj) {
            if (localStorage.getItem(key) === 'true') {
                if (obj[key]) {
                    localStorage.setItem(key, true);
                } else {
                    localStorage.setItem(key, false);
                }
            }
        }
    }

    // Call the function on page load
    checkAndSetLocalStorage(itemsToCheck);

    const pageMappings = {
        'station-map': 'map.html',
        'diagnostics': 'diagnostics.html',
        'schedule': 'schedule.html',
        'roster': 'roster.html',
        'comms': 'comms.html',
        'controls': 'controls.html',
        'back': 'mainMenu.html',
        'error': 'error.html'
    };

    const dataKeyInput = document.getElementById('dataKeyInput');
    const dataKeyInputContainer = document.getElementById('dataKeyInputContainer');
    const dataKeyH1 = document.getElementById('dataKeyH1');


    function updateSelection() {
        menuItems.forEach((item, index) => {
            if (index === selectedIdx) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });

        if (menuItems[selectedIdx].id === 'data-key-input') {
            dataKeyInputContainer.style.display = 'flex';
            dataKeyInput.style.display = 'inline-block';
            dataKeyInput.focus();
        } else {
            dataKeyInputContainer.style.display = 'none';
            dataKeyInput.style.display = 'none';

        }
    }

    function handleKeydown(event) {
        switch (event.key) {
            case 'ArrowUp':
                selectedIdx = (selectedIdx - 1 + menuItems.length) % menuItems.length;
                updateSelection();
                break;
            case 'ArrowDown':
                selectedIdx = (selectedIdx + 1) % menuItems.length;
                updateSelection();
                break;
            case 'Enter':
                const selectedItemId = menuItems[selectedIdx].id;
                if (selectedItemId == 'data-key-input') {
                    switch (dataKeyInput.value.toLowerCase()) {
                        case 'kpgnz':
                            localStorage.setItem('diagnostics', true);
                            dataKeyH1.innerHTML = 'DIAGNOSTICS RESTORED'
                            break;
                        case 'odhz':
                            localStorage.setItem('schedule', true);
                            dataKeyH1.innerHTML = 'SCHEDULE RESTORED'
                            break;
                        case 'hzhwzmn':
                            localStorage.setItem('roster', true);
                            dataKeyH1.innerHTML = 'ROSTER RESTORED'
                            break;
                        case 'kcjizcjhz':
                            localStorage.setItem('comms', true);
                            dataKeyH1.innerHTML = 'COMMS RESTORED'
                            break;
                        case 'mzywpooji':
                            localStorage.setItem('controls', true);
                            dataKeyH1.innerHTML = 'CONTROLS RESTORED'
                            break;
                        case 'reset':
                            resetLocalStorage(itemsToCheck);
                            dataKeyH1.innerHTML = 'VALUES RESET'
                            break;
                        default:
                            dataKeyH1.innerHTML = 'INVALID KEY'
                            break;
                    }
                }
                else if (pageMappings[selectedItemId] && localStorage.getItem(selectedItemId) === 'true') {
                    window.location.href = pageMappings[selectedItemId];
                } else {
                    window.location.href = 'error.html';
                }
                break;
        }
    }

    updateSelection();
    document.addEventListener('keydown', handleKeydown);
});
