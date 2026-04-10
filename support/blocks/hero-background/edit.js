const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps, InspectorControls } = wp.blockEditor;
const { __ } = wp.i18n;

import BackgroundSelector from '../../components/BackgroundSelector.js';
import MobileBackgroundSelector from '../../components/MobileBackgroundSelector.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'core/heading', { level: 1, placeholder: "Let's rock n' roll together." } ],
    [ 'core/paragraph', { placeholder: 'Hero intro paragraph...' } ],
    [ 'core/buttons', {},
        [
            [ 'core/button', { placeholder: 'Hero button...' } ],
        ],
    ],
];

const allowedBlocks = [
    'core/heading',
    'core/paragraph',
    'core/buttons',
    'core/image',
    'core/columns',
    'core/group',
    'core/spacer',
];

const EditHeroBackground = ( { attributes, setAttributes, clientId } ) => {
    const { image, mobileimage, padding, margin } = attributes;

    const blockId = `block-${ clientId }`;

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'hero-background',
    } );

    // Build inline background styles for editor preview
    const bgStyle = {};
    if ( image.url !== '' ) {
        bgStyle.backgroundImage = `url(${ image.url })`;
        bgStyle.backgroundRepeat = image.repeat || 'no-repeat';
        bgStyle.backgroundAttachment = image.attachment || 'scroll';
        bgStyle.backgroundSize = image.sizekey || 'cover';

        if ( image.bgkeyword === 'keyword' ) {
            bgStyle.backgroundPosition = image.position || 'center center';
        } else {
            const unit = image.bgunit || 'px';
            bgStyle.backgroundPosition = `${ image.positionX || 0 }${ unit } ${ image.positionY || 0 }${ unit }`;
        }

        if ( image.sizekey === '' && image.size ) {
            bgStyle.backgroundSize = `${ image.size }${ image.unit || '%' }`;
        }
    }

    return (
        <Fragment>
            <InspectorControls>
                <BackgroundSelector
                    image={ image }
                    setAttributes={ setAttributes }
                />
                <MobileBackgroundSelector
                    image={ mobileimage }
                    updateProp="mobileimage"
                    setAttributes={ setAttributes }
                />
            </InspectorControls>

            <PaddingSelector
                padding={ padding }
                id={ blockId }
                setAttributes={ setAttributes }
            />
            <MarginSelector
                margin={ margin }
                id={ blockId }
                setAttributes={ setAttributes }
            />

            <section { ...blockProps } style={ bgStyle }>
                <div className="block-wrapper">
                    <div className="hero-background__content">
                        <InnerBlocks
                            template={ template }
                            allowedBlocks={ allowedBlocks }
                        />
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default EditHeroBackground;
