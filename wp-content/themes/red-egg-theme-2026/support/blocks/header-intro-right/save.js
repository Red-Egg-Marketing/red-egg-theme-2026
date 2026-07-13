/**
 * Header Intro Right – Save Component
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

const SaveHeaderIntroRight = () => {
    const blockProps = useBlockProps.save( {
        className: 'header-intro__right',
    } );

    return (
        <div { ...blockProps }>
            <InnerBlocks.Content />
        </div>
    );
};

export default SaveHeaderIntroRight;
