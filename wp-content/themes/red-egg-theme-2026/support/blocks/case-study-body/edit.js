/**
 * Case Study Body Block – Edit Component
 *
 * Editable CASE STUDY label + free InnerBlocks for
 * heading/paragraph sections. Optional corner blob.
 */

const { Fragment, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';
import BlobAnimation from '../../components/BlobAnimation.js';

const template = [
    [ 'core/heading', { level: 2, placeholder: 'The Challenge', className: 'case-study-body__heading' } ],
    [ 'core/paragraph', { placeholder: 'Describe the challenge…' } ],
    [ 'core/heading', { level: 2, placeholder: 'The Solution', className: 'case-study-body__heading' } ],
    [ 'core/paragraph', { placeholder: 'Describe the solution…' } ],
    [ 'core/heading', { level: 2, placeholder: 'The Results', className: 'case-study-body__heading' } ],
    [ 'core/paragraph', { placeholder: 'Describe the results…' } ],
];

const allowedBlocks = [
    'core/heading',
    'core/paragraph',
    'core/list',
    'core/buttons',
    'core/spacer',
];

const EditCaseStudyBody = ( { attributes, setAttributes, clientId } ) => {
    const {
        label, padding, margin, blockId,
        blobEnabled, blobShape, blobSpeed, blobPosition,
    } = attributes;

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'case-study-body',
    } );

    return (
        <Fragment>
            <InspectorControls>
                <BlobAnimation.Controls
                    blobEnabled={ blobEnabled }
                    blobShape={ blobShape }
                    blobSpeed={ blobSpeed }
                    blobPosition={ blobPosition }
                    setAttributes={ setAttributes }
                />
            </InspectorControls>

            <PaddingSelector
                padding={ padding }
                id={ 'block-' + clientId }
                setAttributes={ setAttributes }
            />
            <MarginSelector
                margin={ margin }
                id={ 'block-' + clientId }
                setAttributes={ setAttributes }
            />

            <section { ...blockProps }>
                <BlobAnimation.Preview
                    blobEnabled={ blobEnabled }
                    blobShape={ blobShape }
                    blobPosition={ blobPosition }
                />
                <div className="block-wrapper">
                    <RichText
                        tagName="p"
                        className="case-study-body__label"
                        value={ label }
                        onChange={ ( val ) => setAttributes( { label: val } ) }
                        placeholder={ __( 'CASE STUDY', 'red-egg' ) }
                        allowedFormats={ [] }
                    />
                    <div className="case-study-body__content">
                        <InnerBlocks
                            template={ template }
                            allowedBlocks={ allowedBlocks }
                            templateLock={ false }
                        />
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default EditCaseStudyBody;
