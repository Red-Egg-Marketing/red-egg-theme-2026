/**
 * Hero Content – Edit Component
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

const template = [
    [ 'core/heading', { level: 1, placeholder: "Hello There!\nLet's Chat." } ],
    [ 'core/paragraph', { placeholder: 'Reach out below to get in touch with one of our awesome team members today.' } ],
    [ 'core/buttons', {}, [
        [ 'core/button', { placeholder: 'CTA Button...' } ],
    ] ],
];

const allowedBlocks = [
    'core/heading',
    'core/paragraph',
    'core/buttons',
    'core/list',
    'core/spacer',
];

const EditHeroContent = () => {
    const blockProps = useBlockProps( {
        className: 'hero-background__content',
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

export default EditHeroContent;
