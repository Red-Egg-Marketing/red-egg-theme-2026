/**
 * Service List Block – Save Component
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';
import BlobAnimation from '../../components/BlobAnimation.js';

const SaveServiceList = ( { attributes } ) => {
    const {
        image, bgSlug, padding, margin, blockId,
        blobEnabled, blobShape, blobSpeed, blobPosition,
    } = attributes;

    // Build background inline styles
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
        className: 'service-list' + ( bgSlug ? ' ' + bgSlug + ' with-bg' : '' ),
        style: bgStyle,
    } );

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <section { ...blockProps }>
                <div className="block-wrapper">
                <BlobAnimation.View
                    blobEnabled={ blobEnabled }
                    blobShape={ blobShape }
                    blobSpeed={ blobSpeed }
                    blobPosition={ blobPosition }
                />
                    <InnerBlocks.Content />
                </div>
            </section>
        </Fragment>
    );
};

export default SaveServiceList;
