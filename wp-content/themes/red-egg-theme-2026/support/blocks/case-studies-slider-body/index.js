/**
 * Case Studies Slider Body (Child)
 *
 * Dynamic slider + editable CTA button row.
 * Must be a child of case-studies-slider.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/case-studies-slider-body', {
    apiVersion: 2,
    title: __( 'Case Studies Slider Body', 'red-egg' ),
    description: __( 'Slider + CTA button row. Child of Case Studies Slider.', 'red-egg' ),
    icon: 'slides',
    category: 'layout',
    parent: [ 'red-egg-block/case-studies-slider' ],
    supports: { anchor: false, inserter: false },
    attributes: {
        industry: {
            type: 'string',
            default: '',
        },
        postsToShow: {
            type: 'number',
            default: 15,
        },
        blockId: {
            type: 'string',
        },
    },
    edit,
    save,
} );
