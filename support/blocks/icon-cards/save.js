const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps, RichText } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveIconCards = ( { attributes } ) => {
    const { eyebrow, heading, columns, bgColor, bgSlug, padding, margin } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'icon-cards' + ( bgSlug ? ' ' + bgSlug : '' ),
    } );
    const blockId = blockProps.id;
    const bgStyle = bgColor ? { backgroundColor: bgColor } : {};

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <div { ...blockProps } style={ bgStyle }>
                <div className="block-wrapper">
                    <div className="icon-cards-header">
                        { eyebrow && (
                            <RichText.Content
                                tagName="span"
                                className="icon-cards-eyebrow"
                                value={ eyebrow }
                            />
                        ) }
                        { heading && (
                            <RichText.Content
                                tagName="h2"
                                className="icon-cards-heading"
                                value={ heading }
                            />
                        ) }
                    </div>
                    <div className={ 'icon-cards-grid cols-' + columns }>
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SaveIconCards;
