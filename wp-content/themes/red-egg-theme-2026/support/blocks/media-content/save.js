/**
 * Media Content Block – Save Component (Parent)
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';
import BlobAnimation from '../../components/BlobAnimation.js';

const SaveMediaContent = ( { attributes } ) => {
    const {
        contentAlign, image, bgSlug,
        padding, margin, blockId, blobEnabled, blobShape, blobSpeed, blobPosition
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
        className: 'media-content'
            + ' ' + contentAlign
            + ( bgSlug ? ' ' + bgSlug + ' with-bg' : '' ),
        style: bgStyle,
    } );

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            
            <div { ...blockProps }>
                <BlobAnimation.View
                    blobSpeedblobEnabled={ blobEnabled }
                    blobShape={ blobShape }
                    blobSpeed={ blobSpeed }
                    blobPosition={ blobPosition }
                />
                <div className="block-wrapper">
                    <div className={ 'block-content ' + contentAlign }>
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SaveMediaContent;
