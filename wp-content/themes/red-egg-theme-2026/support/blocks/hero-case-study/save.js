/**
 * Hero Block – Save Component
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveHeroCase = ( { attributes } ) => {
    const {
        image, vidOrImg, videoID, videoURL,
        overlay, padding, margin, blockId,
    } = attributes;

    // Build inline background styles
    const bgStyle = {};
    let bgImageSetCss = '';
    if ( image.url ) {
        if ( image.url2x ) {
            // image-set() for high-DPI/4K crispness without sending the
            // 2592px file to everyone. Backgrounds can't use srcset;
            // this is the CSS equivalent. Scoped to the inner image-wrap
            // (that's the element carrying the background here, not the
            // block wrapper). Layered fallback: url() -> -webkit- ->
            // standard.
            bgImageSetCss =
                `#${ blockId } .hero-block-image-wrap {`
                + ` background-image: url(${ image.url });`
                + ` background-image: -webkit-image-set(url(${ image.url }) 1x, url(${ image.url2x }) 2x);`
                + ` background-image: image-set(url(${ image.url }) 1x, url(${ image.url2x }) 2x);`
                + ` }`;
        } else {
            bgStyle.backgroundImage = `url(${ image.url })`;
        }
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
        className: 'hero-case-study' + ( overlay ? ' with-overlay' : '' ),
    } );

    return (
        <Fragment>
            { bgImageSetCss && (
                <style type="text/css">{ bgImageSetCss }</style>
            ) }
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <div { ...blockProps }>
                <div className="hero-block-image">
                    { image.url && vidOrImg === 'image' && (
                        <div className="hero-block-image-wrap" style={ bgStyle }></div>
                    ) }
                    { videoID && vidOrImg === 'video' && (
                        <video className="hero-asset" autoPlay playsInline muted loop>
                            <source src={ videoURL } className="hero-source" type="video/mp4" />
                        </video>
                    ) }
                </div>

                <div className="block-wrapper">
                    <div className="hero__content">
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SaveHeroCase;
