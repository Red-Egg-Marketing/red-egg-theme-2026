/**
 * NumberBadge Component
 *
 * Renders a large styled badge (number, letter, etc.)
 * Reusable across blocks. Edit mode has an editable input,
 * View mode renders static text.
 *
 * Usage (edit):
 *   <NumberBadge
 *       value={ badge }
 *       onChange={ ( val ) => setAttributes( { badge: val } ) }
 *   />
 *
 * Usage (save):
 *   <NumberBadge.View value={ badge } />
 */

const { __ } = wp.i18n;

const NumberBadge = ( { value, onChange } ) => {
    return (
        <div className="number-badge">
            <input
                type="text"
                className="number-badge__input"
                value={ value }
                onChange={ ( e ) => onChange( e.target.value ) }
                placeholder={ __( '01', 'red-egg' ) }
            />
        </div>
    );
};

NumberBadge.View = ( { value } ) => {
    return (
        <div className="number-badge">
            <span className="number-badge__value">{ value }</span>
        </div>
    );
};

export default NumberBadge;
