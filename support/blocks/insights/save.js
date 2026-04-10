/**
 * Insights Block – Save Component
 * 
 * Outputs the static header + a root element for
 * frontend.js to hydrate with resource post data.
 */

const { Fragment } = wp.element;
const { RichText, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveInsights = ( { attributes } ) => {
    const {
        sectionLabel,
        heading,
        postsToShow,
        padding,
        margin,
    } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'insights-block',
    } );

    const blockId = blockProps.id;

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
        <section { ...blockProps }>
            <div className="block-wrapper">
                <div className="insights-block__header">
                    <RichText.Content
                        tagName="p"
                        className="insights-block__label"
                        value={ sectionLabel }
                    />
                    <RichText.Content
                        tagName="h2"
                        className="insights-block__heading"
                        value={ heading }
                    />
                </div>

                <div
                    id="InsightsBlockRoot"
                    data-posts-to-show={ postsToShow }
                ></div>
            </div>
        </section>
        </Fragment>
    );
};

export default SaveInsights;