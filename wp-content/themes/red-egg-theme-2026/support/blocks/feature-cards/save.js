/**
 * Feature Cards Block – Save Component
 */

const { Fragment } = wp.element;
const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveFeatureCards = ( { attributes } ) => {
    const { label, heading, bgSlug, padding, margin, blockId } = attributes;

    const blockProps = useBlockProps.save( {
        id: blockId,
        className: 'feature-cards' + ( bgSlug ? ' ' + bgSlug : '' ),
    } );

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <section { ...blockProps }>
                <div className="block-wrapper">
                    { label && (
                        <RichText.Content
                            tagName="p"
                            className="feature-cards__label"
                            value={ label }
                        />
                    ) }
                    { heading && (
                        <RichText.Content
                            tagName="h2"
                            className="feature-cards__heading"
                            value={ heading }
                        />
                    ) }
                    <div className="feature-cards__grid">
                        <InnerBlocks.Content />
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default SaveFeatureCards;
