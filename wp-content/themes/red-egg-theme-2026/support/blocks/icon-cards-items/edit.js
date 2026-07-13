/**
 * Icon Cards Items Wrapper – Edit Component
 *
 * Simple wrapper that holds icon-card children.
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

const template = [
    [ 'red-egg-block/icon-card', {} ],
    [ 'red-egg-block/icon-card', {} ],
    [ 'red-egg-block/icon-card', {} ],
];

const allowedBlocks = [
    'red-egg-block/icon-card',
];

const EditIconCardsItems = () => {
    const blockProps = useBlockProps( {
        className: 'icon-cards__items',
    } );

    return (
        <div { ...blockProps }>
            <InnerBlocks
                template={ template }
                allowedBlocks={ allowedBlocks }
            />
        </div>
    );
};

export default EditIconCardsItems;
