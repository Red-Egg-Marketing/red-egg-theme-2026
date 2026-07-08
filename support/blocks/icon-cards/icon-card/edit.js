const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { PanelBody, ToggleControl, TextareaControl, Button } = wp.components;
const { __ } = wp.i18n;

const TEMPLATE = [
    [ 'core/heading', { level: 3, placeholder: 'Card title…' } ],
    [ 'core/paragraph', { placeholder: 'Card description…' } ],
];

const EditIconCard = ( { attributes, setAttributes } ) => {
    const { iconType, iconUrl, iconId, iconAlt, iconSvg } = attributes;

    const blockProps = useBlockProps( {
        className: 'icon-card',
    } );

    const useSvg = iconType === 'svg';

    const renderIcon = () => {
        if ( useSvg && iconSvg ) {
            return (
                <span
                    className="icon-card-icon is-svg"
                    dangerouslySetInnerHTML={ { __html: iconSvg } }
                />
            );
        }
        if ( ! useSvg && iconUrl ) {
            return (
                <span className="icon-card-icon is-image">
                    <img src={ iconUrl } alt={ iconAlt } />
                </span>
            );
        }
        return <span className="icon-card-icon is-placeholder" aria-hidden="true" />;
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={ __( 'Icon', 'red-egg' ) } initialOpen={ true }>
                    <ToggleControl
                        label={ __( 'Paste SVG instead of uploading', 'red-egg' ) }
                        checked={ useSvg }
                        onChange={ ( val ) =>
                            setAttributes( { iconType: val ? 'svg' : 'image' } )
                        }
                    />

                    { useSvg ? (
                        <TextareaControl
                            label={ __( 'SVG markup', 'red-egg' ) }
                            help={ __( 'Paste raw <svg>…</svg> code.', 'red-egg' ) }
                            value={ iconSvg }
                            onChange={ ( val ) => setAttributes( { iconSvg: val } ) }
                            rows={ 6 }
                        />
                    ) : (
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={ ( media ) =>
                                    setAttributes( {
                                        iconUrl: media.url,
                                        iconId: media.id,
                                        iconAlt: media.alt || '',
                                    } )
                                }
                                allowedTypes={ [ 'image' ] }
                                value={ iconId }
                                render={ ( { open } ) => (
                                    <Fragment>
                                        { iconUrl && (
                                            <img
                                                src={ iconUrl }
                                                alt={ iconAlt }
                                                style={ { maxWidth: '80px', display: 'block', marginBottom: '8px' } }
                                            />
                                        ) }
                                        <Button variant="secondary" onClick={ open }>
                                            { iconUrl
                                                ? __( 'Replace icon', 'red-egg' )
                                                : __( 'Upload icon', 'red-egg' ) }
                                        </Button>
                                        { iconUrl && (
                                            <Button
                                                variant="link"
                                                isDestructive
                                                onClick={ () =>
                                                    setAttributes( {
                                                        iconUrl: '',
                                                        iconId: 0,
                                                        iconAlt: '',
                                                    } )
                                                }
                                            >
                                                { __( 'Remove', 'red-egg' ) }
                                            </Button>
                                        ) }
                                    </Fragment>
                                ) }
                            />
                        </MediaUploadCheck>
                    ) }
                </PanelBody>
            </InspectorControls>

            <div { ...blockProps }>
                { renderIcon() }
                <div className="icon-card-body">
                    <InnerBlocks template={ TEMPLATE } templateLock={ false } />
                </div>
            </div>
        </Fragment>
    );
};

export default EditIconCard;
