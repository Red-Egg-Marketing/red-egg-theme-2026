/**
 * Media Content Block – Edit Component (Parent)
 *
 * Locked InnerBlocks container for media-content-media + media-content-text.
 * InspectorControls for alignment, background color/image, padding, margin.
 */

const { Fragment, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, SelectControl } = wp.components;
const { __ } = wp.i18n;

import BackgroundColor from '../../components/BackgroundColor.js';
import BackgroundSelector from '../../components/BackgroundSelector.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';
import BlobAnimation from '../../components/BlobAnimation.js';


const alignOptions = [
    { label: __( 'Image Right', 'red-egg' ), value: 'img-right' },
    { label: __( 'Image Left', 'red-egg' ), value: 'img-left' },
];

const template = [
    [ 'red-egg-block/header-intro', {} ],
    [ 'red-egg-block/media-content-media', {} ],
    [ 'red-egg-block/media-content-text', {} ],
];

const allowedBlocks = [
    'red-egg-block/media-content-media',
    'red-egg-block/media-content-text',
    'red-egg-block/header-intro',
];

const EditMediaContent = ( { attributes, setAttributes, clientId } ) => {
    const {
        contentAlign, image, bgColor, bgSlug,
        padding, margin, blockId, blobEnabled, blobShape, blobSpeed, blobPosition
    } = attributes;

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    // Build background image inline styles for editor preview
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
        className: 'media-content'
            + ' ' + contentAlign
            + ( bgSlug ? ' ' + bgSlug + ' with-bg' : '' ),
        style: bgStyle,
    } );

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody
                    title={ __( 'Layout', 'red-egg' ) }
                    initialOpen={ true }
                >
                    <SelectControl
                        label={ __( 'Content Alignment', 'red-egg' ) }
                        value={ contentAlign }
                        options={ alignOptions }
                        onChange={ ( val ) => setAttributes( { contentAlign: val } ) }
                    />
                </PanelBody>

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

            <div { ...blockProps }>
                
                <div className="block-wrapper">
                 <BlobAnimation.Preview
                    blobEnabled={ blobEnabled }
                    blobShape={ blobShape }
                    blobPosition={ blobPosition }
                />
                    <div className={ 'block-content ' + contentAlign }>
                        <InnerBlocks
                            template={ template }
                            allowedBlocks={ allowedBlocks }
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditMediaContent;
