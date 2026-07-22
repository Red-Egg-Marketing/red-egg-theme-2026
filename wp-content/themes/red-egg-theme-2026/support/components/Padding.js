
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { Button, PanelBody, TextControl, ButtonGroup, Flex, FlexItem, TabPanel } = wp.components;
const { __ } = wp.i18n;

/**
 * PaddingSelector – shared component
 *
 * Per-side padding with unit selection, injected as an inline <style>
 * scoped to the block ID. Desktop and Mobile values are independent:
 * desktop applies at all widths; mobile overrides at and below the
 * breakpoint (default {MOBILE_BREAKPOINT}px, overridable per block).
 *
 * Mobile values live under padding.mobile inside the existing padding
 * object attribute, so no block registration changes are needed and
 * legacy blocks (no mobile values) keep byte-identical save output.
 */

const MOBILE_BREAKPOINT = 767;

const SIDES = [
    { key: 'paddingtop', label: __( 'Top' ) },
    { key: 'paddingright', label: __( 'Right' ) },
    { key: 'paddingbottom', label: __( 'Bottom' ) },
    { key: 'paddingleft', label: __( 'Left' ) },
];

const UNITS = [ 'px', '%', 'em', 'rem' ];

const cssProp = ( key ) => key.replace( 'padding', 'padding-' );

const buildCss = ( values, unit ) => {
    let out = '';
    SIDES.forEach( ( side ) => {
        if ( values[ side.key ] ) {
            out += cssProp( side.key ) + ':' + values[ side.key ] + unit + ';';
        }
    } );
    return out;
};

const hasValues = ( values ) =>
    !! ( values && SIDES.some( ( side ) => values[ side.key ] ) );

const PaddingSelector = ( props ) => {
    const { padding, id } = props;
    const mobile = padding.mobile || {};
    const mobileUnit = mobile.unit || padding.unit;
    const breakpoint = parseInt( mobile.breakpoint, 10 ) || MOBILE_BREAKPOINT;

    const update = ( changes, isMobile ) => {
        let newBody = JSON.parse( JSON.stringify( padding ) );
        if ( isMobile ) {
            newBody.mobile = newBody.mobile || {};
            Object.assign( newBody.mobile, changes );
        } else {
            Object.assign( newBody, changes );
        }
        props.setAttributes( { padding: newBody } );
    };

    const renderFields = ( values, unit, isMobile ) => (
        <Fragment>
            <Flex>
                { SIDES.map( ( side ) => (
                    <FlexItem key={ side.key }>
                        <TextControl
                            label={ side.label }
                            value={ values[ side.key ] || '' }
                            type="number"
                        min="0"
                            onChange={ ( val ) => update( { [ side.key ]: val }, isMobile ) }
                        />
                    </FlexItem>
                ) ) }
            </Flex>
            <ButtonGroup>
                { UNITS.map( ( u ) => (
                    <Button
                        key={ u }
                        value={ u }
                        isPressed={ unit === u }
                        onClick={ () => update( { unit: u }, isMobile ) }
                    >
                        { u }
                    </Button>
                ) ) }
            </ButtonGroup>
            { isMobile && (
                <TextControl
                    label={ __( 'Breakpoint (px)' ) }
                    help={ __( 'Mobile values apply at and below this width. Leave blank for the default (' + MOBILE_BREAKPOINT + 'px).' ) }
                    value={ mobile.breakpoint || '' }
                    type="number"
                    placeholder={ String( MOBILE_BREAKPOINT ) }
                    onChange={ ( val ) => update( { breakpoint: val }, true ) }
                />
            ) }
        </Fragment>
    );

    const desktopCss = buildCss( padding, padding.unit );
    const mobileCss = buildCss( mobile, mobileUnit );

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={ __( 'Padding' ) } initialOpen={ false }>
                    <TabPanel
                        className="re-responsive-tabs"
                        tabs={ [
                            { name: 'desktop', title: __( 'Desktop' ) },
                            { name: 'mobile', title: __( 'Mobile' ) },
                        ] }
                    >
                        { ( tab ) =>
                            tab.name === 'mobile'
                                ? renderFields( mobile, mobileUnit, true )
                                : renderFields( padding, padding.unit, false )
                        }
                    </TabPanel>
                </PanelBody>
            </InspectorControls>

            { ( desktopCss || mobileCss ) && (
                <style type="text/css">
                    { ( desktopCss ? `#${id} { ${desktopCss} }` : '' )
                        + ( mobileCss ? ` @media (max-width: ${breakpoint}px) { #${id} { ${mobileCss} } }` : '' ) }
                </style>
            ) }
        </Fragment>
    );
};

PaddingSelector.View = ( props ) => {
    const { padding, id } = props;
    const mobile = padding.mobile || {};
    const mobileUnit = mobile.unit || padding.unit;
    const breakpoint = parseInt( mobile.breakpoint, 10 ) || MOBILE_BREAKPOINT;

    const mobileStyle = hasValues( mobile ) ? (
        <style type="text/css">
            { `@media (max-width: ${breakpoint}px) { #${id} { ${buildCss( mobile, mobileUnit )} } }` }
        </style>
    ) : null;

    if (padding.paddingleft || padding.paddingright || padding.paddingtop || padding.paddingbottom) {
       let string = padding.paddingtop ? 'padding-top:' + padding.paddingtop + padding.unit + ';' : '';
        string += padding.paddingright ? 'padding-right:' + padding.paddingright + padding.unit + ';' : '';
        string += padding.paddingbottom ? 'padding-bottom:' + padding.paddingbottom + padding.unit + ';' : '';
        string += padding.paddingleft ? 'padding-left:' + padding.paddingleft + padding.unit + ';' : '';
	   return (
        <Fragment>
            <style type="text/css">
               {    `#${id} {
                        ${string}
                    }`
                }
            </style>
            { mobileStyle }
        </Fragment>
        );
    } else if ( mobileStyle ) {
        return mobileStyle;
    } else {
        return null;
    }
};

export default PaddingSelector;
