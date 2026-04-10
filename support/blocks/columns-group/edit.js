/**
 * Columns Group Block – Edit Component
 */

const { Fragment } = wp.element;
const { RichText, MediaUpload, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, TextControl, SelectControl, ToggleControl } = wp.components;
const { __ } = wp.i18n;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const EditColumnsGroup = ( { attributes, setAttributes, clientId } ) => {
    const {
        sectionLabel,
        heading,
        headingColor,
        introText,
        bodyText,
        buttonText,
        buttonUrl,
        image,
        imageId,
        imageAlt,
        showDivider,
        imagePosition,
        padding,
        margin,
    } = attributes;

    const blockId = `block-${ clientId }`;

    const positionClass = imagePosition === 'right' ? 'columns-group--img-right' : '';

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'columns-group ${ positionClass }',
    } );

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={ __( 'Block Settings', 'red-egg' ) }>
                    <SelectControl
                        label={ __( 'Heading Color', 'red-egg' ) }
                        value={ headingColor }
                        options={ [
                            { label: 'Red', value: 'red' },
                            { label: 'Gray', value: 'gray' },
                        ] }
                        onChange={ ( val ) => setAttributes( { headingColor: val } ) }
                    />
                    <SelectControl
                        label={ __( 'Image Position', 'red-egg' ) }
                        value={ imagePosition }
                        options={ [
                            { label: 'Left', value: 'left' },
                            { label: 'Right', value: 'right' },
                        ] }
                        onChange={ ( val ) => setAttributes( { imagePosition: val } ) }
                    />
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
                    <ToggleControl
                        label={ __( 'Show Divider', 'red-egg' ) }
                        checked={ showDivider }
                        onChange={ ( val ) => setAttributes( { showDivider: val } ) }
                    />
                    <div className="components-base-control">
                        <label className="components-base-control__label">
                            { __( 'Image', 'red-egg' ) }
                        </label>
                        <MediaUpload
                            onSelect={ ( media ) => setAttributes( {
                                image: media.url,
                                imageId: media.id,
                                imageAlt: media.alt || '',
                            } ) }
                            allowedTypes={ [ 'image' ] }
                            value={ imageId }
                            render={ ( { open } ) => (
                                <div>
                                    { image && (
                                        <img
                                            src={ image }
                                            alt={ imageAlt }
                                            style={ { maxWidth: '100%', marginBottom: '10px', borderRadius: '4px' } }
                                        />
                                    ) }
                                    <Button
                                        onClick={ open }
                                        variant="secondary"
                                        style={ { marginRight: '8px' } }
                                    >
                                        { image ? __( 'Replace Image', 'red-egg' ) : __( 'Upload Image', 'red-egg' ) }
                                    </Button>
                                    { image && (
                                        <Button
                                            onClick={ () => setAttributes( {
                                                image: '',
                                                imageId: 0,
                                                imageAlt: '',
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
                <div className="block-wrapper">
                    <div className="columns-group__image-col">
                        { image ? (
                            <div className="columns-group__image-wrap">
                                <img src={ image } alt={ imageAlt } />
                            </div>
                        ) : (
                            <MediaUpload
                                onSelect={ ( media ) => setAttributes( {
                                    image: media.url,
                                    imageId: media.id,
                                    imageAlt: media.alt || '',
                                } ) }
                                allowedTypes={ [ 'image' ] }
                                value={ imageId }
                                render={ ( { open } ) => (
                                    <div className="columns-group__image-placeholder" onClick={ open }>
                                        <span>{ __( '+ Add Image', 'red-egg' ) }</span>
                                    </div>
                                ) }
                            />
                        ) }
                    </div><!-- .columns-group__image-col -->

                    <div className="columns-group__content-col">
                        <RichText
                            tagName="p"
                            className="columns-group__label"
                            value={ sectionLabel }
                            onChange={ ( val ) => setAttributes( { sectionLabel: val } ) }
                            placeholder={ __( 'Section label…', 'red-egg' ) }
                        />
                        <RichText
                            tagName="h2"
                            className={ `columns-group__heading columns-group__heading--${ headingColor }` }
                            value={ heading }
                            onChange={ ( val ) => setAttributes( { heading: val } ) }
                            placeholder={ __( 'Heading…', 'red-egg' ) }
                        />
                        <RichText
                            tagName="p"
                            className="columns-group__intro"
                            value={ introText }
                            onChange={ ( val ) => setAttributes( { introText: val } ) }
                            placeholder={ __( 'Intro text…', 'red-egg' ) }
                        />
                        <RichText
                            tagName="p"
                            className="columns-group__body"
                            value={ bodyText }
                            onChange={ ( val ) => setAttributes( { bodyText: val } ) }
                            placeholder={ __( 'Body text…', 'red-egg' ) }
                        />
                        <div className="columns-group__cta">
                            <span className="btn-gray">
                                <span>{ buttonText }</span>
                                <span className="btn-arrow"></span>
                            </span>
                        </div>
                        { showDivider && (
                            <div className="columns-group__divider"></div>
                        ) }
                    </div><!-- .columns-group__content-col -->
                </div><!-- .block-wrapper -->
            </section>
        </Fragment>
    );
};

export default EditColumnsGroup;
