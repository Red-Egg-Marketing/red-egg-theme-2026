/**
 * Image Slider Block – Save Component
 *
 * Outputs Swiper-ready markup with images as slides.
 * Uses centeredSlides with overflow visible for bleed effect.
 * Frontend JS initializes the Swiper instance.
 */

const { useBlockProps } = wp.blockEditor;
import { buildSrcSet, resolveOverride } from '../../components/mediaSizes.js';

const SaveImageSlider = ( { attributes } ) => {
    const { images, slidesPerView, spaceBetween, blockId, imageSizeOverride } = attributes;

    const blockProps = useBlockProps.save( {
        id: blockId,
        className: 'image-slider',
    } );

    if ( ! images || images.length === 0 ) {
        return null;
    }

    return (
        <div { ...blockProps }>
            <div className="image-slider__swiper-wrap">
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
                                        src={ resolveOverride( imageSizeOverride, img.sizeUrls, img.source || img.url ) }
                                        srcSet={ imageSizeOverride ? '' : buildSrcSet( img.srcset ) }
                                        sizes={ imageSizeOverride ? '' : '(min-width: 880px) 50vw, 100vw' }
                                        alt={ img.alt }
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        ) ) }
                    </div>
                </div>
            </div>
            <div className="cs-slider__nav">
                    <button className="cs-slider__nav-prev" aria-label="Previous slide">
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M35 17.5C35 7.83398 27.166 -6.84869e-07 17.5 -1.5299e-06C7.83399 -2.37493e-06 2.37493e-06 7.83398 1.5299e-06 17.5C6.84869e-07 27.166 7.83398 35 17.5 35C27.166 35 35 27.166 35 17.5ZM18.5254 9.22851C19.168 8.58594 20.207 8.58594 20.8428 9.22851C21.4785 9.87109 21.4854 10.9102 20.8428 11.5459L14.8955 17.4932L20.8428 23.4404C21.4854 24.083 21.4854 25.1221 20.8428 25.7578C20.2002 26.3936 19.1611 26.4004 18.5254 25.7578L11.416 18.6621C10.7734 18.0195 10.7734 16.9805 11.416 16.3447L18.5254 9.22851Z" fill="#424042"/>
                        </svg>
                    </button>
                    <button className="cs-slider__nav-next" aria-label="Next slide">
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 17.5C0 27.166 7.83398 35 17.5 35C27.166 35 35 27.166 35 17.5C35 7.83398 27.166 0 17.5 0C7.83398 0 0 7.83398 0 17.5ZM16.4746 25.7715C15.832 26.4141 14.793 26.4141 14.1572 25.7715C13.5215 25.1289 13.5146 24.0898 14.1572 23.4541L20.1045 17.5068L14.1572 11.5596C13.5146 10.917 13.5146 9.87793 14.1572 9.24219C14.7998 8.60645 15.8389 8.59961 16.4746 9.24219L23.584 16.3379C24.2266 16.9805 24.2266 18.0195 23.584 18.6553L16.4746 25.7715Z" fill="#424042"/>
                        </svg>
                    </button>
            </div>
        </div>
    );
};

export default SaveImageSlider;
