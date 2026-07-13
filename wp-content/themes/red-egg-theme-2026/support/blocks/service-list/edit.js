/**
 * Service List Block – Edit Component
 *
 * InnerBlocks: core/heading + service-list-item children.
 * BlobAnimation support for decorative morphing blob.
 */

const { Fragment, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

import BackgroundColor from '../../components/BackgroundColor.js';
import BackgroundSelector from '../../components/BackgroundSelector.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';
import BlobAnimation from '../../components/BlobAnimation.js';

const template = [
    [ 'core/heading', { level: 2, placeholder: 'Branding Services' } ],
    [ 'red-egg-block/service-list-item', {} ],
    [ 'red-egg-block/service-list-item', {} ],
    [ 'red-egg-block/service-list-item', {} ],
    [ 'red-egg-block/service-list-item', {} ],
];

const allowedBlocks = [
    'core/heading',
    'red-egg-block/service-list-item',
];

const EditServiceList = ( { attributes, setAttributes, clientId } ) => {
    const {
        image, bgColor, bgSlug, padding, margin, blockId,
        blobEnabled, blobShape, blobSpeed, blobPosition,
    } = attributes;

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

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

    if ( bgColor ) {
        bgStyle.backgroundColor = bgColor;
    }

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'service-list' + ( bgSlug ? ' ' + bgSlug + ' with-bg' : '' ),
        style: bgStyle,
    } );

    return (
        <Fragment>
            <InspectorControls>
                <BackgroundColor
                    bgColor={ bgColor }
                    bgSlug={ bgSlug }
                    setAttributes={ setAttributes }
                />
                <BackgroundSelector
                    image={ image }
                    setAttributes={ setAttributes }
                />
                <BlobAnimation.Controls
                    blobEnabled={ blobEnabled }
                    blobShape={ blobShape }
                    blobSpeed={ blobSpeed }
                    blobPosition={ blobPosition }
                    setAttributes={ setAttributes }
                />
            </InspectorControls>

            <PaddingSelector
                padding={ padding }
                id={ 'block-' + clientId }
                setAttributes={ setAttributes }
            />
            <MarginSelector
                margin={ margin }
                id={ 'block-' + clientId }
                setAttributes={ setAttributes }
            />

            <section { ...blockProps }>
                <BlobAnimation.Preview
                    blobEnabled={ blobEnabled }
                    blobShape={ blobShape }
                    blobPosition={ blobPosition }
                />
                <div className="block-wrapper">
                    <InnerBlocks
                        template={ template }
                        allowedBlocks={ allowedBlocks }
                    />
                </div>
            </section>
        </Fragment>
    );
};

export default EditServiceList;
