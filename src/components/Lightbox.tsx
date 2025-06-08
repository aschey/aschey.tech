import Lightbox, { type CaptionsRef, type ZoomRef } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import { useStore } from '@nanostores/preact';
import { galleryIndex } from '../scripts/gallery.ts';
import { useRef, type MutableRef } from "preact/hooks";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

interface Props {
    images: ImageMetadata[],
}

const Gallery = ({ images }: Props) => {
    const $galleryIndex = useStore(galleryIndex);
    const zoomRef: MutableRef<ZoomRef | null> = useRef(null);
    const captionsRef: MutableRef<CaptionsRef | null> = useRef(null);

    return <Lightbox
        index={$galleryIndex}
        plugins={[Zoom, Captions]}
        zoom={{ ref: zoomRef }}
        captions={{ descriptionTextAlign: 'center', descriptionMaxLines: 10, ref: captionsRef, showToggle: true }}
        slides={images}
        open={$galleryIndex >= 0}
        close={() => galleryIndex.set(-1)}
        on={{
            click: () => {
                (captionsRef.current?.visible
                    ? captionsRef.current?.hide
                    : captionsRef.current?.show)?.();
            }
        }}
    />

}

export default Gallery;
