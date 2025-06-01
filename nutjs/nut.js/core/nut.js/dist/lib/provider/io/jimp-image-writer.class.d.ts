import { ImageWriter, ImageWriterParameters } from "@nut-tree/provider-interfaces";
export default class implements ImageWriter {
    store(parameters: ImageWriterParameters): Promise<void>;
}
