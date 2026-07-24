/**
 * Device Frame – Save Component
 *
 * Renders a single content image (the website screenshot). The device
 * "frame" look is applied purely via CSS on .device-frame--{type}, so
 * there's no separate bezel image or screen-position overlay here.
 */

const { useBlockProps } = wp.blockEditor;
import { buildSrcSet, resolveOverride } from '../../components/mediaSizes.js';

const SaveDeviceFrame = ( { attributes } ) => {
    const { deviceType, frameImage } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'device-frame device-frame--' + deviceType,
    } );

    return (
        <div { ...blockProps }>
            { frameImage.url && (
                <div className="device-frame__wrap">
                    <img
                        className="device-frame__device"
                        src={ resolveOverride( frameImage.sizeOverride, frameImage.sizeUrls, frameImage.source || frameImage.url ) }
                        srcSet={ frameImage.sizeOverride ? '' : buildSrcSet( frameImage.srcset ) }
                        sizes={ frameImage.sizeOverride ? '' : '(min-width: 880px) 50vw, 100vw' }
                        alt={ frameImage.alt }
                        loading="lazy"
                    />
                </div>
            ) }
        </div>
    );
};

export default SaveDeviceFrame;
