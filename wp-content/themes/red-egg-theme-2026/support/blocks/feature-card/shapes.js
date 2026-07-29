/**
 * Feature Card icon background shapes.
 * Blob options (semi-transparent) used behind the icon instead
 * of the default circle. Shared by edit.js and save.js.
 */

export const BLOB_SHAPES = {
    blob1: '<svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="st1 blob-animation" d="M281.1,150c-61.8,61.9-20,150-112.9,150S0,232.8,0,150,75.3,0,168.3,0s168.3,94.5,112.9,150Z" fill="white" opacity="0.3" /><path class="st1 blob-phase-1" d="M300,143.3c0,79.1-27.8,156.7-110.7,156.7S0,222.4,0,143.3,67.2,0,150,0s150,64.2,150,143.3Z" display="none"/></svg>',
    blob2: '<svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="st1 blob-animation" d="M300,150c0,82.8-74.8,150-167.2,150S39.9,220,9.4,141.8C-25.2,53.2,40.5,0,132.8,0s167.2,67.2,167.2,150Z" fill="white" opacity="0.3"/><path class="st1 blob-phase-1" d="M300,140.2c0,88.3-67.2,159.8-150,159.8S0,228.5,0,140.2,51.2,50.2,127.8,16.7c125.1-54.7,172.2,35.3,172.2,123.5Z" display="none"/></svg>',
    blob3: '<svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="st0 blob-animation" d="M300,150c0,82.8-72.5,150-162,150S0,283.8,0,200.9,48.6,0,138,0s162,67.2,162,150Z" fill="white" opacity="0.3"/><path class="st0 blob-phase-1" d="M300,186.1c0,86.8-92.5,113.9-181.7,113.9S0,209.4,0,122.6,45.2,0,134.4,0s165.6,99.3,165.6,186.1Z"/></svg>',
};

export const SHAPE_OPTIONS = [
    { label: 'Circle', value: 'circle' },
    { label: 'Blob 1', value: 'blob1' },
    { label: 'Blob 2', value: 'blob2' },
    { label: 'Blob 3', value: 'blob3' },
];
