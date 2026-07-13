/**
 * Columns Component
 *
 * Provides a RangeControl in a PanelBody for selecting
 * the number of columns in a grid block.
 */

const { Fragment } = wp.element;
const { PanelBody, RangeControl } = wp.components;
const { __ } = wp.i18n;

const Columns = ( props ) => {
    const { columns, setAttributes, min, max, title } = props;
    const colMin = min || 2;
    const colMax = max || 4;
    const settitle = title || 'Columns';

    return (
        <Fragment>
            <PanelBody
                title={ __( settitle ) }
                initialOpen={ true }
            >
                <RangeControl
                    label={ __( 'Number of Columns' ) }
                    value={ columns }
                    onChange={ ( value ) => setAttributes( { columns: value } ) }
                    min={ colMin }
                    max={ colMax }
                />
            </PanelBody>
        </Fragment>
    );
};

export default Columns;
