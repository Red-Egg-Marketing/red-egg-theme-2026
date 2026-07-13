/**
 * FAQ Accordion Block – Save Component
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

const SaveFaqAccordion = () => {
    const blockProps = useBlockProps.save( {
        className: 'faq-accordion',
    } );

    return (
        <div { ...blockProps }>
            <InnerBlocks.Content />
        </div>
    );
};

export default SaveFaqAccordion;
