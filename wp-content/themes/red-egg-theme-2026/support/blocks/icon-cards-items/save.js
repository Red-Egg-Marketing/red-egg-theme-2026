/**
 * Icon Cards Items Wrapper – Save Component
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

const SaveIconCardsItems = () => {
    const blockProps = useBlockProps.save( {
        className: 'icon-cards__items',
    } );

    return (
        <div { ...blockProps }>
            <InnerBlocks.Content />
        </div>
    );
};

export default SaveIconCardsItems;
