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
                    <i className="fa-light fa-plus"></i>
                </span>
                <span className="reveal-card__toggle-icon reveal-card__toggle-icon--close">
                    <i className="fa-light fa-xmark"></i>
                </span>
            </button>
        </div>
    );
};

export default SaveRevealCard;
