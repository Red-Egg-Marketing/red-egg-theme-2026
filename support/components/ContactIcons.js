/**
 * ContactIcons Component
 *
 * Icon rows for contact info. Each row supports three
 * icon sources (priority: inline SVG markup → uploaded
 * image → predefined dropdown SVG):
 *   - Predefined SVG via dropdown (email, phone, etc.)
 *   - Uploaded image icon (MediaUpload)
 *   - Raw inline SVG markup (paste)
 *
 * Mirrors the flip-card block's dual-icon editing.
 *
 * Usage (edit):
 *   <ContactIcons
 *       icons={ icons }
 *       setAttributes={ setAttributes }
 *   />
 *
 * Usage (save):
 *   <ContactIcons.View icons={ icons } />
 */

const { Fragment } = wp.element;
const { RichText, MediaUpload } = wp.blockEditor;
const { Button, SelectControl, TextareaControl } = wp.components;
const { __ } = wp.i18n;

/**
 * SVG icon definitions keyed by slug.
 * Each returns a raw SVG element.
 */
const iconSVGs = {
    email: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 4L12 13 2 4" />
        </svg>
    ),
    phone: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
    ),
    location: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    ),
    clock: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
        </svg>
    ),
    globe: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" />
        </svg>
    ),
    chat: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
    ),
    user: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    ),
    calendar: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    ),
};

const iconOptions = [
    { label: __( 'Email', 'red-egg' ), value: 'email' },
    { label: __( 'Phone', 'red-egg' ), value: 'phone' },
    { label: __( 'Location', 'red-egg' ), value: 'location' },
    { label: __( 'Clock', 'red-egg' ), value: 'clock' },
    { label: __( 'Globe', 'red-egg' ), value: 'globe' },
    { label: __( 'Chat', 'red-egg' ), value: 'chat' },
    { label: __( 'User', 'red-egg' ), value: 'user' },
    { label: __( 'Calendar', 'red-egg' ), value: 'calendar' },
];

/**
 * Get SVG markup string for a given icon slug.
 * Used in the save/view component for static HTML output.
 */
const getIconSVGString = ( slug ) => {
    const svgMap = {
        email: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>',
        phone: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>',
        location: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
        clock: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
        globe: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/></svg>',
        chat: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
        user: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
        calendar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    };
    return svgMap[ slug ] || svgMap.email;
};

/**
 * Render the icon preview for a row in the editor.
 * Priority: inline SVG markup → uploaded image → predefined SVG.
 */
const renderIconPreview = ( row ) => {
    if ( row.svgMarkup ) {
        return (
            <div
                className="contact-icons__svg"
                dangerouslySetInnerHTML={ { __html: row.svgMarkup } }
            />
        );
    }
    if ( row.iconImage ) {
        return (
            <img
                className="contact-icons__img"
                src={ row.iconImage }
                alt={ row.iconImageAlt || '' }
            />
        );
    }
    return iconSVGs[ row.icon ] || iconSVGs.email;
};

/**
 * ContactIcons Edit Component
 */
const ContactIcons = ( { icons, setAttributes } ) => {

    const updateIconField = ( index, field, value ) => {
        let updated = JSON.parse( JSON.stringify( icons ) );
        updated[ index ][ field ] = value;
        setAttributes( { icons: updated } );
    };

    const addIcon = () => {
        let updated = JSON.parse( JSON.stringify( icons ) );
        updated.push( { icon: 'email', text: '', iconImage: '', iconImageId: 0, iconImageAlt: '', svgMarkup: '' } );
        setAttributes( { icons: updated } );
    };

    const removeIcon = ( index ) => {
        let updated = JSON.parse( JSON.stringify( icons ) );
        updated.splice( index, 1 );
        setAttributes( { icons: updated } );
    };

    return (
        <div className="contact-icons">
            { icons.map( ( row, i ) => (
                <div className="contact-icons__row" key={ i }>
                    <div className="contact-icons__icon">
                        { renderIconPreview( row ) }
                    </div>
                    <div className="contact-icons__text-wrap">
                        <RichText
                            tagName="p"
                            className="contact-icons__text"
                            value={ row.text }
                            onChange={ ( val ) => updateIconField( i, 'text', val ) }
                            placeholder={ __( 'Contact info…', 'red-egg' ) }
                        />
                    </div>
                    <div className="contact-icons__controls">
                        <SelectControl
                            label={ __( 'Preset Icon', 'red-egg' ) }
                            value={ row.icon }
                            options={ iconOptions }
                            onChange={ ( val ) => updateIconField( i, 'icon', val ) }
                            help={ __( 'Used when no image or SVG is set.', 'red-egg' ) }
                            __nextHasNoMarginBottom
                        />

                        <MediaUpload
                            onSelect={ ( media ) => {
                                let updated = JSON.parse( JSON.stringify( icons ) );
                                updated[ i ].iconImage = media.url;
                                updated[ i ].iconImageId = media.id;
                                updated[ i ].iconImageAlt = media.alt || '';
                                setAttributes( { icons: updated } );
                            } }
                            allowedTypes={ [ 'image' ] }
                            value={ row.iconImageId }
                            render={ ( { open } ) => (
                                <div className="contact-icons__media">
                                    <Button onClick={ open } variant="secondary" isSmall>
                                        { row.iconImage ? __( 'Replace Image', 'red-egg' ) : __( 'Upload Image', 'red-egg' ) }
                                    </Button>
                                    { row.iconImage && (
                                        <Button
                                            onClick={ () => {
                                                let updated = JSON.parse( JSON.stringify( icons ) );
                                                updated[ i ].iconImage = '';
                                                updated[ i ].iconImageId = 0;
                                                updated[ i ].iconImageAlt = '';
                                                setAttributes( { icons: updated } );
                                            } }
                                            variant="link"
                                            isDestructive
                                            isSmall
                                        >
                                            { __( 'Remove Image', 'red-egg' ) }
                                        </Button>
                                    ) }
                                </div>
                            ) }
                        />

                        <TextareaControl
                            label={ __( 'Inline SVG', 'red-egg' ) }
                            help={ __( 'Paste raw SVG. Overrides image and preset.', 'red-egg' ) }
                            value={ row.svgMarkup || '' }
                            onChange={ ( val ) => updateIconField( i, 'svgMarkup', val ) }
                            rows={ 4 }
                        />

                        <Button
                            isDestructive
                            isSmall
                            onClick={ () => removeIcon( i ) }
                        >
                            { __( 'Remove Row', 'red-egg' ) }
                        </Button>
                    </div>
                </div>
            ) ) }
            <Button
                className="button"
                onClick={ addIcon }
            >
                { __( 'Add Contact Item', 'red-egg' ) }
            </Button>
        </div>
    );
};

/**
 * ContactIcons View (Save) Component
 */
ContactIcons.View = ( { icons } ) => {
    return (
        <div className="contact-icons">
            { icons.map( ( row, i ) => {
                let iconEl;
                if ( row.svgMarkup ) {
                    iconEl = (
                        <div
                            className="contact-icons__icon contact-icons__icon--svg"
                            dangerouslySetInnerHTML={ { __html: row.svgMarkup } }
                        />
                    );
                } else if ( row.iconImage ) {
                    iconEl = (
                        <div className="contact-icons__icon contact-icons__icon--img">
                            <img src={ row.iconImage } alt={ row.iconImageAlt || '' } loading="lazy" />
                        </div>
                    );
                } else {
                    iconEl = (
                        <div
                            className="contact-icons__icon"
                            dangerouslySetInnerHTML={ { __html: getIconSVGString( row.icon ) } }
                        />
                    );
                }

                return (
                    <div className="contact-icons__row" key={ i }>
                        { iconEl }
                        <RichText.Content
                            tagName="p"
                            className="contact-icons__text"
                            value={ row.text }
                        />
                    </div>
                );
            } ) }
        </div>
    );
};

export default ContactIcons;
