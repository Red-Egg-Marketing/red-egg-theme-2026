/**
 * Device Frame – Save Component
 */

const { useBlockProps } = wp.blockEditor;
import { buildSrcSet, resolveOverride } from '../../components/mediaSizes.js';

const SaveDeviceFrame = ( { attributes } ) => {
    const {
        deviceType, frameImage, screenshot,
        screenTop, screenLeft, screenWidth, screenHeight,
    } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'device-frame device-frame--' + deviceType,
    } );

    const screenStyle = {
        top: screenTop + '%',
        left: screenLeft + '%',
        width: screenWidth + '%',
        height: screenHeight + '%',
    };

    return (
        <div { ...blockProps }>
            { frameImage.url && (
                <div className="device-frame__wrap">
                    <img
                        className="device-frame__device"
                        src={ frameImage.url }
                        alt={ frameImage.alt }
                        loading="lazy"
                    />
                    { screenshot.url && (
                        <img
                            className="device-frame__screenshot"
                            src={ resolveOverride( screenshot.sizeOverride, screenshot.sizeUrls, screenshot.source || screenshot.url ) }
                            srcSet={ screenshot.sizeOverride ? '' : buildSrcSet( screenshot.srcset ) }
                            sizes={ screenshot.sizeOverride ? '' : '(min-width: 880px) 50vw, 100vw' }
                            alt={ screenshot.alt }
                            loading="lazy"
                            style={ screenStyle }
                        />
                    ) }
                </div>
            ) }
        </div>
    );
};

export default SaveDeviceFrame;
