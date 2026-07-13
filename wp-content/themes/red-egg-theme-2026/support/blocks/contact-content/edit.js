const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

import ContactIcons from '../../components/ContactIcons.js';

const template = [
    [ 'core/paragraph', { placeholder: 'READY?', className: 'contact-section__label' } ],
    [ 'core/heading', { level: 2, placeholder: "Let's Hatch Some Ideas" } ],
];

const allowedBlocks = [
    'core/heading',
    'core/paragraph',
    'core/buttons',
    'core/list',
];

const EditContactContent = ( { attributes, setAttributes } ) => {
    const { icons } = attributes;

    const blockProps = useBlockProps( {
        className: 'contact-section__left',
    } );

    return (
        <div { ...blockProps }>
            <InnerBlocks
                template={ template }
                allowedBlocks={ allowedBlocks }
            />
            <ContactIcons
                icons={ icons }
                setAttributes={ setAttributes }
            />
        </div>
    );
};

export default EditContactContent;
