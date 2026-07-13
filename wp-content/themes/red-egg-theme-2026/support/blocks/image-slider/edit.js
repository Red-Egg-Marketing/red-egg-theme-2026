/**
 * Image Slider Block – Edit Component
 *
 * Gallery-style image picker. Images stored as an
 * array attribute. Rendered as a Swiper slider on frontend.
 */

const { Fragment, useEffect } = wp.element;
const { InspectorControls, MediaUpload, useBlockProps } = wp.blockEditor;
const { PanelBody, Button, RangeControl } = wp.components;
const { __ } = wp.i18n;

const EditImageSlider = ( { attributes, setAttributes, clientId } ) => {
    const { images, slidesPerView, spaceBetween, blockId } = attributes;

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'image-slider',
    } );

    const onSelectImages = ( media ) => {
        const newImages = media.map( ( img ) => ( {
            id: img.id,
            url: img.url,
            alt: img.alt || '',
        } ) );
        setAttributes( { images: newImages } );
    };

    const removeImage = ( index ) => {
        let newImages = JSON.parse( JSON.stringify( images ) );
        newImages.splice( index, 1 );
        setAttributes( { images: newImages } );
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody
                    title={ __( 'Slider Settings', 'red-egg' ) }
                    initialOpen={ true }
                >
                    <RangeControl
                        label={ __( 'Slides Per View (Desktop)', 'red-egg' ) }
                        value={ slidesPerView }
                        onChange={ ( val ) => setAttributes( { slidesPerView: val } ) }
                        min={ 1 }
                        max={ 5 }
                    />
                    <RangeControl
                        label={ __( 'Space Between (px)', 'red-egg' ) }
                        value={ spaceBetween }
                        onChange={ ( val ) => setAttributes( { spaceBetween: val } ) }
                        min={ 0 }
                        max={ 50 }
                    />
                </PanelBody>
                <PanelBody
                    title={ __( 'Images', 'red-egg' ) }
                    initialOpen={ true }
                >
                    <MediaUpload
                        onSelect={ onSelectImages }
                        allowedTypes={ [ 'image' ] }
                        multiple={ true }
                        gallery={ true }
                        value={ images.map( ( img ) => img.id ) }
                        render={ ( { open } ) => (
                            <Button onClick={ open } variant="secondary">
                                { images.length > 0
                                    ? __( 'Edit Gallery', 'red-egg' )
                                    : __( 'Add Images', 'red-egg' )
                                }
                            </Button>
                        ) }
                    />
                </PanelBody>
            </InspectorControls>

            <div { ...blockProps }>
                { images.length === 0 && (
                    <div className="image-slider__placeholder">
                        <MediaUpload
                            onSelect={ onSelectImages }
                            allowedTypes={ [ 'image' ] }
                            multiple={ true }
                            gallery={ true }
                            render={ ( { open } ) => (
                                <Button onClick={ open } variant="secondary">
                                    { __( 'Add Images to Slider', 'red-egg' ) }
                                </Button>
                            ) }
                        />
                    </div>
                ) }
                { images.length > 0 && (
                    <div className="image-slider__preview">
                        { images.map( ( img, i ) => (
                            <div className="image-slider__preview-item" key={ img.id || i }>
                                <img src={ img.url } alt={ img.alt } />
                                <Button
                                    className="image-slider__remove"
                                    onClick={ () => removeImage( i ) }
                                    isDestructive
                                    isSmall
                                >
                                    ×
                                </Button>
                            </div>
                        ) ) }
                    </div>
                ) }
            </div>
        </Fragment>
    );
};

export default EditImageSlider;
