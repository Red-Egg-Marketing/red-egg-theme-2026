/**
 * Hero Background Block – Save Component
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveHeroBackground = ( { attributes } ) => {
    const { image, mobileimage, bgSlug, minHeight, padding, margin, blockId } = attributes;

    const blockProps = useBlockProps.save( {
        id: blockId,
        className: 'hero-background' + ( bgSlug ? ' ' + bgSlug : '' ),
    } );

    const bgStyle = {};
    let bgImageSetCss = '';
    if ( image.url !== '' ) {
        if ( image.url2x ) {
            // Emit image-set() via a scoped <style> so we can layer the
            // fallbacks a single inline-style object can't hold: plain
            // url() for non-supporting browsers, -webkit- for older
            // Chrome/Safari, then the standard syntax. High-DPI/4K
            // displays pull the 2592px file; everyone else keeps 1728.
            bgImageSetCss =
                `#${ blockId } {`
                + ` background-image: url(${ image.url });`
                + ` background-image: -webkit-image-set(url(${ image.url }) 1x, url(${ image.url2x }) 2x);`
                + ` background-image: image-set(url(${ image.url }) 1x, url(${ image.url2x }) 2x);`
                + ` }`;
        } else {
            bgStyle.backgroundImage = `url(${ image.url })`;
        }
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
            { bgImageSetCss && (
                <style type="text/css">{ bgImageSetCss }</style>
            ) }
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
