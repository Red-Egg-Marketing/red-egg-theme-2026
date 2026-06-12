/**
 * Hero – Case Study Block – Edit Component
 *
 * Background image/video with dark overlay.
 * InnerBlocks for title heading + subtitle paragraph.
 */

const { Fragment, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, MediaUpload, useBlockProps } = wp.blockEditor;
const { PanelBody, Button, SelectControl } = wp.components;
const { __ } = wp.i18n;

import BackgroundSelector from '../../components/BackgroundSelector.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'core/heading', { level: 1, placeholder: 'Case Study Title', className: 'hero-cs__title' } ],
    [ 'core/paragraph', { placeholder: 'Case Study | Branding | Website', className: 'hero-cs__subtitle' } ],
];

const allowedBlocks = [
    'core/heading',
    'core/paragraph',
    'core/buttons',
    'core/image',
    'core/spacer',
    'core/list',
];

const vidImgOptions = [
    { label: __( 'Image', 'red-egg' ), value: 'image' },
    { label: __( 'Video', 'red-egg' ), value: 'video' },
];

const EditHeroCaseStudy = ( { attributes, setAttributes, clientId } ) => {
    const {
        image, vidOrImg, videoID, videoURL,
        padding, margin, blockId,
    } = attributes;

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    // Build background image inline styles
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

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'hero-case-study',
        style: bgStyle,
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
                    image={ image }
                    setAttributes={ setAttributes }
                />
                <PanelBody
                    title={ __( 'Media Type', 'red-egg' ) }
                    initialOpen={ false }
                >
                    <SelectControl
                        label={ __( 'Background Type', 'red-egg' ) }
                        value={ vidOrImg }
                        options={ vidImgOptions }
                        onChange={ ( val ) => setAttributes( { vidOrImg: val } ) }
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

            <section { ...blockProps }>
                <div className="hero-cs__overlay"></div>

                { vidOrImg === 'video' && (
                    <div className="hero-cs__video-wrap">
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
                            <video className="hero-cs__video" autoPlay playsInline muted loop>
                                <source src={ videoURL } type="video/mp4" />
                            </video>
                        ) }
                    </div>
                ) }

                <div className="block-wrapper">
                    <div className="hero-cs__content">
                        <InnerBlocks
                            template={ template }
                            allowedBlocks={ allowedBlocks }
                        />
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default EditHeroCaseStudy;
