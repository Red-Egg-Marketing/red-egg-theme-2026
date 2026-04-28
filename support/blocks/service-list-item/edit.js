/**
 * Service List Item Block – Edit Component
 *
 * Dark gray bar with editable title and description.
 * Link URL set via InspectorControls.
 */

const { Fragment } = wp.element;
const { RichText, InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, TextControl, ToggleControl } = wp.components;
const { __ } = wp.i18n;

const EditServiceListItem = ( { attributes, setAttributes } ) => {
    const { title, description, linkUrl, linkTarget } = attributes;

    const blockProps = useBlockProps( {
        className: 'service-list-item',
    } );

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody
                    title={ __( 'Link Settings', 'red-egg' ) }
                    initialOpen={ true }
                >
                    <TextControl
                        label={ __( 'Link URL', 'red-egg' ) }
                        value={ linkUrl }
                        onChange={ ( val ) => setAttributes( { linkUrl: val } ) }
                        placeholder="https://"
                    />
                    <ToggleControl
                        label={ __( 'Open in new tab', 'red-egg' ) }
                        checked={ !! linkTarget }
                        onChange={ () => setAttributes( { linkTarget: ! linkTarget } ) }
                    />
                </PanelBody>
            </InspectorControls>

            <div { ...blockProps }>
                <div className="service-list-item__inner">
                    <div className="service-list-item__title-col">
                        <RichText
                            tagName="h3"
                            className="service-list-item__title"
                            value={ title }
                            onChange={ ( val ) => setAttributes( { title: val } ) }
                            placeholder={ __( 'Service Title…', 'red-egg' ) }
                            allowedFormats={ [] }
                        />
                    </div>
                    <div className="service-list-item__arrow">
                        <i className="fa-light fa-arrow-right"></i>
                    </div>
                    <div className="service-list-item__desc-col">
                        <RichText
                            tagName="p"
                            className="service-list-item__description"
                            value={ description }
                            onChange={ ( val ) => setAttributes( { description: val } ) }
                            placeholder={ __( 'Service description…', 'red-egg' ) }
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditServiceListItem;
