/**
 * Media Content – Media Block – Save Component
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import ImageComp from '../../components/ImageComp.js';
import { buildSrcSet, resolveOverride } from '../../components/mediaSizes.js';


const SaveMediaContentMedia = ( { attributes } ) => {
    const {
        media, vidOrImg, videoID, videoURL, videothumb, lightbox, melt
    } = attributes;

    const blockProps = useBlockProps.save( {
        className:
            'media-content__media image-col column' +
            ( vidOrImg === 'image' && melt ? ' has-melt' : '' ),
        'data-re-lightbox':
            vidOrImg === 'image' && lightbox ? 'single' : undefined,
    } );

    const srcSet = media.sizeOverride ? '' : buildSrcSet( media.srcset );
    const imgSource = resolveOverride( media.sizeOverride, media.sizeUrls, media.source );
    const sizes = media.sizeOverride ? '' : '(min-width: 880px) 50vw, 100vw';

    return (
        <div { ...blockProps }>
            { vidOrImg === 'image' && (
                <ImageComp.View
                    source={ imgSource }
                    alt={ media.alt || '' }
                    srcSet={ srcSet }
                    sizes={ sizes }
                />
            ) }
            { vidOrImg === 'video' && videoID && (
                <Fragment>
                    <button className="custom-video-button">Play</button>
                    <video
                        className="hero-asset"
                        poster={ videothumb.url }
                        playsInline
                    >
                        <source src={ videoURL } className="source" type="video/mp4" />
                    </video>
                    <button className="custom-video-mute" aria-label="Mute video" aria-pressed="false">
                        <i className="fa-light fa-volume-high custom-video-mute__icon-on"></i>
                        <i className="fa-light fa-volume-slash custom-video-mute__icon-off"></i>
                    </button>
                </Fragment>
            ) }
        </div>
    );
};

export default SaveMediaContentMedia;
