/**
 * Reveal Card Back (child) – Edit Component
 *
 * Pure InnerBlocks: an accent heading plus a list (or paragraphs).
 * Seeded with the "BRANDING → service list" pattern from the design.
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

const template = [
    [ 'core/heading', { level: 4, placeholder: 'Back heading…' } ],
    [ 'core/list', {} ],
];

const allowedBlocks = [ 'core/heading', 'core/list', 'core/paragraph' ];

const EditRevealCardBack = () => {
    const blockProps = useBlockProps( {
        className: 'reveal-card__face reveal-card__face--back',
    } );

    return (
        <div { ...blockProps }>
            <div className="reveal-card__back-scroll">
                <div className="reveal-card__back-inner">
                    <InnerBlocks
                        template={ template }
                        templateLock={ false }
                        allowedBlocks={ allowedBlocks }
                    />
                </div>
            </div>
        </div>
    );
};

export default EditRevealCardBack;
