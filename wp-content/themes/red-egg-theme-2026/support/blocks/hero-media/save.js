/**
 * Hero Media – Save Component
 */

const { Fragment } = wp.element;
const { useBlockProps } = wp.blockEditor;
import { buildSrcSet, resolveOverride } from '../../components/mediaSizes.js';

const SaveHeroMedia = ( { attributes } ) => {
    const { mediaType, media, videoID, videoURL, videothumb, eggCount, eggTouchBehavior } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'hero-background__media',
    } );

    const eggs = [];
    if ( mediaType === 'eggs' ) {
        for ( let i = 1; i <= eggCount; i++ ) {
            eggs.push(
                <span className={ 'egg-cluster__egg egg-cluster__egg--' + i } key={ i }>
                    <span className="egg-cluster__layer egg-cluster__layer--white"></span>
                    <span className="egg-cluster__layer egg-cluster__layer--red"></span>
                </span>
            );
        }
    }

    return (
        <div { ...blockProps }>
            { mediaType === 'image' && media.url && (
                <img
                    className="hero-background__media-img"
                    src={ resolveOverride( media.sizeOverride, media.sizeUrls, media.source || media.url ) }
                    srcSet={ media.sizeOverride ? '' : buildSrcSet( media.srcset ) }
                    sizes={ media.sizeOverride ? '' : '(min-width: 880px) 50vw, 100vw' }
                    alt={ media.alt }
                    loading="lazy"
                />
            ) }
            { mediaType === 'video' && videoID && (
                <video
                    className="hero-background__media-video"
                    autoPlay
                    playsInline
                    muted
                    loop
                    poster={ videothumb && videothumb.url ? videothumb.url : '' }
                >
                    <source src={ videoURL } type="video/mp4" />
                </video>
            ) }
            { mediaType === 'eggs' && (
                <div
                    className={ 'egg-cluster egg-cluster--count-' + eggCount
                        + ( eggTouchBehavior === 'auto-cycle' ? ' egg-cluster--touch-cycle' : '' ) }
                    aria-hidden="true"
                >
                    { eggs }
                </div>
            ) }
        </div>
    );
};

export default SaveHeroMedia;
