/**
 * Media Content – Media Block – Edit Component
 *
 * Image/video picker with drop shadow toggle and blob animation controls.
 */

const { Fragment } = wp.element;
const { InnerBlocks, InspectorControls, MediaUpload, useBlockProps } = wp.blockEditor;
const { PanelBody, Button, SelectControl, ToggleControl, ResponsiveWrapper } = wp.components;
const { __ } = wp.i18n;

import ImageComp from '../../components/ImageComp.js';

const vidImgOptions = [
    { label: __( 'Image', 'red-egg' ), value: 'image' },
    { label: __( 'Video', 'red-egg' ), value: 'video' },
];

const EditMediaContentMedia = ( { attributes, setAttributes } ) => {
    const {
        media, vidOrImg, videoID, videoURL, videothumb
    } = attributes;

    const blockProps = useBlockProps( {
        className: 'media-content__media image-col column',
    } );

    // Media handlers
    const updateImageAttr = ( newMedia ) => {
        // Registered sizes instead of full-size original, with widths
        // so save can build a real srcset. Falls back through WP
        // defaults, then full url only as a last resort.
        const pick = ( names ) => {
            for ( const n of names ) {
                if ( newMedia.sizes && newMedia.sizes[ n ] ) {
                    return { url: newMedia.sizes[ n ].url, width: newMedia.sizes[ n ].width };
                }
            }
            return { url: newMedia.url, width: newMedia.width || '' };
        };

        const large = pick( [ 'image-text-block', 'medium-landscape', 'large' ] );
        const medium = pick( [ 'image-text-block-small', 'medium-small', 'medium' ] );

        setAttributes( {
            media: {
                srcSet: {
                    large: large.url,
                    largeW: large.width,
                    medium: medium.url,
                    mediumW: medium.width,
                },
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
                    title={ __( 'Media Settings', 'red-egg' ) }
                    initialOpen={ true }
                >
                    <SelectControl
                        label={ __( 'Media Type', 'red-egg' ) }
                        value={ vidOrImg }
                        options={ vidImgOptions }
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

            <div { ...blockProps }>

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
        </Fragment>
    );
};

export default EditMediaContentMedia;
