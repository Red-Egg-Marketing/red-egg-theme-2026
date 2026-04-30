/**
 * Hero Content – Save Component
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

const SaveHeroContent = () => {
    const blockProps = useBlockProps.save( {
        className: 'hero-background__content',
    } );

    return (
        <div { ...blockProps }>
            <InnerBlocks.Content />
        </div>
    );
};

export default SaveHeroContent;
