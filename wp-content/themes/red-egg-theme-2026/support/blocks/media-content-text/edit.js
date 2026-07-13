/**
 * Media Content – Text Block – Edit Component
 *
 * InnerBlocks for header-intro, paragraphs, buttons.
 */

const { Fragment, useEffect } = wp.element;
const { InnerBlocks, useBlockProps, InspectorControls } = wp.blockEditor;


const template = [
    [ 'core/paragraph', { placeholder: 'Section description...' } ],
    [ 'core/buttons', {}, [
        [ 'core/button', { placeholder: 'CTA...' } ],
    ] ],
];

const allowedBlocks = [
    'core/heading',
    'core/paragraph',
    'core/list',
    'core/buttons',
    'core/image',
];

const EditMediaContentText = ({ attributes, setAttributes }) => {


    const blockProps = useBlockProps( {
        className: 'media-content__text content-columns column',
    } );

    return (
        <Fragment>
            <div { ...blockProps }>
                <div className="wrap">
                    <InnerBlocks
                        template={ template }
                        allowedBlocks={ allowedBlocks }
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default EditMediaContentText;
