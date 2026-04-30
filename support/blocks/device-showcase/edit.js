/**
 * Device Showcase Block – Edit Component
 *
 * Dark section with desktop + mobile device frames and CTA.
 */

const { Fragment, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

import BackgroundColor from '../../components/BackgroundColor.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'red-egg-block/device-frame', { deviceType: 'desktop', screenTop: 4.5, screenLeft: 4.5, screenWidth: 91, screenHeight: 72 } ],
    [ 'red-egg-block/device-frame', { deviceType: 'mobile', screenTop: 12, screenLeft: 5, screenWidth: 90, screenHeight: 78 } ],
    [ 'core/buttons', { layout: { type: 'flex', justifyContent: 'center' } }, [
        [ 'core/button', { text: 'VIEW WEBSITE', className: 'is-style-outline-white' } ],
    ] ],
];

const allowedBlocks = [
    'red-egg-block/device-frame',
    'core/buttons',
    'core/button',
];

const EditDeviceShowcase = ( { attributes, setAttributes, clientId } ) => {
    const { bgColor, bgSlug, padding, margin, blockId } = attributes;

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'device-showcase' + ( bgSlug ? ' ' + bgSlug : '' ),
    } );

    return (
        <Fragment>
            <InspectorControls>
                <BackgroundColor
                    bgColor={ bgColor }
                    bgSlug={ bgSlug }
                    setAttributes={ setAttributes }
                />
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
                    <div className="device-showcase__devices">
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

export default EditDeviceShowcase;
