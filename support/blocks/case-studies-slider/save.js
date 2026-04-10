/**
 * Case Studies Slider Block – Save Component
 * 
 * Outputs the static shell + a root element for frontend.js
 * to hydrate with dynamic case study data from the API.
 */

const { Fragment } = wp.element;
const { RichText, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveCaseStudiesSlider = ( { attributes } ) => {
    const {
        sectionLabel,
        heading,
        description,
        buttonText,
        buttonUrl,
        postsToShow,
        padding,
        margin,
    } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'case-studies-slider',
    } );

    const blockId = blockProps.id;

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
        <section { ...blockProps }>
            <div className="block-wrapper">
                <div className="case-studies-slider__header">
                    <div className="case-studies-slider__header-left">
                        <RichText.Content
                            tagName="p"
                            className="case-studies-slider__label"
                            value={ sectionLabel }
                        />
                        <RichText.Content
                            tagName="h2"
                            className="case-studies-slider__heading"
                            value={ heading }
                        />
                    </div>
                    <RichText.Content
                        tagName="p"
                        className="case-studies-slider__description"
                        value={ description }
                    />
                </div>

                {/* Frontend.js will render the slider inside this root */}
                <div
                    id="CaseStudiesSliderRoot"
                    data-posts-to-show={ postsToShow }
                ></div>

                <div className="case-studies-slider__footer">
                    <a href={ buttonUrl } className="btn-gray">
                        <span>{ buttonText }</span>
                        <span className="btn-arrow"></span>
                    </a>
                </div>
            </div>
        </section>
        </Fragment>
    );
};

export default SaveCaseStudiesSlider;