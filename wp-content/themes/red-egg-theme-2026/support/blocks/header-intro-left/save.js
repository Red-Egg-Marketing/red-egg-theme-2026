/**
 * Header Intro Left – Save Component
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

const SaveHeaderIntroLeft = () => {
    const blockProps = useBlockProps.save( {
        className: 'header-intro__left',
    } );

    return (
        <div { ...blockProps }>
            <InnerBlocks.Content />
        </div>
    );
};

export default SaveHeaderIntroLeft;
