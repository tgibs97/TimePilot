import Terminal from './terminal.js';
import { http } from './http.js';

/**
 * Primary class that runs the game through initial set up of the Terminal object.
 * This object persists throughout all game plays.
 *
 * @class Game
 */
class Game {
    constructor() {
        // get the words from firebase and start the game
        http.getWords().then(words => {
            this.terminal = new Terminal('.terminal-grid', words);


            // this event listener is called here to avoid multiple event listeners being created
            window.addEventListener('keyup', this.terminal.moveCursor.bind(this.terminal));

            // Start the game automatically
            this.startGame(new Event('load'));
        });
    }

    /**
     * Starts the game when the play button is clicked on.
     * Terminal will then clear all the innerHTML values of its components, reset its variables and rebuild
     *
     * @param {Event} event
     * @memberof Game
     */
    startGame(event) {
        event.preventDefault();
        const difficulty = 'master'; // document.querySelector('select').value;
        this.terminal.play(difficulty);
    }
}

(function () {

    // arrow key values from event.key
    const arrows = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight"
    ]

    // remove keyboard navigation
    window.addEventListener('keypress', (event) => {
        if (arrows.includes(event.key))
            event.preventDefault();
    });

    window.addEventListener('keydown', (event) => {
        if (arrows.includes(event.key))
            event.preventDefault();
    });

    // initialize game object
    new Game();
})();
