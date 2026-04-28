/**
 * Image & Text Columns Block – Save Component
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import ImageComp from '../../components/ImageComp.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveImageTextColumns = ( { attributes } ) => {
    const {
        contentAlign, media, image, bgSlug,
        vidOrImg, videoID, videoURL, videothumb, withDrop,
        padding, margin, blockId,
    } = attributes;

    // Build background image inline styles
    const bgStyle = {};
    if ( image.url !== '' ) {
        bgStyle.backgroundImage = 'url(' + image.url + ')';
        bgStyle.backgroundRepeat = image.repeat || 'no-repeat';
        bgStyle.backgroundAttachment = image.attachment || 'scroll';
        bgStyle.backgroundSize = image.sizekey || 'cover';

        if ( image.bgkeyword === 'keyword' ) {
            bgStyle.backgroundPosition = image.position || 'center center';
        } else {
            const unit = image.bgunit || 'px';
            bgStyle.backgroundPosition = ( image.positionX || 0 ) + unit + ' ' + ( image.positionY || 0 ) + unit;
        }

        if ( image.sizekey === '' && image.size ) {
            bgStyle.backgroundSize = image.size + ( image.unit || '%' );
        }
    }

    const blockProps = useBlockProps.save( {
        id: blockId,
        className: 'image-text-columns'
            + ' ' + contentAlign
            + ( bgSlug ? ' ' + bgSlug + ' with-bg' : '' )
            + ( withDrop ? ' with-ds' : ' no-ds' ),
        style: bgStyle,
    } );

    const srcSet = '';
    const sizes = '(min-width: 880px) 100vw, 400px';

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <div { ...blockProps }>
                <div className="block-wrapper">
                    <div className={ 'block-content ' + contentAlign }>
                        <div className="image-col column">
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
            </div>
        </Fragment>
    );
};

export default SaveImageTextColumns;
