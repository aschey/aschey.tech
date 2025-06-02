import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { useStore } from '@nanostores/preact';
import { galleryIndex } from '../scripts/gallery.ts';
import { useRef } from "preact/hooks";

import "yet-another-react-lightbox/styles.css";

interface Props {
  images: ImageMetadata[],
}

const Gallery = ({ images }: Props) => {
  const $galleryIndex = useStore(galleryIndex);
  const zoomRef = useRef(null);

  return <Lightbox
    index={$galleryIndex}
    plugins={[Zoom]}
    zoom={{ ref: zoomRef }}
    slides={images}
    open={$galleryIndex >= 0}
    close={() => galleryIndex.set(-1)}
  />

}

export default Gallery;
