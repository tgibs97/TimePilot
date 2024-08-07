document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.menu-item');
    let selectedIdx = 0;

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

    function updateSelection() {
        menuItems.forEach((item, index) => {
            if (index === selectedIdx) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
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
                if (pageMappings[selectedItemId]) {
                    window.location.href = pageMappings[selectedItemId];
                }
                break;
        }
    }

    updateSelection();
    document.addEventListener('keydown', handleKeydown);
});
