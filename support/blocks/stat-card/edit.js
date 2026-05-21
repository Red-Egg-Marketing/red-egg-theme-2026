/**
 * Stat Card – Edit Component
 *
 * InnerBlocks for stat number (heading) and description (paragraph).
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

const template = [
    [ 'core/heading', { level: 3, placeholder: '188%', className: 'stat-card__number' } ],
    [ 'core/paragraph', { placeholder: 'Increase in new visitors', className: 'stat-card__desc' } ],
];

const allowedBlocks = [
    'core/heading',
    'core/paragraph',
];

const EditStatCard = () => {
    const blockProps = useBlockProps( {
        className: 'stat-card',
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

export default EditStatCard;
