/**
 * Section Nav – Save Component
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveSectionNav = ( { attributes } ) => {
    const { bgColor, bgSlug, padding, margin, blockId } = attributes;

    const blockProps = useBlockProps.save( {
        id: blockId,
        className: 'section-nav' + ( bgSlug ? ' ' + bgSlug : '' ),
        style: bgColor ? { backgroundColor: bgColor } : {},
    } );

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <nav { ...blockProps } aria-label="Section navigation">
                <div className="block-wrapper">
                    <InnerBlocks.Content />
                </div>
            </nav>
        </Fragment>
    );
};

export default SaveSectionNav;
