/**
 * Contact Section Block
 * 
 * Eggshell background section with heading, contact 
 * info (email, phone, address), and a contact form.
 * 
 *    ____          _   _____              
 *   |  _ \ ___  __| | | ____|__ _  __ _   
 *   | |_) / _ \/ _` | |  _| / _` |/ _` |  
 *   |  _ <  __/ (_| | | |__| (_| | (_| |  
 *   |_| \_\___|\__,_| |_____\__, |\__, |  
 *                            |___/ |___/   
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/contact-section', {
    apiVersion: 2,
    title: __( 'Contact Section', 'red-egg' ),
    description: __( 'Contact section with heading, contact info, and form fields on eggshell background.', 'red-egg' ),
    icon: 'email',
    category: 'layout',
    keywords: [ __( 'contact', 'red-egg' ), __( 'form', 'red-egg' ), __( 'hatch', 'red-egg' ) ],
    attributes: {
        sectionLabel: {
            type: 'string',
            default: 'READY?',
        },
        heading: {
            type: 'string',
            default: "Let's Hatch Some Ideas",
        },
        email: {
            type: 'string',
            default: 'hello@redeggmarketing.com',
        },
        phone: {
            type: 'string',
            default: '720.513.5035',
        },
        addressLine1: {
            type: 'string',
            default: '4045 Pecos Street, Suite 180',
        },
        addressLine2: {
            type: 'string',
            default: 'Denver, CO 80211',
        },
        formShortcode: {
            type: 'string',
            default: '',
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
    },
    edit,
    save,
} );
