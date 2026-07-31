/**
 * Awards Section Block – Edit Component
 *
 * InnerBlocks for header (label + heading + description).
 * Awards managed as an array attribute with MediaUpload.
 * Each award has an image (thumbnail) and a caption.
 */

const { Fragment, useEffect, useState } = wp.element;
const { InnerBlocks, InspectorControls, MediaUpload, useBlockProps, URLInput } = wp.blockEditor;
const { PanelBody, Button, RangeControl, TextControl, ToggleControl, Popover } = wp.components;
const { __ } = wp.i18n;
import { pickSizes, captureSizeUrls } from '../../components/mediaSizes.js';
import ImageSizePicker from '../../components/ImageSizePicker.js';

import BackgroundColor from '../../components/BackgroundColor.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'red-egg-block/header-intro', {} ],
];

const allowedBlocks = [
    'red-egg-block/header-intro',
    'core/heading',
    'core/paragraph',
];

const EditAwardsSection = ( { attributes, setAttributes, clientId } ) => {
    const { bgColor, bgSlug, awards, slidesPerView, spaceBetween, withCards, padding, margin, blockId, imageSizeOverride } = attributes;

    // Which award's link popover is open (index), or null.
    const [ openLinkIndex, setOpenLinkIndex ] = useState( null );

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'awards-section' + ( bgSlug ? ' ' + bgSlug : '' ) + ( withCards ? ' with-cards' : '' ),
    } );

    /**
     * Add awards from gallery selection.
     * Each selected image becomes an award entry with empty caption.
     */
    const onSelectAwards = ( media ) => {
        const newAwards = media.map( ( img ) => {
            // Check if this image already exists in awards to preserve captions
            const existing = awards.find( ( a ) => a.id === img.id );
            // Logos are small display elements: a thumbnail is the base,
            // with medium-small for retina. Never the full-size original.
            const picked = pickSizes( img, [ 'medium-small', 'thumbnail' ] );
            return {
                id: img.id,
                url: img.sizes && img.sizes.thumbnail ? img.sizes.thumbnail.url : img.url,
                source: picked.source,
                srcset: picked.srcset,
                sizeUrls: captureSizeUrls( img ),
                fullUrl: img.url,
                alt: img.alt || '',
                caption: existing ? existing.caption : '',
                link: existing ? ( existing.link || '' ) : '',
            };
        } );
        setAttributes( { awards: newAwards } );
    };

    /**
     * Update a single award's caption.
     */
    const updateCaption = ( index, value ) => {
        let updated = JSON.parse( JSON.stringify( awards ) );
        updated[ index ].caption = value;
        setAttributes( { awards: updated } );
    };

    /**
     * Update a single award's link URL. Empty = no link (image
     * renders unwrapped on save).
     */
    const updateLink = ( index, value ) => {
        let updated = JSON.parse( JSON.stringify( awards ) );
        updated[ index ].link = value;
        setAttributes( { awards: updated } );
    };

    /**
     * Remove a single award.
     */
    const removeAward = ( index ) => {
        let updated = JSON.parse( JSON.stringify( awards ) );
        updated.splice( index, 1 );
        setAttributes( { awards: updated } );
    };

    return (
        <Fragment>
            <InspectorControls>
                <BackgroundColor
                    bgColor={ bgColor }
                    bgSlug={ bgSlug }
                    setAttributes={ setAttributes }
                />
                <PanelBody
                    title={ __( 'Slider Settings', 'red-egg' ) }
                    initialOpen={ true }
                >
                    <RangeControl
                        label={ __( 'Slides Per View (Desktop)', 'red-egg' ) }
                        value={ slidesPerView }
                        onChange={ ( val ) => setAttributes( { slidesPerView: val } ) }
                        min={ 2 }
                        max={ 8 }
                    />
                    { awards && awards.length > 0 && (
                        <ImageSizePicker
                            label={ __( 'Logo Image Size', 'red-egg' ) }
                            value={ imageSizeOverride }
                            onChange={ ( val ) => setAttributes( { imageSizeOverride: val } ) }
                        />
                    ) }
                    <RangeControl
                        label={ __( 'Space Between (px)', 'red-egg' ) }
                        value={ spaceBetween }
                        onChange={ ( val ) => setAttributes( { spaceBetween: val } ) }
                        min={ 0 }
                        max={ 60 }
                    />
                    <ToggleControl
                        label={ __( 'Card Style (border around images)', 'red-egg' ) }
                        checked={ !! withCards }
                        onChange={ () => setAttributes( { withCards: ! withCards } ) }
                    />
                </PanelBody>
                <PanelBody
                    title={ __( 'Awards', 'red-egg' ) }
                    initialOpen={ true }
                >
                    <MediaUpload
                        onSelect={ onSelectAwards }
                        allowedTypes={ [ 'image' ] }
                        multiple={ true }
                        gallery={ true }
                        value={ awards.map( ( a ) => a.id ) }
                        render={ ( { open } ) => (
                            <Button onClick={ open } variant="secondary">
                                { awards.length > 0
                                    ? __( 'Edit Awards Gallery', 'red-egg' )
                                    : __( 'Add Award Images', 'red-egg' )
                                }
                            </Button>
                        ) }
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
                <div className="block-wrapper">
                    <div className="awards-section__header">
                        <InnerBlocks
                            template={ template }
                            allowedBlocks={ allowedBlocks }
                        />
                    </div>

                    <div className="awards-section__slider-wrap">
                        { awards.length === 0 && (
                            <div className="awards-section__placeholder">
                                <MediaUpload
                                    onSelect={ onSelectAwards }
                                    allowedTypes={ [ 'image' ] }
                                    multiple={ true }
                                    gallery={ true }
                                    render={ ( { open } ) => (
                                        <Button onClick={ open } variant="secondary">
                                            { __( 'Add Award Images', 'red-egg' ) }
                                        </Button>
                                    ) }
                                />
                            </div>
                        ) }
                        { awards.length > 0 && (
                            <div className="awards-section__preview">
                                { awards.map( ( award, i ) => (
                                    <div className="awards-section__preview-item" key={ award.id || i }>
                                        <div className="awards-section__preview-img">
                                            <img src={ award.url } alt={ award.alt } />
                                            <div className="awards-section__link-control">
                                                <Button
                                                    className={ 'awards-section__link-toggle' + ( award.link ? ' is-linked' : '' ) }
                                                    icon="admin-links"
                                                    label={ award.link ? __( 'Edit link', 'red-egg' ) : __( 'Add link', 'red-egg' ) }
                                                    showTooltip
                                                    isPressed={ !! award.link }
                                                    onClick={ () => setOpenLinkIndex( openLinkIndex === i ? null : i ) }
                                                />
                                                { openLinkIndex === i && (
                                                    <Popover
                                                        className="awards-section__link-popover"
                                                        placement="bottom-start"
                                                        onClose={ () => setOpenLinkIndex( null ) }
                                                        onFocusOutside={ () => setOpenLinkIndex( null ) }
                                                        focusOnMount="firstElement"
                                                    >
                                                        <div className="awards-section__link-popover-inner">
                                                            <URLInput
                                                                value={ award.link || '' }
                                                                onChange={ ( url ) => updateLink( i, url ) }
                                                                placeholder={ __( 'Paste URL or search…', 'red-egg' ) }
                                                                __nextHasNoMarginBottom
                                                            />
                                                            { award.link && (
                                                                <Button
                                                                    className="awards-section__link-clear"
                                                                    variant="tertiary"
                                                                    isDestructive
                                                                    isSmall
                                                                    onClick={ () => updateLink( i, '' ) }
                                                                >
                                                                    { __( 'Remove link', 'red-egg' ) }
                                                                </Button>
                                                            ) }
                                                        </div>
                                                    </Popover>
                                                ) }
                                            </div>
                                            <Button
                                                className="awards-section__remove"
                                                onClick={ () => removeAward( i ) }
                                                isDestructive
                                                isSmall
                                            >
                                                ×
                                            </Button>
                                        </div>
                                        <TextControl
                                            placeholder={ __( 'Caption…', 'red-egg' ) }
                                            value={ award.caption }
                                            onChange={ ( val ) => updateCaption( i, val ) }
                                        />
                                        <URLInput
                                            className="awards-section__link-input"
                                            value={ award.link || '' }
                                            onChange={ ( url ) => updateLink( i, url ) }
                                            placeholder={ __( 'Link URL (optional)…', 'red-egg' ) }
                                            __nextHasNoMarginBottom
                                        />
                                    </div>
                                ) ) }
                            </div>
                        ) }
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default EditAwardsSection;
