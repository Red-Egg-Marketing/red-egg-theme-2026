/**
 * Image & Text Columns Block – Edit Component
 *
 * Two-column layout: image/video + InnerBlocks content.
 * Sidebar controls for alignment, media type, background,
 * drop shadow, padding, and margin.
 */

const { Fragment, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, MediaUpload, useBlockProps } = wp.blockEditor;
const { PanelBody, Button, SelectControl, ToggleControl, ResponsiveWrapper } = wp.components;
const { __ } = wp.i18n;

import ImageComp from '../../components/ImageComp.js';
import BackgroundColor from '../../components/BackgroundColor.js';
import BackgroundSelector from '../../components/BackgroundSelector.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const alignOptions = [
    { label: __( 'Image Right', 'red-egg' ), value: 'img-right' },
    { label: __( 'Image Left', 'red-egg' ), value: 'img-left' },
];

const vidImgOptions = [
    { label: __( 'Image', 'red-egg' ), value: 'image' },
    { label: __( 'Video', 'red-egg' ), value: 'video' },
];

const template = [
    [ 'core/heading', { level: 2, placeholder: 'Section Heading...' } ],
    [ 'core/paragraph', { placeholder: 'Section description...' } ],
    [ 'core/buttons', {}, [
        [ 'core/button', { placeholder: 'CTA...' } ],
    ] ],
];

const allowedBlocks = [
    'core/heading',
    'core/paragraph',
    'core/list',
    'core/buttons',
];

const EditImageTextColumns = ( { attributes, setAttributes, clientId } ) => {
    const {
        contentAlign, media, image, bgColor, bgSlug,
        vidOrImg, videoID, videoURL, videothumb, withDrop,
        padding, margin, blockId,
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
        className: 'image-text-columns'
            + ' ' + contentAlign
            + ( bgSlug ? ' ' + bgSlug + ' with-bg' : '' )
            + ( withDrop ? ' with-ds' : ' no-ds' ),
        style: bgStyle,
    } );

    // Media handlers
    const updateImageAttr = ( newMedia ) => {
        let large = newMedia.url;
        let medium = newMedia.sizes && newMedia.sizes['medium-small']
            ? newMedia.sizes['medium-small'].url
            : newMedia.url;

        setAttributes( {
            media: {
                srcSet: { large: large, medium: medium },
                id: newMedia.id,
                alt: newMedia.alt,
            },
        } );
    };

    const updateVideoAttr = ( newMedia ) => {
        setAttributes( {
            videoURL: newMedia.url,
            videoID: newMedia.id,
        } );
    };

    const setVideoThumb = ( newMedia ) => {
        let newThumb = JSON.parse( JSON.stringify( videothumb ) );
        newThumb.url = newMedia.url;
        newThumb.width = newMedia.width;
        newThumb.height = newMedia.height;
        setAttributes( { videothumb: newThumb } );
    };

    const removeVideoThumb = () => {
        setAttributes( {
            videothumb: { url: '', width: '', height: '' },
        } );
    };

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
                        label={ __( 'Media Type', 'red-egg' ) }
                        value={ vidOrImg }
                        options={ vidImgOptions }
                        onChange={ ( val ) => setAttributes( { vidOrImg: val } ) }
                    />
                    <ToggleControl
                        label={ __( 'Image Drop Shadow', 'red-egg' ) }
                        checked={ !! withDrop }
                        onChange={ () => setAttributes( { withDrop: ! withDrop } ) }
                    />
                </PanelBody>

                <BackgroundColor
                    bgColor={ bgColor }
                    bgSlug={ bgSlug }
                    setAttributes={ setAttributes }
                />

                { vidOrImg === 'image' && (
                    <BackgroundSelector
                        image={ image }
                        setAttributes={ setAttributes }
                    />
                ) }

                { vidOrImg === 'video' && (
                    <PanelBody
                        title={ __( 'Video Thumbnail', 'red-egg' ) }
                        initialOpen={ false }
                    >
                        <MediaUpload
                            allowedTypes={ [ 'image' ] }
                            onSelect={ setVideoThumb }
                            value={ videothumb.url }
                            render={ ( { open } ) => (
                                <Fragment>
                                    <Button
                                        variant="secondary"
                                        onClick={ open }
                                        style={ { marginBottom: '10px', display: 'block', width: '100%', height: 'auto' } }
                                    >
                                        { videothumb.url === '' && __( 'Add Video Thumbnail', 'red-egg' ) }
                                        { videothumb.url !== '' && (
                                            <ResponsiveWrapper
                                                naturalWidth={ videothumb.width }
                                                naturalHeight={ videothumb.height }
                                            >
                                                <img src={ videothumb.url } style={ { maxHeight: 'auto', width: 'auto' } } />
                                            </ResponsiveWrapper>
                                        ) }
                                    </Button>
                                    { videothumb.url !== '' && (
                                        <Button
                                            isDestructive
                                            isSmall
                                            onClick={ removeVideoThumb }
                                        >
                                            { __( 'Remove Thumbnail', 'red-egg' ) }
                                        </Button>
                                    ) }
                                </Fragment>
                            ) }
                        />
                    </PanelBody>
                ) }
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
                    <div className={ 'block-content ' + contentAlign }>
                        <div className="image-col column">
                            { vidOrImg === 'image' && (
                                <ImageComp
                                    id={ media.id }
                                    source={ media.srcSet.large }
                                    updateImageAttr={ updateImageAttr }
                                    alt={ media.alt || '' }
                                />
                            ) }
                            { vidOrImg === 'video' && (
                                <Fragment>
                                    <MediaUpload
                                        onSelect={ updateVideoAttr }
                                        allowedTypes={ [ 'video' ] }
                                        value={ videoID }
                                        render={ ( { open } ) => (
                                            <Button
                                                className="button"
                                                onClick={ open }
                                            >
                                                { __( 'Upload/Change Video', 'red-egg' ) }
                                            </Button>
                                        ) }
                                    />
                                    { videoID && (
                                        <video
                                            className="hero-asset"
                                            playsInline
                                            poster={ videothumb.url }
                                        >
                                            <source src={ videoURL } className="source" type="video/mp4" />
                                        </video>
                                    ) }
                                </Fragment>
                            ) }
                        </div>
                        <div className="content-columns column">
                            <div className="wrap">
                                <InnerBlocks
                                    template={ template }
                                    allowedBlocks={ allowedBlocks }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditImageTextColumns;
