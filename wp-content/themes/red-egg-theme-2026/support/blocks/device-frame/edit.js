/**
 * Device Frame – Edit Component
 *
 * Two MediaUploads: device frame image + screenshot.
 * Screen position controls in InspectorControls.
 */

const { Fragment } = wp.element;
const { InspectorControls, MediaUpload, useBlockProps } = wp.blockEditor;
const { PanelBody, Button, SelectControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import { pickSizes } from '../../components/mediaSizes.js';

const deviceOptions = [
    { label: __( 'Desktop', 'red-egg' ), value: 'desktop' },
    { label: __( 'Mobile', 'red-egg' ), value: 'mobile' },
];

const EditDeviceFrame = ( { attributes, setAttributes } ) => {
    const {
        deviceType, frameImage, screenshot,
        screenTop, screenLeft, screenWidth, screenHeight,
    } = attributes;

    const blockProps = useBlockProps( {
        className: 'device-frame device-frame--' + deviceType,
    } );

    const onSelectFrame = ( media ) => {
        setAttributes( {
            frameImage: {
                id: media.id,
                url: media.url,
                alt: media.alt || '',
            },
        } );
    };

    const onSelectScreenshot = ( media ) => {
        const picked = pickSizes( media, [
            'post-landscape',
            'medium-large',
            'medium-landscape',
            'large',
            'full',
        ] );
        setAttributes( {
            screenshot: {
                id: media.id,
                url: media.url,
                alt: media.alt || '',
                source: picked.source,
                srcset: picked.srcset,
            },
        } );
    };

    const removeFrame = () => {
        setAttributes( { frameImage: { id: '', url: '', alt: '' } } );
    };

    const removeScreenshot = () => {
        setAttributes( { screenshot: { id: '', url: '', alt: '' } } );
    };

    const screenStyle = {
        top: screenTop + '%',
        left: screenLeft + '%',
        width: screenWidth + '%',
        height: screenHeight + '%',
    };

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
                <PanelBody
                    title={ __( 'Screenshot Image', 'red-egg' ) }
                    initialOpen={ true }
                >
                    <MediaUpload
                        onSelect={ onSelectScreenshot }
                        allowedTypes={ [ 'image' ] }
                        value={ screenshot.id }
                        render={ ( { open } ) => (
                            <Fragment>
                                <Button onClick={ open } variant="secondary" style={ { marginBottom: '10px' } }>
                                    { screenshot.url
                                        ? __( 'Change Screenshot', 'red-egg' )
                                        : __( 'Upload Screenshot', 'red-egg' )
                                    }
                                </Button>
                                { screenshot.url && (
                                    <Fragment>
                                        <img src={ screenshot.url } style={ { maxWidth: '100%', marginBottom: '10px' } } />
                                        <Button onClick={ removeScreenshot } isDestructive isSmall>
                                            { __( 'Remove', 'red-egg' ) }
                                        </Button>
                                    </Fragment>
                                ) }
                            </Fragment>
                        ) }
                    />
                </PanelBody>
                <PanelBody
                    title={ __( 'Screen Position (%)', 'red-egg' ) }
                    initialOpen={ false }
                >
                    <RangeControl
                        label={ __( 'Top', 'red-egg' ) }
                        value={ screenTop }
                        onChange={ ( val ) => setAttributes( { screenTop: val } ) }
                        min={ 0 } max={ 30 } step={ 0.5 }
                    />
                    <RangeControl
                        label={ __( 'Left', 'red-egg' ) }
                        value={ screenLeft }
                        onChange={ ( val ) => setAttributes( { screenLeft: val } ) }
                        min={ 0 } max={ 20 } step={ 0.5 }
                    />
                    <RangeControl
                        label={ __( 'Width', 'red-egg' ) }
                        value={ screenWidth }
                        onChange={ ( val ) => setAttributes( { screenWidth: val } ) }
                        min={ 50 } max={ 100 } step={ 0.5 }
                    />
                    <RangeControl
                        label={ __( 'Height', 'red-egg' ) }
                        value={ screenHeight }
                        onChange={ ( val ) => setAttributes( { screenHeight: val } ) }
                        min={ 30 } max={ 100 } step={ 0.5 }
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
                            src={ frameImage.url }
                            alt={ frameImage.alt }
                        />
                        { screenshot.url && (
                            <img
                                className="device-frame__screenshot"
                                src={ screenshot.url }
                                alt={ screenshot.alt }
                                style={ screenStyle }
                            />
                        ) }
                        { ! screenshot.url && (
                            <div className="device-frame__screenshot-placeholder" style={ screenStyle }>
                                <MediaUpload
                                    onSelect={ onSelectScreenshot }
                                    allowedTypes={ [ 'image' ] }
                                    render={ ( { open } ) => (
                                        <Button onClick={ open } variant="secondary" isSmall>
                                            { __( 'Add Screenshot', 'red-egg' ) }
                                        </Button>
                                    ) }
                                />
                            </div>
                        ) }
                    </div>
                ) }
            </div>
        </Fragment>
    );
};

export default EditDeviceFrame;
