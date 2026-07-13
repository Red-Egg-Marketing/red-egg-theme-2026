/**
 * Case Studies Slider Block – Edit (Parent)
 *
 * InnerBlocks container for header-intro + slider-body child.
 */

const { Fragment, useEffect } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'red-egg-block/header-intro', {} ],
    [ 'red-egg-block/case-studies-slider-body', {} ],
];

const allowedBlocks = [
    'red-egg-block/header-intro',
    'red-egg-block/case-studies-slider-body',
    'core/heading',
    'core/paragraph',
];

const EditCaseStudiesSlider = ( { attributes, setAttributes, clientId } ) => {
    const { padding, margin, blockId } = attributes;

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'case-studies-slider',
    } );

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    return (
        <Fragment>
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

export default EditCaseStudiesSlider;
