/**
 * Contact Section Block – Edit Component
 *
 * Two-column: contact-content (left) + contact-form (right).
 * Locked child blocks for client-proof structure.
 */

const { Fragment, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

import BackgroundColor from '../../components/BackgroundColor.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'red-egg-block/contact-content', {} ],
    [ 'red-egg-block/contact-form', {} ],
];

const allowedBlocks = [
    'red-egg-block/contact-content',
    'red-egg-block/contact-form',
];

const EditContactSection = ( { attributes, setAttributes, clientId } ) => {
    const { bgColor, bgSlug, padding, margin, blockId } = attributes;

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'contact-section' + ( bgSlug ? ' ' + bgSlug : '' ),
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
                    <div className="contact-section__columns">
                        <InnerBlocks
                            template={ template }
                            allowedBlocks={ allowedBlocks }
                        />
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default EditContactSection;
