/**
 * Accordion Item Block – Save Component
 *
 * The trigger is a real <button> for accessibility; the panel
 * starts collapsed (max-height:0 via CSS) and is opened by
 * faq-accordion/frontend.js.
 */

const { RichText, InnerBlocks, useBlockProps } = wp.blockEditor;

const SaveAccordionItem = ( { attributes } ) => {
    const { question } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'faq-accordion__item',
    } );

    return (
        <div { ...blockProps }>
            <button className="faq-accordion__trigger" type="button" aria-expanded="false">
                <RichText.Content
                    tagName="span"
                    className="faq-accordion__question"
                    value={ question }
                />
                <span className="faq-accordion__icon" aria-hidden="true"></span>
            </button>
            <div className="faq-accordion__panel">
                <div className="faq-accordion__panel-inner">
                    <InnerBlocks.Content />
                </div>
            </div>
        </div>
    );
};

export default SaveAccordionItem;
