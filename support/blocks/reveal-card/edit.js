/**
 * Reveal Card Block (parent) – Edit Component
 *
 * Renders the front + back child blocks unfolded (stacked) so
 * both sides are editable in place. The flip itself only happens
 * on the frontend. A static preview of the toggle button is shown
 * so the editor matches the finished card.
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

const template = [
    [ 'red-egg-block/reveal-card-front', {} ],
    [ 'red-egg-block/reveal-card-back', {} ],
];

const allowedBlocks = [
    'red-egg-block/reveal-card-front',
    'red-egg-block/reveal-card-back',
];

const EditRevealCard = ( { clientId } ) => {
    const blockId = `block-${ clientId }`;

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'reveal-card reveal-card--editing',
    } );

    return (
        <Fragment>
            <div { ...blockProps }>
                <div className="reveal-card__inner">
                    <InnerBlocks
                        template={ template }
                        templateLock="insert"
                        allowedBlocks={ allowedBlocks }
                    />
                </div>
                <button
                    type="button"
                    className="reveal-card__toggle"
                    aria-hidden="true"
                    tabIndex={ -1 }
                >
                    <span className="reveal-card__toggle-icon reveal-card__toggle-icon--open">
                        <i className="fa-light fa-plus"></i>
                    </span>
                    <span className="reveal-card__toggle-icon reveal-card__toggle-icon--close">
                        <i className="fa-light fa-xmark"></i>
                    </span>
                </button>
            </div>
        </Fragment>
    );
};

export default EditRevealCard;
