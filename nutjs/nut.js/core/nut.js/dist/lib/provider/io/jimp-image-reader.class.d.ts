import { ImageReader } from "@nut-tree/provider-interfaces";
import { Image } from "@nut-tree/shared";
export default class implements ImageReader {
    load(parameters: string): Promise<Image>;
}
