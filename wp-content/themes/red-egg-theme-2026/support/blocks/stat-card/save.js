/**
 * Stat Card – Save Component
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

const SaveStatCard = () => {
    const blockProps = useBlockProps.save( {
        className: 'stat-card',
    } );

    return (
        <div { ...blockProps }>
            <InnerBlocks.Content />
        </div>
    );
};

export default SaveStatCard;
