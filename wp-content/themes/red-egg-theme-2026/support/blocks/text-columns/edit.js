/**
 * Text Columns Block – Edit Component (Parent)
 *
 * Locked InnerBlocks container for two text-columns-col children.
 * InspectorControls for alignment, column split, background
 * color/image, blob animation, padding, margin.
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
    { label: __( 'Title Left', 'red-egg' ), value: 'title-left' },
    { label: __( 'Title Right', 'red-egg' ), value: 'title-right' },
];

const splitOptions = [
    { label: __( '40 / 60', 'red-egg' ), value: '40-60' },
    { label: __( '50 / 50', 'red-egg' ), value: '50-50' },
    { label: __( '60 / 40', 'red-egg' ), value: '60-40' },
];

const template = [
    [ 'red-egg-block/text-columns-col', {}, [
        [ 'core/paragraph', { className: 'text-columns__eyebrow', placeholder: 'WHAT WE BELIEVE' } ],
        [ 'core/heading', { level: 2, placeholder: 'Our Philosophy is Simple' } ],
    ] ],
    [ 'red-egg-block/text-columns-col', {}, [
        [ 'core/paragraph', { className: 'text-columns__lead', placeholder: 'Lead paragraph…' } ],
        [ 'core/paragraph', { placeholder: 'Supporting copy…' } ],
    ] ],
];

const allowedBlocks = [ 'red-egg-block/text-columns-col' ];

const EditTextColumns = ( { attributes, setAttributes, clientId } ) => {
    const {
        contentAlign, colSplit, image, bgColor, bgSlug,
        padding, margin, blockId, blobEnabled, blobShape, blobSpeed, blobPosition,
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
        className: 'text-columns'
            + ' ' + contentAlign
            + ' split-' + colSplit
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
                    <SelectControl
                        label={ __( 'Column Split', 'red-egg' ) }
                        help={ __( 'Title column / content column width.', 'red-egg' ) }
                        value={ colSplit }
                        options={ splitOptions }
                        onChange={ ( val ) => setAttributes( { colSplit: val } ) }
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
                <BlobAnimation.Preview
                    blobEnabled={ blobEnabled }
                    blobShape={ blobShape }
                    blobPosition={ blobPosition }
                />
                <div className="block-wrapper">
                    <div className={ 'block-content ' + contentAlign }>
                        <InnerBlocks
                            template={ template }
                            allowedBlocks={ allowedBlocks }
                            templateLock="insert"
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditTextColumns;
