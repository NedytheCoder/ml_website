import { previewSize, renderPreview } from "./link-preview";

export const alt = "Kingson Ezeruigbo: machine learning for power systems";
export const size = previewSize;
export const contentType = "image/png";

export default function Image() {
  return renderPreview({
    kicker: "Machine learning for power systems",
    title: "Kingson Ezeruigbo",
    titleSize: 104,
  });
}
