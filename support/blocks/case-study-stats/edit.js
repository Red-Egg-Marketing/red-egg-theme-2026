/**
 * Case Study Stats Block – Edit Component
 *
 * "KEY METRICS" label + 3-column grid of stat-card children.
 */

const { Fragment, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'red-egg-block/stat-card', {} ],
    [ 'red-egg-block/stat-card', {} ],
    [ 'red-egg-block/stat-card', {} ],
];

const allowedBlocks = [
    'red-egg-block/stat-card',
];

const EditCaseStudyStats = ( { attributes, setAttributes, clientId } ) => {
    const { padding, margin, blockId } = attributes;

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'case-study-stats',
    } );

    return (
        <Fragment>
            <InspectorControls>
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

            <div { ...blockProps }>
                <div className="case-study-stats__label">
                    <span>KEY METRICS</span>
                </div>
                <div className="case-study-stats__grid">
                    <InnerBlocks
                        template={ template }
                        allowedBlocks={ allowedBlocks }
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default EditCaseStudyStats;
