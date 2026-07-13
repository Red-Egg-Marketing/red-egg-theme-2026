const { InnerBlocks, useBlockProps } = wp.blockEditor;

const template = [
    [ 'gravityforms/form', {} ],
];

const allowedBlocks = [
    'gravityforms/form',
    'core/shortcode',
    'core/html',
];

const EditContactForm = () => {
    const blockProps = useBlockProps( {
        className: 'contact-section__right',
    } );

    return (
        <div { ...blockProps }>
            <InnerBlocks
                template={ template }
                allowedBlocks={ allowedBlocks }
            />
        </div>
    );
};

export default EditContactForm;
