/**
 * Header Intro Block – Edit Component
 *
 * InnerBlocks for heading + paragraph content.
 * InspectorControls for background image, color, overlay, padding, margin.
 */

const { Fragment } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, ToggleControl } = wp.components;
const { __ } = wp.i18n;

import BackgroundColor from '../../components/BackgroundColor.js';
import BackgroundSelector from '../../components/BackgroundSelector.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'core/heading', { level: 2, className: 'header-title' } ],
    [ 'core/paragraph', { placeholder: 'Intro paragraph...' } ],
];

const allowedBlocks = [
    'core/heading',
    'core/paragraph',
    'core/list',
    'core/buttons',
];

const EditHeaderIntro = ( { attributes, setAttributes, clientId } ) => {
    const {
        image, bgColor, bgSlug, coloroverlay, padding, margin,
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

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'header-intro-block'
            + ( coloroverlay ? ' with-overlay' : '' )
            + ( bgSlug ? ' ' + bgSlug + ' with-bg' : '' ),
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
                    title={ __( 'Overlay', 'red-egg' ) }
                    initialOpen={ false }
                >
                    <ToggleControl
                        label={ __( 'Background Overlay', 'red-egg' ) }
                        checked={ coloroverlay }
                        onChange={ ( value ) => setAttributes( { coloroverlay: value } ) }
                    />
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
                <div className="block-wrapper">
                    <InnerBlocks
                        template={ template }
                        allowedBlocks={ allowedBlocks }
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default EditHeaderIntro;
