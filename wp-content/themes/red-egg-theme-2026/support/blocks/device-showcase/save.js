/**
 * Device Showcase Block – Save Component
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveDeviceShowcase = ( { attributes } ) => {
    const { bgSlug, padding, margin, blockId } = attributes;

    const blockProps = useBlockProps.save( {
        id: blockId,
        className: 'device-showcase' + ( bgSlug ? ' ' + bgSlug : '' ),
    } );

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <section { ...blockProps }>
                <div className="block-wrapper">
                    <div className="device-showcase__devices">
                        <InnerBlocks.Content />
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default SaveDeviceShowcase;
