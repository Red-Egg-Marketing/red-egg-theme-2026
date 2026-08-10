/**
 * Reveal Animation Toggle – Block Extension
 *
 * Adds a "Reveal animation" control to the core Heading block (h1–h6).
 * When set, the heading gets a `has-reveal has-reveal--{style}` class;
 * the frontend (support/js/reveal-anim.js) animates that heading into
 * view on scroll with GSAP.
 *
 * Same three-filter shape as the lightbox/melt extensions.
 */

const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl } = wp.components;
const { __ } = wp.i18n;

const ENABLED_BLOCKS = [ 'core/heading', 'core/paragraph', 'core/list' ];

const ATTR = 'revealAnim';

const OPTIONS = [
	{ label: __( 'None', 'red-egg' ), value: '' },
	{ label: __( 'Reveal up (mask)', 'red-egg' ), value: 'reveal-up' },
	{ label: __( 'Fade up', 'red-egg' ), value: 'fade-up' },
	{ label: __( 'Fade in', 'red-egg' ), value: 'fade-in' },
];

// 1. Register the attribute.
addFilter(
	'blocks.registerBlockType',
	'red-egg/reveal-anim-attribute',
	function ( settings, name ) {
		if ( ! ENABLED_BLOCKS.includes( name ) ) {
			return settings;
		}
		settings.attributes = {
			...settings.attributes,
			[ ATTR ]: { type: 'string', default: '' },
		};
		return settings;
	}
);

// 2. Add the control.
const withRevealControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { name, attributes, setAttributes, isSelected } = props;

		if ( ! ENABLED_BLOCKS.includes( name ) ) {
			return <BlockEdit { ...props } />;
		}

		return (
			<Fragment>
				<BlockEdit { ...props } />
				{ isSelected && (
					<InspectorControls>
						<PanelBody
							title={ __( 'Animation', 'red-egg' ) }
							initialOpen={ false }
						>
							<SelectControl
								label={ __( 'Reveal animation', 'red-egg' ) }
								help={ __(
									'Animate this block in as it scrolls onscreen.',
									'red-egg'
								) }
								value={ attributes[ ATTR ] || '' }
								options={ OPTIONS }
								onChange={ ( value ) =>
									setAttributes( { [ ATTR ]: value } )
								}
								__nextHasNoMarginBottom
							/>
						</PanelBody>
					</InspectorControls>
				) }
			</Fragment>
		);
	};
}, 'withRevealControl' );

addFilter( 'editor.BlockEdit', 'red-egg/reveal-anim-control', withRevealControl );

// 3. Write the opt-in class to saved markup.
addFilter(
	'blocks.getSaveContent.extraProps',
	'red-egg/reveal-anim-save',
	function ( extraProps, blockType, attributes ) {
		if ( ! ENABLED_BLOCKS.includes( blockType.name ) ) {
			return extraProps;
		}
		if ( attributes[ ATTR ] ) {
			extraProps.className =
				( extraProps.className || '' ) +
				' has-reveal has-reveal--' +
				attributes[ ATTR ];
		}
		return extraProps;
	}
);
