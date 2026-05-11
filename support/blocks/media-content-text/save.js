/**
 * Media Content – Text Block – Save Component
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

const SaveMediaContentText = () => {
    const blockProps = useBlockProps.save( {
        className: 'media-content__text content-columns column',
    } );

    return (
        <div { ...blockProps }>
            <div className="wrap">
                <InnerBlocks.Content />
            </div>
        </div>
    );
};

export default SaveMediaContentText;
