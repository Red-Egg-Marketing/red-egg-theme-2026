/**
 * Hero Block – Edit Component
 */

const { Fragment } = wp.element;
const { RichText, MediaUpload, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, TextControl } = wp.components;
const { __ } = wp.i18n;

import Padding, { getPaddingClasses } from '../../components/Padding';
import Margin, { getMarginClasses } from '../../components/Margin';

const EditHero = ( { attributes, setAttributes } ) => {
    const {
        heading,
        description,
        buttonText,
        buttonUrl,
        backgroundImage,
        backgroundImageId,
        padding,
        margin,
    } = attributes;

    const paddingClasses = getPaddingClasses( padding );
    const marginClasses = getMarginClasses( margin );

    const blockProps = useBlockProps( {
        className: `hero ${ paddingClasses } ${ marginClasses }`.trim(),
    } );

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={ __( 'Hero Settings', 'red-egg' ) }>
                    <TextControl
                        label={ __( 'Button Text', 'red-egg' ) }
                        value={ buttonText }
                        onChange={ ( val ) => setAttributes( { buttonText: val } ) }
                    />
                    <TextControl
                        label={ __( 'Button URL', 'red-egg' ) }
                        value={ buttonUrl }
                        onChange={ ( val ) => setAttributes( { buttonUrl: val } ) }
                    />
                    <div className="components-base-control">
                        <label className="components-base-control__label">
                            { __( 'Background Image (optional)', 'red-egg' ) }
                        </label>
                        <MediaUpload
                            onSelect={ ( media ) => setAttributes( {
                                backgroundImage: media.url,
                                backgroundImageId: media.id,
                            } ) }
                            allowedTypes={ [ 'image' ] }
                            value={ backgroundImageId }
                            render={ ( { open } ) => (
                                <div>
                                    { backgroundImage && (
                                        <img
                                            src={ backgroundImage }
                                            alt=""
                                            style={ { maxWidth: '100%', marginBottom: '10px', borderRadius: '4px' } }
                                        />
                                    ) }
                                    <Button
                                        onClick={ open }
                                        variant="secondary"
                                        style={ { marginRight: '8px' } }
                                    >
                                        { backgroundImage ? __( 'Replace Image', 'red-egg' ) : __( 'Upload Image', 'red-egg' ) }
                                    </Button>
                                    { backgroundImage && (
                                        <Button
                                            onClick={ () => setAttributes( {
                                                backgroundImage: '',
                                                backgroundImageId: 0,
                                            } ) }
                                            variant="link"
                                            isDestructive
                                        >
                                            { __( 'Remove', 'red-egg' ) }
                                        </Button>
                                    ) }
                                </div>
                            ) }
                        />
                    </div>
                </PanelBody>
                <Padding padding={ padding } setAttributes={ setAttributes } />
                <Margin margin={ margin } setAttributes={ setAttributes } />
            </InspectorControls>

            <section { ...blockProps }>
                <div className="hero__bg"></div>
                <div className="block-wrapper">
                    <div className="hero__content">
                        <RichText
                            tagName="h1"
                            className="hero__heading"
                            value={ heading }
                            onChange={ ( val ) => setAttributes( { heading: val } ) }
                            placeholder={ __( 'Hero heading…', 'red-egg' ) }
                        />
                        <RichText
                            tagName="p"
                            className="hero__description"
                            value={ description }
                            onChange={ ( val ) => setAttributes( { description: val } ) }
                            placeholder={ __( 'Hero description…', 'red-egg' ) }
                        />
                        <div className="hero__cta">
                            <span className="btn-gray">
                                <span>{ buttonText }</span>
                                <span className="btn-arrow"></span>
                            </span>
                        </div>
                    </div><!-- .hero__content -->
                    <div className="hero__eggs">
                        <div className="hero__egg-grid">
                            <span className="hero__egg hero__egg--white"></span>
                            <span className="hero__egg hero__egg--red"></span>
                            <span className="hero__egg hero__egg--white"></span>
                            <span className="hero__egg hero__egg--white"></span>
                        </div>
                    </div><!-- .hero__eggs -->
                </div><!-- .block-wrapper -->
            </section>
        </Fragment>
    );
};

export default EditHero;
