/**
 * Hero Background Block – Save Component
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveHeroBackground = ( { attributes } ) => {
    const { image, mobileimage, bgSlug, minHeight, padding, margin } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'hero-background' + ( bgSlug ? ' ' + bgSlug : '' ),
    } );

    const blockId = blockProps.id;

    // Build inline background styles
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

    if ( minHeight > 0 ) {
        bgStyle.minHeight = minHeight + 'px';
    }

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />

            <section { ...blockProps } style={ bgStyle }
                data-mobile-bg={ mobileimage.url !== '' ? JSON.stringify( {
                    backgroundImage: `url(${ mobileimage.url })`,
                    backgroundRepeat: mobileimage.repeat || 'no-repeat',
                    backgroundAttachment: mobileimage.attachment || 'scroll',
                    backgroundPosition: mobileimage.position || 'center center',
                    backgroundSize: mobileimage.sizekey || 'cover',
                } ) : '' }
            >
                <div className="block-wrapper">
                    <div className="hero-background__columns">
                        <InnerBlocks.Content />
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default SaveHeroBackground;
