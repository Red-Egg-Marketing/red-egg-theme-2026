/**
 * Reveal Card Back (child) – Save Component
 *
 * The scroll viewport (clips overflow) wraps an inner element that
 * frontend.js translates vertically when the content overflows.
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

const SaveRevealCardBack = () => {
    const blockProps = useBlockProps.save( {
        className: 'reveal-card__face reveal-card__face--back',
    } );

    return (
        <div { ...blockProps }>
            <div className="reveal-card__back-scroll">
                <div className="reveal-card__back-inner">
                    <InnerBlocks.Content />
                </div>
            </div>
        </div>
    );
};

export default SaveRevealCardBack;
