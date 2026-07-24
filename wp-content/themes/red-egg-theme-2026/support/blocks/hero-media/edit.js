/**
 * Hero Media – Edit Component
 *
 * Image (including SVG), or video for the hero section.
 * MediaUpload in block area + type toggle in sidebar.
 * Video mode includes thumbnail upload.
 */

const { Fragment } = wp.element;
const { InspectorControls, MediaUpload, useBlockProps } = wp.blockEditor;
const { PanelBody, Button, SelectControl, RangeControl, ResponsiveWrapper } = wp.components;
const { __ } = wp.i18n;
import { pickSizes } from '../../components/mediaSizes.js';

const mediaOptions = [
    { label: __( 'Image / SVG', 'red-egg' ), value: 'image' },
    { label: __( 'Video', 'red-egg' ), value: 'video' },
    { label: __( 'Egg Cluster', 'red-egg' ), value: 'eggs' },
];

const renderEggs = ( count ) => {
    const eggs = [];
    for ( let i = 1; i <= count; i++ ) {
        eggs.push(
            <span className={ 'egg-cluster__egg egg-cluster__egg--' + i } key={ i }>
                <span className="egg-cluster__layer egg-cluster__layer--white"></span>
                <span className="egg-cluster__layer egg-cluster__layer--red"></span>
            </span>
        );
    }
    return eggs;
};

const EditHeroMedia = ( { attributes, setAttributes } ) => {
    const { mediaType, media, videoID, videoURL, videothumb, eggCount, eggTouchBehavior } = attributes;

    const blockProps = useBlockProps( {
        className: 'hero-background__media',
    } );

    const onSelectImage = ( img ) => {
        const picked = pickSizes( img, [
            'hero-landscape-large',
            'hero-landscape-medium',
            'hero-landscape',
            'large',
            'full',
        ] );
        setAttributes( {
            media: {
                id: img.id,
                url: img.url,
                alt: img.alt || '',
                source: picked.source,
                srcset: picked.srcset,
            },
        } );
    };

    const onSelectVideo = ( vid ) => {
        setAttributes( {
            videoURL: vid.url + '#t=0.5',
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

                { mediaType === 'eggs' && (
                    <PanelBody
                        title={ __( 'Egg Cluster', 'red-egg' ) }
                        initialOpen={ true }
                    >
                        <RangeControl
                            label={ __( 'Number of Eggs', 'red-egg' ) }
                            value={ eggCount }
                            onChange={ ( val ) => setAttributes( { eggCount: val } ) }
                            min={ 1 }
                            max={ 6 }
                        />
                        <SelectControl
                            label={ __( 'Touch / No-Hover Behavior', 'red-egg' ) }
                            help={ __( 'What the eggs do on touch devices where there is no hover.', 'red-egg' ) }
                            value={ eggTouchBehavior }
                            options={ [
                                { label: __( 'Stay white', 'red-egg' ), value: 'stay-white' },
                                { label: __( 'Auto-cycle red', 'red-egg' ), value: 'auto-cycle' },
                            ] }
                            onChange={ ( val ) => setAttributes( { eggTouchBehavior: val } ) }
                        />
                    </PanelBody>
                ) }

                { mediaType === 'video' && (
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
                { mediaType === 'image' && (
                    <Fragment>
                        { ! media.url && (
                            <div className="hero-background__media-placeholder">
                                <MediaUpload
                                    onSelect={ onSelectImage }
                                    allowedTypes={ [ 'image', 'image/svg+xml' ] }
                                    render={ ( { open } ) => (
                                        <Button onClick={ open } variant="secondary">
                                            { __( 'Upload Image / SVG', 'red-egg' ) }
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
                                poster={ videothumb.url || '' }
                            >
                                <source src={ videoURL } type="video/mp4" />
                            </video>
                        ) }
                    </Fragment>
                ) }
                { mediaType === 'eggs' && (
                    <div className={ 'egg-cluster egg-cluster--count-' + eggCount }>
                        { renderEggs( eggCount ) }
                    </div>
                ) }
            </div>
        </Fragment>
    );
};

export default EditHeroMedia;
