/**
 * Media Content – Text Block – Edit Component
 *
 * InnerBlocks for header-intro, paragraphs, buttons.
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

const template = [
    [ 'red-egg-block/header-intro', {} ],
    [ 'core/paragraph', { placeholder: 'Section description...' } ],
    [ 'core/buttons', {}, [
        [ 'core/button', { placeholder: 'CTA...' } ],
    ] ],
];

const allowedBlocks = [
    'red-egg-block/header-intro',
    'core/heading',
    'core/paragraph',
    'core/list',
    'core/buttons',
    'core/image',
];

const EditMediaContentText = () => {
    const blockProps = useBlockProps( {
        className: 'media-content__text content-columns column',
    } );

    return (
        <div { ...blockProps }>
            <div className="wrap">
                <InnerBlocks
                    template={ template }
                    allowedBlocks={ allowedBlocks }
                />
            </div>
        </div>
    );
};

export default EditMediaContentText;
