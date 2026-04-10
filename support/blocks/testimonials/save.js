/**
 * Testimonials Block – Save Component
 * 
 * Outputs the static header + a root element for
 * frontend.js to hydrate with review data.
 */

const { Fragment } = wp.element;
const { RichText, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveTestimonials = ( { attributes } ) => {
    const {
        sectionLabel,
        heading,
        postsToShow,
        truncateLength,
        padding,
        margin,
    } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'testimonials-block',
    } );

    const blockId = blockProps.id;

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
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
        </Fragment>
    );
};

export default SaveTestimonials;