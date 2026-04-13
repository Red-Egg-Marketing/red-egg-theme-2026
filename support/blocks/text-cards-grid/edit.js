/**
 * Text Cards Grid Block – Edit Component
 *
 * Uses InnerBlocks for all content:
 *   - Header area: core/paragraph (label), core/heading, core/paragraph (desc)
 *   - Card grid: red-egg-block/text-card child blocks
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps, InspectorControls } = wp.blockEditor;
const { __ } = wp.i18n;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'core/paragraph', { placeholder: 'Section label…', className: 'text-cards-grid__label' } ],
    [ 'core/heading', { level: 2, placeholder: 'Section heading…', className: 'text-cards-grid__heading' } ],
    [ 'core/paragraph', { placeholder: 'Section description…', className: 'text-cards-grid__description' } ],
    [ 'red-egg-block/text-card', {} ],
    [ 'red-egg-block/text-card', {} ],
    [ 'red-egg-block/text-card', {} ],
];

const allowedBlocks = [
    'core/heading',
    'core/paragraph',
    'red-egg-block/text-card',
    'core/spacer',
    'core/group',
];

const EditTextCardsGrid = ( { attributes, setAttributes, clientId } ) => {
    const { padding, margin } = attributes;

    const blockId = `block-${ clientId }`;

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'text-cards-grid',
    } );

    return (
        <Fragment>
            <InspectorControls>
                { /* Future settings panels go here */ }
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
                    <InnerBlocks
                        template={ template }
                        allowedBlocks={ allowedBlocks }
                    />
                </div>
            </section>
        </Fragment>
    );
};

export default EditTextCardsGrid;
