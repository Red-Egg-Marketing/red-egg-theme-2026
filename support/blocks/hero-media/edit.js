/**
 * Hero Media – Edit Component
 *
 * Image or video for the hero section.
 * MediaUpload in block area + type toggle in sidebar.
 */

const { Fragment } = wp.element;
const { InspectorControls, MediaUpload, useBlockProps } = wp.blockEditor;
const { PanelBody, Button, SelectControl } = wp.components;
const { __ } = wp.i18n;

const mediaOptions = [
    { label: __( 'Image', 'red-egg' ), value: 'image' },
    { label: __( 'Video', 'red-egg' ), value: 'video' },
];

const EditHeroMedia = ( { attributes, setAttributes } ) => {
    const { mediaType, media, videoID, videoURL } = attributes;

    const blockProps = useBlockProps( {
        className: 'hero-background__media',
    } );

    const onSelectImage = ( img ) => {
        setAttributes( {
            media: {
                id: img.id,
                url: img.url,
                alt: img.alt || '',
            },
        } );
    };

    const onSelectVideo = ( vid ) => {
        setAttributes( {
            videoURL: vid.url,
            videoID: vid.id,
        } );
    };

    const removeMedia = () => {
        setAttributes( {
            media: { id: '', url: '', alt: '' },
            videoURL: '',
            videoID: undefined,
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
                        value={ mediaType }
                        options={ mediaOptions }
                        onChange={ ( val ) => setAttributes( { mediaType: val } ) }
                    />
                </PanelBody>
            </InspectorControls>

            <div { ...blockProps }>
                { mediaType === 'image' && (
                    <Fragment>
                        { ! media.url && (
                            <div className="hero-background__media-placeholder">
                                <MediaUpload
                                    onSelect={ onSelectImage }
                                    allowedTypes={ [ 'image' ] }
                                    render={ ( { open } ) => (
                                        <Button onClick={ open } variant="secondary">
                                            { __( 'Upload Hero Image', 'red-egg' ) }
                                        </Button>
                                    ) }
                                />
                            </div>
                        ) }
                        { media.url && (
                            <Fragment>
                                <img
                                    className="hero-background__media-img"
                                    src={ media.url }
                                    alt={ media.alt }
                                />
                                <Button
                                    className="hero-background__media-remove"
                                    onClick={ removeMedia }
                                    isDestructive
                                    isSmall
                                >
                                    { __( 'Remove', 'red-egg' ) }
                                </Button>
                            </Fragment>
                        ) }
                    </Fragment>
                ) }
                { mediaType === 'video' && (
                    <Fragment>
                        <MediaUpload
                            onSelect={ onSelectVideo }
                            allowedTypes={ [ 'video' ] }
                            value={ videoID }
                            render={ ( { open } ) => (
                                <Button onClick={ open } variant="secondary">
                                    { videoID
                                        ? __( 'Change Video', 'red-egg' )
                                        : __( 'Upload Video', 'red-egg' )
                                    }
                                </Button>
                            ) }
                        />
                        { videoID && (
                            <video
                                className="hero-background__media-video"
                                autoPlay
                                playsInline
                                muted
                                loop
                            >
                                <source src={ videoURL } type="video/mp4" />
                            </video>
                        ) }
                    </Fragment>
                ) }
            </div>
        </Fragment>
    );
};

export default EditHeroMedia;
