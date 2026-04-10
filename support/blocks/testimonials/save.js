/**
 * Testimonials Block – Save Component
 * 
 * Outputs the static header + a root element for
 * frontend.js to hydrate with review data.
 */

const { RichText, useBlockProps } = wp.blockEditor;

import { getPaddingClasses } from '../../components/Padding';
import { getMarginClasses } from '../../components/Margin';

const SaveTestimonials = ( { attributes } ) => {
    const {
        sectionLabel,
        heading,
        postsToShow,
        truncateLength,
        padding,
        margin,
    } = attributes;

    const paddingClasses = getPaddingClasses( padding );
    const marginClasses = getMarginClasses( margin );

    const blockProps = useBlockProps.save( {
        className: `testimonials-block ${ paddingClasses } ${ marginClasses }`.trim(),
    } );

    return (
        <section { ...blockProps }>
            <div className="testimonials-block__bg"></div>
            <div className="testimonials-block__pattern"></div>
            <div className="block-wrapper">
                <div className="testimonials-block__header">
                    <RichText.Content
                        tagName="p"
                        className="testimonials-block__label"
                        value={ sectionLabel }
                    />
                    <RichText.Content
                        tagName="h2"
                        className="testimonials-block__heading"
                        value={ heading }
                    />
                </div>

                <div
                    id="TestimonialsSliderRoot"
                    data-posts-to-show={ postsToShow }
                    data-truncate-length={ truncateLength }
                ></div>
            </div>
        </section>
    );
};

export default SaveTestimonials;
