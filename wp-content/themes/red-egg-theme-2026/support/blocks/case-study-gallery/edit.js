/**
 * Case Study Gallery Block – Edit Component
 *
 * InnerBlocks: label paragraph + heading + core/gallery.
 */

const { Fragment, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

import BackgroundColor from '../../components/BackgroundColor.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'core/paragraph', { placeholder: 'BRANDING', className: 'cs-gallery__label' } ],
    [ 'core/heading', { level: 2, placeholder: 'Gallery Section Title' } ],
    [ 'core/gallery', { columns: 2 } ],
];

const allowedBlocks = [
    'core/paragraph',
    'core/heading',
    'core/gallery',
    'core/image',
];

const EditCaseStudyGallery = ( { attributes, setAttributes, clientId } ) => {
    const { bgColor, bgSlug, padding, margin, blockId } = attributes;

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'cs-gallery' + ( bgSlug ? ' ' + bgSlug : '' ),
    } );

    return (
        <Fragment>
            <InspectorControls>
                <BackgroundColor
                    bgColor={ bgColor }
                    bgSlug={ bgSlug }
                    setAttributes={ setAttributes }
                />
            </InspectorControls>

            <PaddingSelector
                padding={ padding }
                id={ 'block-' + clientId }
                setAttributes={ setAttributes }
            />
            <MarginSelector
                margin={ margin }
                id={ 'block-' + clientId }
                setAttributes={ setAttributes }
            />

            <section { ...blockProps }>
                <div className="block-wrapper">
                    <InnerBlocks
                        template={ template }
                        allowedBlocks={ allowedBlocks }
                    />
                </div>
            </section>
        </Fragment>
    );
};

export default EditCaseStudyGallery;
