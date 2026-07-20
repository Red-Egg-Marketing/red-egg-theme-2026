/**
 * IconPicker – Shared Component
 *
 * Searchable, visual Font Awesome icon picker for InspectorControls.
 * Stores the same full class string ("fa-light fa-arrow-right") the
 * existing icon attributes already use, so save markup is unchanged.
 *
 * The icon index (support/assets/icons.json, generated from the
 * official FA metadata) is fetched lazily the first time a picker is
 * opened and cached module-wide. Icons render as real <i> elements —
 * the FA Pro kit is enqueued in the editor, so previews are live.
 *
 * Usage:
 *   <IconPicker
 *       label={ __( 'Icon', 'red-egg' ) }
 *       value={ faClass }
 *       onChange={ ( val ) => setAttributes( { faClass: val } ) }
 *   />
 */

const { useState, useMemo } = wp.element;
const { BaseControl, Button, ButtonGroup, Popover, TextControl, Spinner } = wp.components;
const { __ } = wp.i18n;

const STYLES = [
    { key: 'light', label: __( 'Light', 'red-egg' ) },
    { key: 'regular', label: __( 'Regular', 'red-egg' ) },
    { key: 'solid', label: __( 'Solid', 'red-egg' ) },
    { key: 'brands', label: __( 'Brands', 'red-egg' ) },
];

const MAX_RESULTS = 96;

// Module-wide cache so the index is fetched once per editor session.
let iconIndexPromise = null;

function loadIconIndex() {
    if ( ! iconIndexPromise ) {
        const url =
            window.redEggEditor && window.redEggEditor.iconsUrl
                ? window.redEggEditor.iconsUrl
                : null;
        iconIndexPromise = url
            ? window
                  .fetch( url )
                  .then( ( res ) => ( res.ok ? res.json() : [] ) )
                  .catch( () => [] )
            : Promise.resolve( [] );
    }
    return iconIndexPromise;
}

// "fa-light fa-arrow-right" -> { style: 'light', name: 'arrow-right' }
function parseValue( value ) {
    const result = { style: 'light', name: '' };
    if ( ! value ) {
        return result;
    }
    value.split( /\s+/ ).forEach( ( cls ) => {
        const styleMatch = STYLES.find( ( s ) => cls === 'fa-' + s.key );
        if ( styleMatch ) {
            result.style = styleMatch.key;
        } else if ( cls.indexOf( 'fa-' ) === 0 ) {
            result.name = cls.slice( 3 );
        }
    } );
    return result;
}

const IconPicker = ( { label, value, onChange, help } ) => {
    const [ isOpen, setIsOpen ] = useState( false );
    const [ icons, setIcons ] = useState( null );
    const [ query, setQuery ] = useState( '' );
    const current = parseValue( value );
    const [ style, setStyle ] = useState( current.style );

    const openPicker = () => {
        setIsOpen( true );
        loadIconIndex().then( setIcons );
    };

    const results = useMemo( () => {
        if ( ! icons ) {
            return [];
        }
        const wantBrands = style === 'brands';
        const q = query.trim().toLowerCase();
        const matches = [];
        for ( let i = 0; i < icons.length; i++ ) {
            const icon = icons[ i ];
            if ( wantBrands !== !! icon.b ) {
                continue;
            }
            if ( q ) {
                const inName =
                    icon.n.indexOf( q ) !== -1 ||
                    icon.l.toLowerCase().indexOf( q ) !== -1;
                const inTerms =
                    icon.t &&
                    icon.t.some( ( t ) => t.toLowerCase().indexOf( q ) !== -1 );
                if ( ! inName && ! inTerms ) {
                    continue;
                }
            }
            matches.push( icon );
            if ( matches.length >= MAX_RESULTS ) {
                break;
            }
        }
        return matches;
    }, [ icons, query, style ] );

    const classFor = ( icon ) =>
        ( icon.b ? 'fa-brands' : 'fa-' + style ) + ' fa-' + icon.n;

    return (
        <BaseControl label={ label } help={ help } __nextHasNoMarginBottom>
            <div className="re-icon-picker">
                <Button
                    className="re-icon-picker__toggle"
                    variant="secondary"
                    onClick={ openPicker }
                >
                    { value ? (
                        <span className="re-icon-picker__current">
                            <i className={ value }></i>
                            <span>{ current.name || value }</span>
                        </span>
                    ) : (
                        __( 'Choose icon…', 'red-egg' )
                    ) }
                </Button>

                { value && (
                    <Button
                        variant="link"
                        isDestructive
                        onClick={ () => onChange( '' ) }
                    >
                        { __( 'Clear', 'red-egg' ) }
                    </Button>
                ) }

                { isOpen && (
                    <Popover
                        className="re-icon-picker__popover"
                        onClose={ () => setIsOpen( false ) }
                        placement="left-start"
                        offset={ 12 }
                    >
                        <div className="re-icon-picker__panel">
                            <TextControl
                                placeholder={ __( 'Search icons…', 'red-egg' ) }
                                value={ query }
                                onChange={ setQuery }
                                autoFocus
                                __nextHasNoMarginBottom
                            />

                            <ButtonGroup className="re-icon-picker__styles">
                                { STYLES.map( ( s ) => (
                                    <Button
                                        key={ s.key }
                                        isSmall
                                        variant={
                                            style === s.key
                                                ? 'primary'
                                                : 'secondary'
                                        }
                                        onClick={ () => setStyle( s.key ) }
                                    >
                                        { s.label }
                                    </Button>
                                ) ) }
                            </ButtonGroup>

                            { ! icons && (
                                <div className="re-icon-picker__loading">
                                    <Spinner />
                                </div>
                            ) }

                            { icons && (
                                <div className="re-icon-picker__grid">
                                    { results.map( ( icon ) => {
                                        const cls = classFor( icon );
                                        return (
                                            <button
                                                key={ icon.n }
                                                type="button"
                                                className={
                                                    're-icon-picker__item' +
                                                    ( cls === value
                                                        ? ' is-selected'
                                                        : '' )
                                                }
                                                title={ icon.l }
                                                onClick={ () => {
                                                    onChange( cls );
                                                    setIsOpen( false );
                                                } }
                                            >
                                                <i className={ cls }></i>
                                            </button>
                                        );
                                    } ) }
                                    { results.length === 0 && (
                                        <p className="re-icon-picker__empty">
                                            { __( 'No icons found.', 'red-egg' ) }
                                        </p>
                                    ) }
                                </div>
                            ) }

                            { icons && results.length >= MAX_RESULTS && (
                                <p className="re-icon-picker__hint">
                                    { __( 'Showing first 96 — keep typing to narrow down.', 'red-egg' ) }
                                </p>
                            ) }
                        </div>
                    </Popover>
                ) }
            </div>

            <TextControl
                className="re-icon-picker__manual"
                label={ __( 'Or enter a class manually', 'red-egg' ) }
                value={ value }
                onChange={ onChange }
                __nextHasNoMarginBottom
            />
        </BaseControl>
    );
};

export default IconPicker;
