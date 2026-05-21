/**
 * Case Studies Slider Body – Save (Child)
 *
 * Outputs the hydration root div with data attributes.
 * Frontend.js renders the Swiper + bottom row.
 * InnerBlocks.Content outputs the editable button.
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

const SaveSliderBody = ( { attributes } ) => {
    const { industry, postsToShow, blockId } = attributes;

    const blockProps = useBlockProps.save( {
        id: blockId,
        className: 'case-studies-slider__body',
        'data-posts-to-show': postsToShow,
        'data-industry': industry || '',
    } );

    return (
        <div { ...blockProps }>
            <div className="cs-slider__swiper-wrap"></div>
            <div className="cs-slider__bottom">
                <div className="cs-slider__cta">
                    <InnerBlocks.Content />
                </div>
                <div className="cs-slider__nav">
                    <button className="cs-slider__nav-prev" aria-label="Previous slide">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5 2L3.5 7L8.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <button className="cs-slider__nav-next" aria-label="Next slide">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 2L10.5 7L5.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SaveSliderBody;
