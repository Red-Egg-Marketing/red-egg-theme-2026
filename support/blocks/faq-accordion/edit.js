/**
 * FAQ Accordion Block – Edit Component
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

const TEMPLATE = [
    [ 'red-egg-block/accordion-item', {} ],
    [ 'red-egg-block/accordion-item', {} ],
    [ 'red-egg-block/accordion-item', {} ],
];

const ALLOWED = [ 'red-egg-block/accordion-item' ];

const EditFaqAccordion = () => {
    const blockProps = useBlockProps( {
        className: 'faq-accordion',
    } );

    return (
        <div { ...blockProps }>
            <InnerBlocks
                template={ TEMPLATE }
                allowedBlocks={ ALLOWED }
                orientation="vertical"
            />
        </div>
    );
};

export default EditFaqAccordion;
