
const { Fragment } = wp.element;
const { RichText, InnerBlocks, useBlockProps, InspectorControls } = wp.blockEditor;
const { Button, PanelBody, ColorPalette } = wp.components;
const { __ } = wp.i18n;

const defcolors = [
    { name: 'White', color: 'rgba(255, 255, 255, 1)', slug: 'white' },
    { name: 'Eggshell', color: 'rgba(242, 236, 229, 1)', slug: 'eggshell' },
    { name: 'Gray', color: 'rgba(66, 64, 66, 1)', slug: 'gray' },
    { name: 'Red', color: 'rgba(220, 32, 53, 1)', slug: 'red' },
    { name: 'Peach', color: 'rgba(247, 158, 131, 1)', slug: 'peach' },
    { name: 'Navy', color: 'rgba(2, 77, 105, 1)', slug: 'navy' },
    { name: 'Purple', color: 'rgba(168, 154, 174, 1)', slug: 'purple' },
    { name: 'Magenta', color: 'rgba(227, 46, 109, 1)', slug: 'magenta' },
    { name: 'Orange', color: 'rgba(246, 134, 51, 1)', slug: 'orange' },
    { name: 'Gold', color: 'rgba(246, 179, 25, 1)', slug: 'gold' },
    { name: 'Dark Purple', color: 'rgba(145, 40, 141, 1)', slug: 'dark-purple' },
];

const BackgroundColor = (props) => {
	const { bgColor, bgSlug, colors, title, updateProp, updateSlug, setStateColor, bgStyle } = props;
	const customColors = colors == null ? defcolors : colors;
	const settitle = title == null ? 'Background Color' : title;

	const setBackgroundColor = (value) => {
		var prop = updateProp == undefined ? "bgColor" : updateProp;
		var propSlug = updateSlug == undefined ? "bgSlug" : updateSlug;
		var update = {};
		if (value != undefined) {
			var newColor = customColors.find(obj => {
				if (obj.color == value) {
					return obj;
				}
			});
			update[prop] = value;
			if (typeof newColor != 'undefined') {
				update[propSlug] = bgColor != undefined ? newColor.slug : '';
			}
			if (typeof bgStyle != 'undefined') {
				let s = { 'background' : value };
				setStateColor(s);
				update["bgStyle"] = s;
			}
		} else {
			update[prop] = '';
			update[propSlug] = '';
		}
		props.setAttributes(update);
	}
	
	return (
		<Fragment>
			<PanelBody
				title={__( settitle )}
				initialOpen={ true }
			>
				<ColorPalette
            		colors={ customColors }
            		value={ bgColor }
            		onChange={ setBackgroundColor }
            		disableCustomColors={ false }
        		/>
			</PanelBody>
		</Fragment>
	)
}

BackgroundColor.View = (props) => {
	return null;
}

export default BackgroundColor;
