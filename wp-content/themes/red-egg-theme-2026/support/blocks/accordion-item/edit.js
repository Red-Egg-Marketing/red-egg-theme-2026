/**
 * Accordion Item Block – Edit Component
 *
 * In the editor the panel is always visible so content is editable.
 */

const { RichText, InnerBlocks, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

const ANSWER_TEMPLATE = [
    [ 'core/paragraph', { placeholder: __( 'Answer…', 'red-egg' ) } ],
];

const EditAccordionItem = ( { attributes, setAttributes } ) => {
    const { question } = attributes;

    const blockProps = useBlockProps( {
        className: 'faq-accordion__item is-open',
    } );

    return (
        <div { ...blockProps }>
            <div className="faq-accordion__trigger">
                <RichText
                    tagName="span"
                    className="faq-accordion__question"
                    value={ question }
                    onChange={ ( val ) => setAttributes( { question: val } ) }
                    placeholder={ __( 'Question…', 'red-egg' ) }
                    allowedFormats={ [] }
                />
                <span className="faq-accordion__icon" aria-hidden="true"></span>
            </div>
            <div className="faq-accordion__panel">
                <div className="faq-accordion__panel-inner">
                    <InnerBlocks template={ ANSWER_TEMPLATE } />
                </div>
            </div>
        </div>
    );
};

export default EditAccordionItem;
