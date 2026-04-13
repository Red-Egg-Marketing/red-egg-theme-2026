/**
 * Header Intro Block
 *
 * Section header with heading + description via InnerBlocks.
 * Supports background image, background color, overlay toggle.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/header-intro', {
    apiVersion: 2,
    title: __( 'Header Intro', 'red-egg' ),
    description: __( 'Section header with heading and description. Useful for introducing a section.', 'red-egg' ),
    icon: 'align-center',
    category: 'layout',
    keywords: [ __( 'header', 'red-egg' ), __( 'intro', 'red-egg' ), __( 'section', 'red-egg' ) ],
    attributes: {
        bgColor: {
            type: 'string',
            default: '',
        },
        bgSlug: {
            type: 'string',
            default: '',
        },
        coloroverlay: {
            type: 'boolean',
            default: false,
        },
        image: {
            type: 'object',
            default: {
                url: '', width: '', height: '',
                repeat: 'no-repeat', attachment: 'scroll',
                position: 'center center', size: '', sizekey: 'cover',
                unit: '%', bgkeyword: 'keyword',
                positionX: '', positionY: '', bgunit: 'px',
            },
        },
        padding: {
            type: 'object',
            default: {
                paddingtop: '', paddingright: '',
                paddingbottom: '', paddingleft: '', unit: 'rem',
            },
        },
        margin: {
            type: 'object',
            default: {
                margintop: '', marginright: '',
                marginbottom: '', marginleft: '', unit: 'rem',
            },
        },
        blockId: {
            type: 'string',
        },
    },
    edit,
    save,
} );
