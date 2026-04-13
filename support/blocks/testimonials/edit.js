/**
 * Testimonials Block – Edit Component
 *
 * InnerBlocks for header-intro at the top.
 * TextControl for the reviews plugin shortcode.
 * Shortcode is processed by PHP render callback on frontend.
 */

const { Fragment } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, TextControl } = wp.components;
const { __ } = wp.i18n;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'red-egg-block/header-intro', {} ],
];

const allowedBlocks = [
    'red-egg-block/header-intro',
    'core/heading',
    'core/paragraph',
    'core/buttons',
];

const EditTestimonials = ( { attributes, setAttributes, clientId } ) => {
    const { reviewsShortcode, padding, margin } = attributes;

    const blockId = `block-${ clientId }`;

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'testimonials-block',
    } );

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody
                    title={ __( 'Reviews Shortcode', 'red-egg' ) }
                    initialOpen={ true }
                >
                    <TextControl
                        label={ __( 'Shortcode', 'red-egg' ) }
                        value={ reviewsShortcode }
                        onChange={ ( val ) => setAttributes( { reviewsShortcode: val } ) }
                        placeholder='[reviews-shortcode]'
                        help={ __( 'Paste the shortcode from your reviews plugin.', 'red-egg' ) }
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

            <section { ...blockProps }>
                <div className="testimonials-block__bg"></div>
                <div className="testimonials-block__pattern"></div>
                <div className="block-wrapper">
                    <div className="testimonials-block__header">
                        <InnerBlocks
                            template={ template }
                            allowedBlocks={ allowedBlocks }
                        />
                    </div>

                    <div className="testimonials-block__shortcode-preview">
                        { reviewsShortcode ? (
                            <p className="testimonials-block__shortcode-tag">
                                { reviewsShortcode }
                            </p>
                        ) : (
                            <p className="testimonials-block__shortcode-empty">
                                { __( 'Add a reviews shortcode in the block settings panel →', 'red-egg' ) }
                            </p>
                        ) }
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default EditTestimonials;
