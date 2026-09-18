/**
 * Team Members Block – Save Component
 *
 * Dynamic block: only the InnerBlocks (Header Intro) content is
 * saved. The PHP render callback in support/blocks.php receives it
 * as $content and wraps it together with the GS Team grid.
 */

const { InnerBlocks } = wp.blockEditor;

const SaveTeamMembers = () => <InnerBlocks.Content />;

export default SaveTeamMembers;
