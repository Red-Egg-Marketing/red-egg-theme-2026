/**
 * Awards Section Block – Save Component
 *
 * Outputs Swiper-ready markup with award images as slides.
 * Each slide has a badge image and caption.
 * Frontend JS initializes the Swiper instance.
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveAwardsSection = ( { attributes } ) => {
    const { bgSlug, awards, slidesPerView, spaceBetween, withCards, padding, margin, blockId } = attributes;

    const blockProps = useBlockProps.save( {
        id: blockId,
        className: 'awards-section' + ( bgSlug ? ' ' + bgSlug : '' ) + ( withCards ? ' with-cards' : '' ),
    } );

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <section { ...blockProps }>
                <div className="block-wrapper">
                    <div className="awards-section__header">
                        <InnerBlocks.Content />
                    </div>

                    { awards && awards.length > 0 && (
                        <div className="awards-section__slider-wrap">
                            <div
                                className="awards-section__swiper swiper"
                                data-slides-per-view={ slidesPerView }
                                data-space-between={ spaceBetween }
                            >
                                <div className="swiper-wrapper">
                                    { awards.map( ( award, i ) => (
                                        <div className="swiper-slide" key={ award.id || i }>
                                            <div className="awards-section__award">
                                                <div className="awards-section__award-img">
                                                    <img
                                                        src={ award.url }
                                                        alt={ award.alt }
                                                        loading="lazy"
                                                    />
                                                </div>
                                                { award.caption && (
                                                    <p className="awards-section__award-caption">
                                                        { award.caption }
                                                    </p>
                                                ) }
                                            </div>
                                        </div>
                                    ) ) }
                                </div>
                                <div className="awards-section__nav">
                                    <div className="swiper-button-prev"></div>
                                    <div className="swiper-button-next"></div>
                                </div>
                            </div>
                        </div>
                    ) }
                </div>
            </section>
        </Fragment>
    );
};

export default SaveAwardsSection;
