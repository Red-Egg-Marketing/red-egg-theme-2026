/**
 * Contact Section Block – Edit Component
 */

const { Fragment } = wp.element;
const { RichText, InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, TextControl, TextareaControl } = wp.components;
const { __ } = wp.i18n;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const EditContactSection = ( { attributes, setAttributes, clientId } ) => {
    const {
        sectionLabel,
        heading,
        email,
        phone,
        addressLine1,
        addressLine2,
        formShortcode,
        padding,
        margin,
    } = attributes;

    const blockId = `block-${ clientId }`;

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'contact-section',
    } );

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={ __( 'Contact Info', 'red-egg' ) }>
                    <TextControl
                        label={ __( 'Email', 'red-egg' ) }
                        value={ email }
                        onChange={ ( val ) => setAttributes( { email: val } ) }
                    />
                    <TextControl
                        label={ __( 'Phone', 'red-egg' ) }
                        value={ phone }
                        onChange={ ( val ) => setAttributes( { phone: val } ) }
                    />
                    <TextControl
                        label={ __( 'Address Line 1', 'red-egg' ) }
                        value={ addressLine1 }
                        onChange={ ( val ) => setAttributes( { addressLine1: val } ) }
                    />
                    <TextControl
                        label={ __( 'Address Line 2', 'red-egg' ) }
                        value={ addressLine2 }
                        onChange={ ( val ) => setAttributes( { addressLine2: val } ) }
                    />
                </PanelBody>
                <PanelBody title={ __( 'Form Settings', 'red-egg' ) }>
                    <TextareaControl
                        label={ __( 'Form Shortcode', 'red-egg' ) }
                        help={ __( 'Paste a Gravity Forms, CF7, or WPForms shortcode. Leave blank to use the default styled form markup.', 'red-egg' ) }
                        value={ formShortcode }
                        onChange={ ( val ) => setAttributes( { formShortcode: val } ) }
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
                <div className="contact-section__bg"></div>
                <div className="block-wrapper">
                    <div className="contact-section__left">
                        <RichText
                            tagName="p"
                            className="contact-section__label"
                            value={ sectionLabel }
                            onChange={ ( val ) => setAttributes( { sectionLabel: val } ) }
                            placeholder={ __( 'Section label…', 'red-egg' ) }
                        />
                        <RichText
                            tagName="h2"
                            className="contact-section__heading"
                            value={ heading }
                            onChange={ ( val ) => setAttributes( { heading: val } ) }
                            placeholder={ __( 'Heading…', 'red-egg' ) }
                        />

                        <div className="contact-section__info">
                            <div className="contact-section__info-item">
                                <span className="contact-section__icon contact-section__icon--email"></span>
                                <span className="contact-section__info-text">{ email }</span>
                            </div>
                            <div className="contact-section__info-item">
                                <span className="contact-section__icon contact-section__icon--phone"></span>
                                <span className="contact-section__info-text">{ phone }</span>
                            </div>
                            <div className="contact-section__info-item">
                                <span className="contact-section__icon contact-section__icon--location"></span>
                                <span className="contact-section__info-text">
                                    { addressLine1 }<br />{ addressLine2 }
                                </span>
                            </div>
                        </div><!-- .contact-section__info -->
                    </div><!-- .contact-section__left -->

                    <div className="contact-section__right">
                        { formShortcode ? (
                            <div className="contact-section__shortcode-preview">
                                <p>{ __( 'Form shortcode:', 'red-egg' ) }</p>
                                <code>{ formShortcode }</code>
                            </div>
                        ) : (
                            <div className="contact-section__form-preview">
                                <div className="contact-section__form-row">
                                    <div className="contact-section__field">
                                        <span className="contact-section__field-placeholder">First Name</span>
                                    </div>
                                    <div className="contact-section__field">
                                        <span className="contact-section__field-placeholder">Last Name</span>
                                    </div>
                                </div>
                                <div className="contact-section__form-row">
                                    <div className="contact-section__field">
                                        <span className="contact-section__field-placeholder">Phone</span>
                                    </div>
                                    <div className="contact-section__field">
                                        <span className="contact-section__field-placeholder">Email</span>
                                    </div>
                                </div>
                                <div className="contact-section__form-row">
                                    <div className="contact-section__field contact-section__field--full">
                                        <span className="contact-section__field-placeholder">Message</span>
                                    </div>
                                </div>
                                <div className="contact-section__form-submit">
                                    <span className="btn-gray">
                                        <span>SUBMIT</span>
                                        <span className="btn-arrow"></span>
                                    </span>
                                </div>
                            </div>
                        ) }
                    </div><!-- .contact-section__right -->
                </div><!-- .block-wrapper -->
            </section>
        </Fragment>
    );
};

export default EditContactSection;
