/**
 * Device Frame – Edit Component
 *
 * A single content image (the website screenshot). The "device" look
 * (desktop/mobile bezel) is applied entirely via CSS on the
 * .device-frame--{type} class, so there's no separate bezel image or
 * screen-position overlay -- just the one image, with a size picker for
 * page-speed control.
 */

const { Fragment } = wp.element;
const { InspectorControls, MediaUpload, useBlockProps } = wp.blockEditor;
const { PanelBody, Button, SelectControl } = wp.components;
const { __ } = wp.i18n;
import { pickSizes, captureSizeUrls, resolveOverride } from '../../components/mediaSizes.js';
import ImageSizePicker from '../../components/ImageSizePicker.js';

const deviceOptions = [
    { label: __( 'Desktop', 'red-egg' ), value: 'desktop' },
    { label: __( 'Mobile', 'red-egg' ), value: 'mobile' },
];

const EditDeviceFrame = ( { attributes, setAttributes } ) => {
    const { deviceType, frameImage } = attributes;

    const blockProps = useBlockProps( {
        className: 'device-frame device-frame--' + deviceType,
    } );

    const onSelectFrame = ( media ) => {
        const picked = pickSizes( media, [
            'medium-large',
            'medium-landscape',
            'post-landscape',
            'large',
            'full',
            'mobile-image',
            'desktop-image',
        ] );
        setAttributes( {
            frameImage: {
                id: media.id,
                url: media.url,
                alt: media.alt || '',
                source: picked.source,
                srcset: picked.srcset,
                sizeUrls: captureSizeUrls( media ),
                sizeOverride: '',
            },
        } );
    };

    const removeFrame = () => {
        setAttributes( { frameImage: { id: '', url: '', alt: '', source: '', srcset: [], sizeUrls: {}, sizeOverride: '' } } );
    };

    const previewSrc = resolveOverride( frameImage.sizeOverride, frameImage.sizeUrls, frameImage.source || frameImage.url );

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody
                    title={ __( 'Device Settings', 'red-egg' ) }
                    initialOpen={ true }
                >
                    <SelectControl
                        label={ __( 'Device Type', 'red-egg' ) }
                        value={ deviceType }
                        options={ deviceOptions }
                        onChange={ ( val ) => setAttributes( { deviceType: val } ) }
                    />
                    { frameImage.source && (
                        <ImageSizePicker
                            label={ __( 'Image Size', 'red-egg' ) }
                            value={ frameImage.sizeOverride }
                            onChange={ ( val ) => setAttributes( {
                                frameImage: { ...frameImage, sizeOverride: val },
                            } ) }
                        />
                    ) }
                </PanelBody>
                <PanelBody
                    title={ __( 'Device Frame Image', 'red-egg' ) }
                    initialOpen={ true }
                >
                    <MediaUpload
                        onSelect={ onSelectFrame }
                        allowedTypes={ [ 'image' ] }
                        value={ frameImage.id }
                        render={ ( { open } ) => (
                            <Fragment>
                                <Button onClick={ open } variant="secondary" style={ { marginBottom: '10px' } }>
                                    { frameImage.url
                                        ? __( 'Change Frame Image', 'red-egg' )
                                        : __( 'Upload Frame Image', 'red-egg' )
                                    }
                                </Button>
                                { frameImage.url && (
                                    <Fragment>
                                        <img src={ frameImage.url } style={ { maxWidth: '100%', marginBottom: '10px' } } />
                                        <Button onClick={ removeFrame } isDestructive isSmall>
                                            { __( 'Remove', 'red-egg' ) }
                                        </Button>
                                    </Fragment>
                                ) }
                            </Fragment>
                        ) }
                    />
                </PanelBody>
            </InspectorControls>

            <div { ...blockProps }>
                { ! frameImage.url && (
                    <div className="device-frame__placeholder">
                        <MediaUpload
                            onSelect={ onSelectFrame }
                            allowedTypes={ [ 'image' ] }
                            render={ ( { open } ) => (
                                <Button onClick={ open } variant="secondary">
                                    { __( 'Upload Device Frame', 'red-egg' ) }
                                </Button>
                            ) }
                        />
                    </div>
                ) }
                { frameImage.url && (
                    <div className="device-frame__wrap">
                        <img
                            className="device-frame__device"
                            src={ previewSrc }
                            alt={ frameImage.alt }
                        />
                    </div>
                ) }
            </div>
        </Fragment>
    );
};

export default EditDeviceFrame;
