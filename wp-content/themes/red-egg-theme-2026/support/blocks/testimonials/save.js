/**
 * Testimonials Block – Save Component
 *
 * Static save: section chrome + header InnerBlocks, plus a
 * hydration root carrying the reviews source config via data
 * attributes. frontend.js fetches the reviews and renders the
 * cards / Swiper slider.
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveTestimonials = ( { attributes } ) => {
    const { reviewMode, reviewId, reviewIds, padding, margin, blockId } = attributes;

    const blockProps = useBlockProps.save( {
        id: blockId,
        className: 'testimonials-block',
    } );

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <section { ...blockProps }>
                <div className="testimonials-block__bg"></div>
                <div className="testimonials-block__pattern"></div>
                <div className="block-wrapper">
                    <div className="testimonials-block__header">
                        <InnerBlocks.Content />
                    </div>
                    <div
                        className="testimonials-block__root"
                        data-review-mode={ reviewMode }
                        data-review-id={ reviewId || '' }
                        data-review-ids={ JSON.stringify( reviewIds || [] ) }
                    ></div>
                </div>
            </section>
        </Fragment>
    );
};

export default SaveTestimonials;
