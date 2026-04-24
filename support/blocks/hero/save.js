/**
 * Hero Block – Save Component
 */

const { Fragment } = wp.element;
const { RichText, InnerBlocks, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveHero = ( { attributes } ) => {
    const {
        image, title, vidOrImg, videoID, videoURL,
        overlay, padding, margin, blockId,
    } = attributes;

    // Build inline background styles
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
        className: 'hero' + ( overlay ? ' with-overlay' : '' ),
    } );

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <div { ...blockProps }>
                <div className="block-wrapper">
                    <div className="hero__inner">
                        <div className="content-wrap">
                            <div className="hero-block-content">
                                <div className="hero-block-wrap">
                                    <RichText.Content
                                        tagName="h1"
                                        className="header-title"
                                        value={ title }
                                    />
                                </div>
                            </div>
                        </div>
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
                    </div>
                    <div className="hero-block-innerblocks">
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SaveHero;
