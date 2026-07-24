/**
 * ImageSizePicker
 *
 * A SelectControl letting an editor choose which registered image size
 * a block serves, instead of always relying on the automatic pick.
 * Needed because our registered sizes are hard-cropped -- the auto
 * choice sometimes crops out the important part of an image (e.g. a
 * centered subject losing its top/bottom), and the editor needs an
 * escape hatch to pick a less-cropped size.
 *
 * Options: 'Auto (recommended)' (empty value -> block uses its normal
 * srcset logic), 'Full size', then every registered size with its
 * dimensions shown so the editor can judge the crop.
 *
 * Props:
 *   value       {string}   current sizeOverride ('' = auto)
 *   onChange    {Function} called with the chosen size name ('' = auto)
 *   label       {string}   optional field label
 *   help        {string}   optional help text
 */

const { SelectControl } = wp.components;
const { __ } = wp.i18n;
import { getRegisteredSizes } from './mediaSizes.js';

const ImageSizePicker = ( { value, onChange, label, help } ) => {
    const sizes = getRegisteredSizes();

    const options = [
        { label: __( 'Auto (recommended)', 'red-egg' ), value: '' },
        { label: __( 'Full size', 'red-egg' ), value: 'full' },
        ...sizes.map( ( s ) => ( {
            label: s.width && s.height
                ? `${ s.label } (${ s.width }\u00d7${ s.height })`
                : s.label,
            value: s.name,
        } ) ),
    ];

    return (
        <SelectControl
            label={ label || __( 'Image Size', 'red-egg' ) }
            help={ help || __( 'Override the automatic size if the auto crop cuts off part of the image.', 'red-egg' ) }
            value={ value || '' }
            options={ options }
            onChange={ onChange }
        />
    );
};

export default ImageSizePicker;
