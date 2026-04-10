/**
 * Padding Component
 * 
 * Shared InspectorControls panel for controlling block padding.
 * Usage in edit.js:
 *   import Padding from '../../components/Padding';
 *   <Padding padding={attributes.padding} setAttributes={setAttributes} />
 * 
 * Attributes schema (add to block registration):
 *   padding: {
 *       type: 'object',
 *       default: {
 *           paddingtop: true,
 *           paddingbottom: true,
 *       }
 *   }
 */

const { PanelBody, ToggleControl } = wp.components;
const { __ } = wp.i18n;

const Padding = ( { padding, setAttributes } ) => {

    const updatePadding = ( key ) => {
        let newPadding = JSON.parse( JSON.stringify( padding ) );
        newPadding[ key ] = ! padding[ key ];
        setAttributes( { padding: newPadding } );
    };

    return (
        <PanelBody title={ __( 'Padding', 'red-egg' ) } initialOpen={ false }>
            <ToggleControl
                label={ __( 'Padding Top', 'red-egg' ) }
                checked={ padding.paddingtop }
                onChange={ () => updatePadding( 'paddingtop' ) }
            />
            <ToggleControl
                label={ __( 'Padding Bottom', 'red-egg' ) }
                checked={ padding.paddingbottom }
                onChange={ () => updatePadding( 'paddingbottom' ) }
            />
        </PanelBody>
    );
};

/**
 * Helper: returns CSS classes based on padding state
 * Usage: getPaddingClasses( attributes.padding )
 * Returns: string like "no-padding-top no-padding-bottom"
 */
export const getPaddingClasses = ( padding ) => {
    let classes = [];
    if ( ! padding.paddingtop ) {
        classes.push( 'no-padding-top' );
    }
    if ( ! padding.paddingbottom ) {
        classes.push( 'no-padding-bottom' );
    }
    return classes.join( ' ' );
};

export default Padding;
