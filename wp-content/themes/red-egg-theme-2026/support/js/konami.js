/*
 *  ┌──────────────────────────┐
 *  │   KONAMI CODE            │
 *  └──────────────────────────┘
 */

const konamiSequence = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
];

const konamiTarget = '/game/';

let konamiProgress = 0;
let konamiTimer    = null;

function handleKonamiKey(event) {
    // Leave form fields and editable regions alone.
    if (event.target.closest('input, textarea, select, [contenteditable="true"]')) {
        return;
    }

    const key      = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    const expected = konamiSequence[konamiProgress];

    if (key !== expected) {
        // A wrong key can still be the start of a fresh attempt.
        konamiProgress = key === konamiSequence[0] ? 1 : 0;
        return;
    }

    konamiProgress++;

    // Bail out if they stall mid-sequence.
    window.clearTimeout(konamiTimer);
    konamiTimer = window.setTimeout(() => {
        konamiProgress = 0;
    }, 3000);

    if (konamiProgress === konamiSequence.length) {
        konamiProgress = 0;
        window.clearTimeout(konamiTimer);
        window.location.href = konamiTarget;
    }

    console.log(
        '%cYou know what to do.\n%c↑ ↑ ↓ ↓ ← → ← → B A',
        'font-size: 12px; font-style: italic;',
        'font-size: 16px; font-weight: bold; letter-spacing: 2px; padding: 4px 0;'
    );
}

document.addEventListener('keydown', handleKonamiKey);