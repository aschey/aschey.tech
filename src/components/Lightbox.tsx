import Lightbox, {
  type CaptionsRef,
  type ZoomRef,
} from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import { useStore } from "@nanostores/preact";
import { imageIndex } from "../scripts/image.ts";
import { useRef, type MutableRef } from "preact/hooks";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

interface Props {
  images: ImageMetadata[];
}

const LightboxComponent = ({ images }: Props) => {
  const $imageIndex = useStore(imageIndex);
  const zoomRef: MutableRef<ZoomRef | null> = useRef(null);
  const captionsRef: MutableRef<CaptionsRef | null> = useRef(null);
  return (
    <Lightbox
      index={$imageIndex}
      plugins={[Zoom, Captions]}
      zoom={{ ref: zoomRef }}
      captions={{
        descriptionTextAlign: "center",
        descriptionMaxLines: 10,
        ref: captionsRef,
        showToggle: true,
      }}
      slides={images}
      open={$imageIndex >= 0}
      close={() => imageIndex.set(-1)}
      render={{ buttonPrev: () => null, buttonNext: () => null }}
      on={{
        click: () => {
          (captionsRef.current?.visible
            ? captionsRef.current?.hide
            : captionsRef.current?.show)?.();
        },
      }}
    />
  );
};

export default LightboxComponent;
