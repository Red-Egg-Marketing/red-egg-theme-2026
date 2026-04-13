/**
 * Case Studies Slider Block – Save Component
 *
 * Outputs the static shell with data attributes.
 * Frontend.js hydrates the Swiper slider with API data.
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveCaseStudiesSlider = ( { attributes } ) => {
    const { industry, postsToShow, padding, margin, blockId } = attributes;

    const blockProps = useBlockProps.save( {
        id: blockId,
        className: 'case-studies-slider',
    } );

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <section { ...blockProps }>
                <div className="block-wrapper">
                    <div className="case-studies-slider__header">
                        <InnerBlocks.Content />
                    </div>

                    <div className="resources-wrap">
                        <div
                            id="CaseStudiesSliderRoot"
                            className="case-studies-swiper swiper"
                            data-posts-to-show={ postsToShow }
                            data-industry={ industry || '' }
                        ></div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default SaveCaseStudiesSlider;
