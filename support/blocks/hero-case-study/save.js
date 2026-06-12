/**
 * Hero – Case Study Block – Save Component
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveHeroCaseStudy = ( { attributes } ) => {
    const {
        image, vidOrImg, videoID, videoURL,
        padding, margin, blockId,
    } = attributes;

    // Build background image inline styles
    const bgStyle = {};
    if ( image.url !== '' && vidOrImg === 'image' ) {
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
        className: 'hero-case-study',
        style: bgStyle,
    } );

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <section { ...blockProps }>
                <div className="hero-cs__overlay"></div>

                { vidOrImg === 'video' && videoID && (
                    <video className="hero-cs__video" autoPlay playsInline muted loop>
                        <source src={ videoURL } type="video/mp4" />
                    </video>
                ) }

                <div className="block-wrapper">
                    <div className="hero-cs__content">
                        <InnerBlocks.Content />
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default SaveHeroCaseStudy;
