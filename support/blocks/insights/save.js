/**
 * Insights Block – Save Component
 * 
 * Outputs the static header + a root element for
 * frontend.js to hydrate with resource post data.
 */

const { RichText, useBlockProps } = wp.blockEditor;

import { getPaddingClasses } from '../../components/Padding';
import { getMarginClasses } from '../../components/Margin';

const SaveInsights = ( { attributes } ) => {
    const {
        sectionLabel,
        heading,
        postsToShow,
        padding,
        margin,
    } = attributes;

    const paddingClasses = getPaddingClasses( padding );
    const marginClasses = getMarginClasses( margin );

    const blockProps = useBlockProps.save( {
        className: `insights-block ${ paddingClasses } ${ marginClasses }`.trim(),
    } );

    return (
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
    );
};

export default SaveInsights;
