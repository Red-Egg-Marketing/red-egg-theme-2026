/**
 * Reveal Card Block (parent) – Save Component
 *
 * Outputs the 3D flip shell. The two child faces are rendered
 * by InnerBlocks.Content. The toggle button sits outside the
 * rotating inner so it stays put and just swaps its icon when
 * the card is flipped (handled by frontend.js).
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

const SaveRevealCard = () => {
    const blockProps = useBlockProps.save( {
        className: 'reveal-card',
    } );

    return (
        <div { ...blockProps }>
            <div className="reveal-card__inner">
                <InnerBlocks.Content />
            </div>
            <button
                type="button"
                className="reveal-card__toggle"
                aria-expanded="false"
                aria-label="Show details"
            >
                <span className="reveal-card__toggle-icon reveal-card__toggle-icon--open">
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 35C27.166 35 35 27.166 35 17.5C35 7.83398 27.166 0 17.5 0C7.83398 0 0 7.83398 0 17.5C0 27.166 7.83398 35 17.5 35ZM15.8594 25.1562V19.1406H9.84375V15.8594H15.8594V9.84375H19.1406V15.8594H25.1562V19.1406H19.1406V25.1562H15.8594Z" fill="#424042"/>
                    </svg>
                </span>
                <span className="reveal-card__toggle-icon reveal-card__toggle-icon--close">
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.12612 29.8749C11.961 36.7098 23.04 36.7098 29.8749 29.8749C36.7098 23.04 36.7098 11.9611 29.8749 5.12617C23.04 -1.70874 11.961 -1.70874 5.12612 5.12617C-1.70879 11.9611 -1.70878 23.04 5.12612 29.8749ZM10.9266 21.7542L15.1803 17.5005L10.9266 13.2468L13.2468 10.9267L17.5005 15.1803L21.7542 10.9267L24.0744 13.2468L19.8207 17.5005L24.0744 21.7542L21.7542 24.0744L17.5005 19.8207L13.2468 24.0744L10.9266 21.7542Z" fill="#424042"/>
                    </svg>
                </span>
            </button>
        </div>
    );
};

export default SaveRevealCard;
