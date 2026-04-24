/**
 * Image & Text Columns Block – Edit Component
 *
 * Image/video column + InnerBlocks text column.
 * Alignment, column widths, background, drop shadow.
 */

const { Fragment, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, MediaUpload, useBlockProps } = wp.blockEditor;
const { PanelBody, SelectControl, ToggleControl, Button, ResponsiveWrapper } = wp.components;
const { __ } = wp.i18n;

import ImageComp from '../../components/ImageComp.js';
import BackgroundColor from '../../components/BackgroundColor.js';
import BackgroundSelector from '../../components/BackgroundSelector.js';
import ColumnsWidth from '../../components/ColumnsWidth.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const alignOptions = [
    { label: __( 'Image Left', 'red-egg' ), value: 'img-left' },
    { label: __( 'Image Right', 'red-egg' ), value: 'img-right' },
];

const VidImg = [
    { label: __( 'Image', 'red-egg' ), value: 'image' },
    { label: __( 'Video', 'red-egg' ), value: 'video' },
];

const template = [
    [ 'core/heading', { level: 2, placeholder: 'Section Header...' } ],
    [ 'core/paragraph', { placeholder: 'Section paragraph...' } ],
    [ 'core/buttons', {}, [
        [ 'core/button', { placeholder: 'CTA...' } ],
    ] ],
];

const allowBlocks = [
    'core/heading',
    'core/paragraph',
    'core/list',
    'core/buttons',
    'core/image',
    'core/spacer',
];

const EditImageText = ( { attributes, setAttributes, clientId } ) => {
    const {
        contentAlign, columnwidth, media, image, bgColor, bgSlug,
        vidOrImg, videoID, videoURL, videothumb, withDrop,
        padding, margin, blockId,
    } = attributes;

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    const updateImageAttr = ( img ) => {
        let large = img.url;
        let medium = img.sizes && img.sizes['medium-small']
            ? img.sizes['medium-small'].url
            : img.url;

        setAttributes( {
            media: {
                srcSet: { large, medium },
                id: img.id,
                alt: img.alt,
            },
        } );
    };

    const updateVideoAttr = ( vid ) => {
        setAttributes( {
            videoURL: vid.url,
            videoID: vid.id,
        } );
    };

    const setVideoThumb = ( img ) => {
        let newThumb = JSON.parse( JSON.stringify( videothumb ) );
        newThumb.url = img.url;
        newThumb.width = img.width;
        newThumb.height = img.height;
        setAttributes( { videothumb: newThumb } );
    };

    const removeVideoThumb = () => {
        setAttributes( {
            videothumb: { url: '', width: '', height: '' },
        } );
    };

    // Build background styles
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

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'image-columns'
            + ' ' + contentAlign
            + ' ' + columnwidth
            + ( bgSlug ? ' ' + bgSlug + ' with-bg' : '' )
            + ( withDrop ? ' with-ds' : ' no-ds' ),
        style: bgStyle,
    } );

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody
                    title={ __( 'Align Content', 'red-egg' ) }
                    initialOpen={ true }
                >
                    <SelectControl
                        label={ __( 'Align Content', 'red-egg' ) }
                        value={ contentAlign }
                        options={ alignOptions }
                        onChange={ ( val ) => setAttributes( { contentAlign: val } ) }
                    />
                </PanelBody>
                <ColumnsWidth
                    columnwidth={ columnwidth }
                    setAttributes={ setAttributes }
                />
                <BackgroundColor
                    bgColor={ bgColor }
                    bgSlug={ bgSlug }
                    setAttributes={ setAttributes }
                />
                { vidOrImg === 'image' && (
                    <BackgroundSelector
                        setAttributes={ setAttributes }
                        image={ image }
                    />
                ) }
                <PanelBody
                    title={ __( 'Video or Image', 'red-egg' ) }
                    initialOpen={ false }
                >
                    <SelectControl
                        label={ __( 'Video or Image', 'red-egg' ) }
                        value={ vidOrImg }
                        options={ VidImg }
                        onChange={ ( val ) => setAttributes( { vidOrImg: val } ) }
                    />
                </PanelBody>
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
                                        isSecondary
                                        onClick={ open }
                                        style={ { marginBottom: '15px', height: 'auto', display: 'block', width: '100%' } }
                                    >
                                        { ! videothumb.url && __( 'Add Video Thumbnail', 'red-egg' ) }
                                        { videothumb.url && (
                                            <ResponsiveWrapper
                                                naturalWidth={ videothumb.width }
                                                naturalHeight={ videothumb.height }
                                            >
                                                <img src={ videothumb.url } style={ { maxHeight: 'auto', width: 'auto' } } alt="" />
                                            </ResponsiveWrapper>
                                        ) }
                                    </Button>
                                    { videothumb.url && (
                                        <Button isDestructive isSmall onClick={ removeVideoThumb }>
                                            { __( 'Remove Image', 'red-egg' ) }
                                        </Button>
                                    ) }
                                </Fragment>
                            ) }
                        />
                    </PanelBody>
                ) }
                <PanelBody
                    title={ __( 'Display Options', 'red-egg' ) }
                    initialOpen={ false }
                >
                    <ToggleControl
                        label={ __( 'With Drop Shadow?', 'red-egg' ) }
                        checked={ !! withDrop }
                        onChange={ () => setAttributes( { withDrop: ! withDrop } ) }
                    />
                </PanelBody>
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
                    <div className={ `block-content ${ contentAlign }` }>
                        <div className="image-col column">
                            { vidOrImg === 'image' && (
                                <ImageComp
                                    id={ media.id }
                                    source={ media.srcSet.large }
                                    updateImageAttr={ updateImageAttr }
                                    alt={ media.alt }
                                />
                            ) }
                            { vidOrImg === 'video' && (
                                <Fragment>
                                    <MediaUpload
                                        onSelect={ updateVideoAttr }
                                        allowedTypes={ [ 'video' ] }
                                        value={ videoID }
                                        render={ ( { open } ) => (
                                            <Button className="button" onClick={ open }>
                                                { __( 'Upload/Change Video', 'red-egg' ) }
                                            </Button>
                                        ) }
                                    />
                                    { videoID && (
                                        <video className="hero-asset" playsInline poster={ videothumb.url }>
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
                                    allowedBlocks={ allowBlocks }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditImageText;
