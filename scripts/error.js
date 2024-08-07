document.addEventListener('DOMContentLoaded', function () {
    const bits = document.querySelectorAll('.bit');
    const asciiChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:",.<>?/`~';

    function getRandomAsciiChar() {
        return asciiChars.charAt(Math.floor(Math.random() * asciiChars.length));
    }

    function flipBit(bit) {
        bit.classList.add('flipping');
        setTimeout(() => {
            bit.textContent = Math.random() > 0.5 ? getRandomAsciiChar() : (bit.textContent === '0' ? '1' : '0');
            bit.classList.remove('flipping');
        }, 500);
    }

    function randomFlip() {
        bits.forEach(bit => {
            if (Math.random() > 0.7) { // Adjust probability to control how often bits flip
                flipBit(bit);
            }
        });
    }

    setInterval(randomFlip, 200); // Adjust interval for how often flips are checked
});
