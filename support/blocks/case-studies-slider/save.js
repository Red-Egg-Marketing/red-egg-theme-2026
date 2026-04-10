/**
 * Case Studies Slider Block – Save Component
 * 
 * Outputs the static shell + a root element for frontend.js
 * to hydrate with dynamic case study data from the API.
 */

const { RichText, useBlockProps } = wp.blockEditor;

import { getPaddingClasses } from '../../components/Padding';
import { getMarginClasses } from '../../components/Margin';

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

    const paddingClasses = getPaddingClasses( padding );
    const marginClasses = getMarginClasses( margin );

    const blockProps = useBlockProps.save( {
        className: `case-studies-slider ${ paddingClasses } ${ marginClasses }`.trim(),
    } );

    return (
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
    );
};

export default SaveCaseStudiesSlider;
