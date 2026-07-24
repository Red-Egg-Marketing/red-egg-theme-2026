/**
 * Media Content – Media Block – Save Component
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import ImageComp from '../../components/ImageComp.js';


const SaveMediaContentMedia = ( { attributes } ) => {
    const {
        media, vidOrImg, videoID, videoURL, videothumb
    } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'media-content__media image-col column',
    } );

    const ss = media.srcSet || {};
    const srcSetParts = [];
    if ( ss.medium && ss.mediumW ) {
        srcSetParts.push( ss.medium + ' ' + ss.mediumW + 'w' );
    }
    if ( ss.large && ss.largeW ) {
        srcSetParts.push( ss.large + ' ' + ss.largeW + 'w' );
    }
    const srcSet = srcSetParts.join( ', ' );
    const sizes = '(min-width: 880px) 50vw, 100vw';

    return (
        <div { ...blockProps }>
            { vidOrImg === 'image' && (
                <ImageComp.View
                    source={ media.srcSet.large }
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
