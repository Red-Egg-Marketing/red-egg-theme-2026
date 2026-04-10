/**
 * Margin Component
 * 
 * Shared InspectorControls panel for controlling block margin.
 * Usage in edit.js:
 *   import Margin from '../../components/Margin';
 *   <Margin margin={attributes.margin} setAttributes={setAttributes} />
 * 
 * Attributes schema (add to block registration):
 *   margin: {
 *       type: 'object',
 *       default: {
 *           margintop: true,
 *           marginbottom: true,
 *       }
 *   }
 */

const { PanelBody, ToggleControl } = wp.components;
const { __ } = wp.i18n;

const Margin = ( { margin, setAttributes } ) => {

    const updateMargin = ( key ) => {
        let newMargin = JSON.parse( JSON.stringify( margin ) );
        newMargin[ key ] = ! margin[ key ];
        setAttributes( { margin: newMargin } );
    };

    return (
        <PanelBody title={ __( 'Margin', 'red-egg' ) } initialOpen={ false }>
            <ToggleControl
                label={ __( 'Margin Top', 'red-egg' ) }
                checked={ margin.margintop }
                onChange={ () => updateMargin( 'margintop' ) }
            />
            <ToggleControl
                label={ __( 'Margin Bottom', 'red-egg' ) }
                checked={ margin.marginbottom }
                onChange={ () => updateMargin( 'marginbottom' ) }
            />
        </PanelBody>
    );
};

/**
 * Helper: returns CSS classes based on margin state
 * Usage: getMarginClasses( attributes.margin )
 * Returns: string like "no-margin-top no-margin-bottom"
 */
export const getMarginClasses = ( margin ) => {
    let classes = [];
    if ( ! margin.margintop ) {
        classes.push( 'no-margin-top' );
    }
    if ( ! margin.marginbottom ) {
        classes.push( 'no-margin-bottom' );
    }
    return classes.join( ' ' );
};

export default Margin;
