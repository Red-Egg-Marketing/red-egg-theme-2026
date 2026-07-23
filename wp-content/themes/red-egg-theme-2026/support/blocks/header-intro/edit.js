/**
 * Header Intro Block – Edit Component
 *
 * Two-column layout: left (label + heading) and right (description).
 * Uses locked child blocks to prevent client reordering.
 * InspectorControls for background image, color, overlay,
 * squiggle decoration, padding, margin.
 */

const { Fragment, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps, useInnerBlocksProps } = wp.blockEditor;
const { PanelBody, ToggleControl, SelectControl } = wp.components;
const { __ } = wp.i18n;

import BackgroundColor from '../../components/BackgroundColor.js';
import BackgroundSelector from '../../components/BackgroundSelector.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'red-egg-block/header-intro-left', {} ],
    [ 'red-egg-block/header-intro-right', {} ],
];

const allowedBlocks = [
    'red-egg-block/header-intro-left',
    'red-egg-block/header-intro-right',
];

const EditHeaderIntro = ( { attributes, setAttributes, clientId } ) => {
    const {
        image, bgColor, bgSlug, coloroverlay, padding, margin, columnWidth,
    } = attributes;

    const blockId = `block-${ clientId }`;

    // Build inline background styles for editor preview
    const bgStyle = {};
    if ( image.url !== '' ) {
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

    if ( bgColor ) {
        bgStyle.backgroundColor = bgColor;
    }

    const innerBlocksProps = useInnerBlocksProps(
        { className: 'header-intro__columns' },
        { template, allowedBlocks }
    );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'header-intro-block'
            + ( coloroverlay ? ' with-overlay' : '' )
            + ( bgSlug ? ' ' + bgSlug + ' with-bg' : '' )
            + ( columnWidth ? ' cols-' + columnWidth : '' ),
        style: bgStyle,
    } );

    return (
        <Fragment>
            <InspectorControls>
                <BackgroundColor
                    bgColor={ bgColor }
                    bgSlug={ bgSlug }
                    setAttributes={ setAttributes }
                />
                <BackgroundSelector
                    image={ image }
                    setAttributes={ setAttributes }
                />
                <PanelBody
                    title={ __( 'Layout', 'red-egg' ) }
                    initialOpen={ true }
                >
                    <SelectControl
                        label={ __( 'Column Widths', 'red-egg' ) }
                        value={ columnWidth }
                        options={ [
                            { label: __( '33% / 66%', 'red-egg' ), value: '33-66' },
                            { label: __( '50% / 50%', 'red-egg' ), value: '50-50' },
                        ] }
                        onChange={ ( value ) => setAttributes( { columnWidth: value } ) }
                    />
                </PanelBody>
                <PanelBody
                    title={ __( 'Overlay', 'red-egg' ) }
                    initialOpen={ false }
                >
                    <ToggleControl
                        label={ __( 'Background Overlay', 'red-egg' ) }
                        checked={ coloroverlay }
                        onChange={ ( value ) => setAttributes( { coloroverlay: value } ) }
                    />
                </PanelBody>
                <PanelBody
                    title={ __( 'Squiggle Decoration', 'red-egg' ) }
                    initialOpen={ false }
                >
                </PanelBody>
            </InspectorControls>

            <PaddingSelector
                padding={ padding }
                id={ blockId }
                setAttributes={ setAttributes }
            />
            <MarginSelector
                margin={ margin }
                id={ blockId }
                setAttributes={ setAttributes }
            />

            <div { ...blockProps }>
                <div className="wrapper">
                    <div { ...innerBlocksProps } />
                </div>
            </div>
        </Fragment>
    );
};

export default EditHeaderIntro;
