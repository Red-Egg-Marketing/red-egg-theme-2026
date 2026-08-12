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
    const { reviewMode, reviewId, reviewIds, reviewSort, padding, margin, blockId } = attributes;

    const blockProps = useBlockProps.save( {
        id: blockId,
        className: 'testimonials-block',
    } );

    // Only serialize data-review-sort when it's non-default so existing
    // content stays valid (frontend treats a missing attr as 'date').
    const rootProps = {
        className: 'testimonials-block__root',
        'data-review-mode': reviewMode,
        'data-review-id': reviewId || '',
        'data-review-ids': JSON.stringify( reviewIds || [] ),
    };
    if ( reviewSort && reviewSort !== 'date' ) {
        rootProps['data-review-sort'] = reviewSort;
    }

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
                    <div { ...rootProps }></div>
                </div>
            </section>
        </Fragment>
    );
};

export default SaveTestimonials;
