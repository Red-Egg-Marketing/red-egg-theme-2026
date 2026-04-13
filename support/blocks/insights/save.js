/**
 * Insights Block – Save Component
 *
 * Outputs InnerBlocks header content + a root element
 * for frontend.js to hydrate with resource post data.
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveInsights = ( { attributes } ) => {
    const { category, postsToShow, bgColor, bgSlug, padding, margin, blockId } = attributes;

    const blockProps = useBlockProps.save( {
        id: blockId,
        className: 'insights-block' + ( bgSlug ? ' ' + bgSlug : '' ),
    } );

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <section { ...blockProps }>
                <div className="block-wrapper">
                    <header className="insights-block__header">
                        <InnerBlocks.Content />
                    </header>

                    <div
                        id="InsightsBlockRoot"
                        className="resources grid"
                        data-posts-to-show={ postsToShow }
                        data-category={ category || '' }
                    ></div>
                </div>
            </section>
        </Fragment>
    );
};

export default SaveInsights;
