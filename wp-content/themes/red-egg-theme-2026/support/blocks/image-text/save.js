/**
 * Image & Text Columns Block – Save Component
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import ImageComp from '../../components/ImageComp.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';
import BlobAnimation from '../../components/BlobAnimation.js';

const SaveImageText = ( { attributes } ) => {
    const {
        contentAlign, stackOrder, columnwidth, media, image, bgColor, bgSlug,
        vidOrImg, videoID, videoURL, videothumb,
        padding, margin, blockId,
        blobEnabled, blobShape, blobSpeed, blobPosition,
    } = attributes;

    // Build background styles
    const bgStyle = {};
    if ( image.url ) {
        bgStyle.backgroundImage = `url(${ image.url })`;
        bgStyle.backgroundRepeat = image.repeat || 'no-repeat';
        bgStyle.backgroundAttachment = image.attachment || 'scroll';
        bgStyle.backgroundSize = image.sizekey || 'cover';
        if ( image.bgkeyword === 'keyword' ) {
            bgStyle.backgroundPosition = image.position || 'center center';
        } else {
            const unit = image.bgunit || 'px';
            bgStyle.backgroundPosition = `${ image.positionX || 0 }${ unit } ${ image.positionY || 0 }${ unit }`;
        }
        if ( image.sizekey === '' && image.size ) {
            bgStyle.backgroundSize = `${ image.size }${ image.unit || '%' }`;
        }
    }

    const blockProps = useBlockProps.save( {
        id: blockId,
        className: 'image-columns'
            + ' ' + contentAlign
            + ' ' + columnwidth
            + ' stack-' + stackOrder
            + ( bgSlug ? ' ' + bgSlug + ' with-bg' : '' )
            + ( blobEnabled ? ' has-blob' : '' ),
        style: bgStyle,
    } );

    // Build a real srcset from the stored registered-size URLs. Only
    // include entries that actually have a width (i.e. a real sized
    // image, not the full-size fallback). If nothing qualifies, srcSet
    // stays empty and ImageComp just serves `source`.
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
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <div { ...blockProps }>
               
                <div className={ `block-wrapper ${ contentAlign }` }>
                 <BlobAnimation.View
                    blobEnabled={ blobEnabled }
                    blobShape={ blobShape }
                    blobSpeed={ blobSpeed }
                    blobPosition={ blobPosition }
                />
                    <div className="image-col column">
                        { vidOrImg === 'image' && (
                            <ImageComp.View
                                source={ media.srcSet.large }
                                alt={ media.alt }
                                srcSet={ srcSet }
                                sizes={ sizes }
                            />
                        ) }
                        { videoID && vidOrImg === 'video' && (
                            <Fragment>
                                <button className="custom-video-button">Play</button>
                                <video className="hero-asset" poster={ videothumb.url } playsInline>
                                    <source src={ videoURL } className="source" type="video/mp4" />
                                </video>
                                <button className="custom-video-mute" aria-label="Mute video" aria-pressed="false">
                                    <i className="fa-light fa-volume-high custom-video-mute__icon-on"></i>
                                    <i className="fa-light fa-volume-slash custom-video-mute__icon-off"></i>
                                </button>
                            </Fragment>
                        ) }
                    </div>
                    <div className="content-columns column">
                        <div className="wrap">
                            <InnerBlocks.Content />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SaveImageText;
