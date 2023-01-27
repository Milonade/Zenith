import { DivIcon } from "leaflet";

export const PhotoIcon = DivIcon.extend({
    options: {
        html: '',
        className: 'image-icon',
        iconSize: [50, 50],
        iconAnchor: [25, 50]
    },
})