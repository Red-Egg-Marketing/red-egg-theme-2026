/**
 * Hero Background Block – Edit Component
 *
 * Two-column hero with hero-content (left) and hero-media (right).
 * Background image/color, mobile bg override, min-height control.
 */

const { Fragment, useEffect } = wp.element;
const { InnerBlocks, useBlockProps, InspectorControls } = wp.blockEditor;
const { PanelBody, RangeControl } = wp.components;
const { __ } = wp.i18n;

import BackgroundSelector from '../../components/BackgroundSelector.js';
import MobileBackgroundSelector from '../../components/MobileBackgroundSelector.js';
import BackgroundColor from '../../components/BackgroundColor.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'red-egg-block/hero-content', {} ],
    [ 'red-egg-block/hero-media', {} ],
];

const allowedBlocks = [
    'red-egg-block/hero-content',
    'red-egg-block/hero-media',
];

const EditHeroBackground = ( { attributes, setAttributes, clientId } ) => {
    const { image, mobileimage, bgColor, bgSlug, minHeight, padding, margin, blockId } = attributes;

    // Persist blockId so save.js emits a matching id for the scoped
    // padding/margin and background image-set <style> to target.
    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );
    const effectiveBlockId = blockId || `block-${ clientId }`;

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

    if ( minHeight > 0 ) {
        bgStyle.minHeight = minHeight + 'px';
    }

    const blockProps = useBlockProps( {
        id: effectiveBlockId,
        className: 'hero-background' + ( bgSlug ? ' ' + bgSlug : '' ),
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
                <MobileBackgroundSelector
                    image={ mobileimage }
                    updateProp="mobileimage"
                    setAttributes={ setAttributes }
                />
                <PanelBody
                    title={ __( 'Hero Height', 'red-egg' ) }
                    initialOpen={ false }
                >
                    <RangeControl
                        label={ __( 'Minimum Height (px)', 'red-egg' ) }
                        value={ minHeight }
                        onChange={ ( val ) => setAttributes( { minHeight: val } ) }
                        min={ 0 }
                        max={ 900 }
                        step={ 10 }
                        help={ __( '0 = auto height based on content', 'red-egg' ) }
                    />
                </PanelBody>
            </InspectorControls>

            <PaddingSelector
                padding={ padding }
                id={ effectiveBlockId }
                setAttributes={ setAttributes }
            />
            <MarginSelector
                margin={ margin }
                id={ effectiveBlockId }
                setAttributes={ setAttributes }
            />

            <section { ...blockProps } style={ bgStyle }>
                <div className="block-wrapper">
                    <div className="hero-background__columns">
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

export default EditHeroBackground;
