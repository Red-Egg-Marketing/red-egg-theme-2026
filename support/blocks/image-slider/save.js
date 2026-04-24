/**
 * Image Slider Block – Save Component
 *
 * Outputs Swiper-ready markup with images as slides.
 * Frontend JS initializes the Swiper instance.
 */

const { useBlockProps } = wp.blockEditor;

const SaveImageSlider = ( { attributes } ) => {
    const { images, slidesPerView, spaceBetween, blockId } = attributes;

    const blockProps = useBlockProps.save( {
        id: blockId,
        className: 'image-slider',
    } );

    if ( ! images || images.length === 0 ) {
        return null;
    }

    return (
        <div { ...blockProps }>
            <div
                className="image-slider__swiper swiper"
                data-slides-per-view={ slidesPerView }
                data-space-between={ spaceBetween }
            >
                <div className="swiper-wrapper">
                    { images.map( ( img, i ) => (
                        <div className="swiper-slide" key={ img.id || i }>
                            <div className="image-slider__slide">
                                <img
                                    src={ img.url }
                                    alt={ img.alt }
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    ) ) }
                </div>
                <div className="image-slider__nav">
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                </div>
            </div>
        </div>
    );
};

export default SaveImageSlider;
