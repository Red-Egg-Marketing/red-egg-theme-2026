/**
 * Process Steps Block – Edit Component
 */

const { Fragment, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

import BackgroundColor from '../../components/BackgroundColor.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'red-egg-block/header-intro', {} ],
    [ 'red-egg-block/process-step', { tags: [ 'BRAND POSITIONING', 'COMPETITIVE ANALYSIS', 'BRAND RESEARCH', 'BRAND NAMING' ] }, [
        [ 'red-egg-block/numbered-list-item', { badge: '01' } ],
    ] ],
    [ 'red-egg-block/process-step', { tags: [ 'AUDIENCE INSIGHTS', 'BUYER PERSONAS', 'MESSAGING', 'BRAND ATTRIBUTES', 'BRAND PROMISE', 'VALUE PROPOSITION' ] }, [
        [ 'red-egg-block/numbered-list-item', { badge: '02' } ],
    ] ],
    [ 'red-egg-block/process-step', { tags: [ 'REVIEW CONCEPTS', 'STRATEGIC RATIONALE', 'CLIENT FEEDBACK', 'REFINEMENTS', 'FINAL APPROVAL', 'BRAND DELIVERY' ] }, [
        [ 'red-egg-block/numbered-list-item', { badge: '03' } ],
    ] ],
];

const allowedBlocks = [
    'red-egg-block/header-intro',
    'red-egg-block/process-step',
    'core/heading',
    'core/paragraph',
];

const EditProcessSteps = ( { attributes, setAttributes, clientId } ) => {
    const { bgColor, bgSlug, padding, margin, blockId } = attributes;

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'process-steps' + ( bgSlug ? ' ' + bgSlug : '' ),
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

export default EditProcessSteps;
