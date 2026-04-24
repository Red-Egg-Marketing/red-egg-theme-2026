/**
 * Hero Block – Edit Component
 *
 * Full-bleed background image or video.
 * RichText h1 for the hero title.
 * InnerBlocks for the header-intro block that overlaps
 * the bottom edge of the hero.
 */

const { Fragment, useEffect } = wp.element;
const { RichText, InnerBlocks, InspectorControls, MediaUpload, useBlockProps } = wp.blockEditor;
const { PanelBody, SelectControl, ToggleControl, Button } = wp.components;
const { __ } = wp.i18n;

import BackgroundSelector from '../../components/BackgroundSelector.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const innerTemplate = [
    [ 'red-egg-block/header-intro', {} ],
];

const VidImg = [
    { label: __( 'Image', 'red-egg' ), value: 'image' },
    { label: __( 'Video', 'red-egg' ), value: 'video' },
];

const EditHero = ( { attributes, setAttributes, clientId } ) => {
    const {
        image, title, vidOrImg, videoID, videoURL,
        overlay, padding, margin, blockId,
    } = attributes;

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    // Build inline background styles for editor preview
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
        className: 'hero' + ( overlay ? ' with-overlay' : '' ),
    } );

    const updateVideoAttr = ( media ) => {
        setAttributes( {
            videoURL: media.url + '#t=0.5',
            videoID: media.id,
        } );
    };

    return (
        <Fragment>
            <InspectorControls>
                <BackgroundSelector
                    setAttributes={ setAttributes }
                    image={ image }
                />
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
                <PanelBody
                    title={ __( 'Overlay', 'red-egg' ) }
                    initialOpen={ false }
                >
                    <ToggleControl
                        label={ __( 'With Overlay?', 'red-egg' ) }
                        checked={ overlay }
                        onChange={ ( val ) => setAttributes( { overlay: val } ) }
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
                { vidOrImg === 'video' && (
                    <MediaUpload
                        onSelect={ updateVideoAttr }
                        allowedTypes={ [ 'video' ] }
                        value={ videoID }
                        render={ ( { open } ) => (
                            <Button
                                className="button hero__video-upload"
                                onClick={ open }
                            >
                                { videoID ? __( 'Change Video', 'red-egg' ) : __( 'Upload Video', 'red-egg' ) }
                            </Button>
                        ) }
                    />
                ) }
                <div className="block-wrapper">
                    <div className="hero__inner">
                        <div className="content-wrap">
                            <div className="hero-block-content">
                                <div className="hero-block-wrap">
                                    <RichText
                                        tagName="h1"
                                        className="header-title"
                                        value={ title }
                                        onChange={ ( val ) => setAttributes( { title: val } ) }
                                        placeholder={ __( 'Page Title...', 'red-egg' ) }
                                        allowedFormats={ [ 'core/italic' ] }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="hero-block-image">
                            { vidOrImg === 'image' && (
                                <div className="hero-block-image-wrap" style={ bgStyle }></div>
                            ) }
                            { videoID && vidOrImg === 'video' && (
                                <video className="hero-asset" autoPlay playsInline muted loop>
                                    <source src={ videoURL } className="hero-source" type="video/mp4" />
                                </video>
                            ) }
                        </div>
                    </div>
                    <div className="hero-block-innerblocks">
                        <InnerBlocks
                            template={ innerTemplate }
                            allowedBlocks={ [ 'red-egg-block/header-intro' ] }
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditHero;
