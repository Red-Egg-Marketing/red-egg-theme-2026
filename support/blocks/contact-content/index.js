const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/contact-content', {
    apiVersion: 2,
    title: __( 'Contact Content', 'red-egg' ),
    description: __( 'Contact info column with heading, icon rows, and buttons.', 'red-egg' ),
    icon: 'email-alt',
    category: 'layout',
    parent: [ 'red-egg-block/contact-section' ],
    supports: { anchor: false, inserter: false },
    attributes: {
        icons: {
            type: 'array',
            default: [
                { icon: 'email', text: 'hello@redeggmarketing.com' },
                { icon: 'phone', text: '720.513.5035' },
                { icon: 'location', text: '4045 Pecos Street, Suite 180<br>Denver, CO 80211' },
            ],
        },
    },
    edit,
    save,
} );
