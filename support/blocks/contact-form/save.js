const { InnerBlocks, useBlockProps } = wp.blockEditor;

const SaveContactForm = () => {
    const blockProps = useBlockProps.save( {
        className: 'contact-section__right',
    } );

    return (
        <div { ...blockProps }>
            <InnerBlocks.Content />
        </div>
    );
};

export default SaveContactForm;
