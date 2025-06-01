import { Image, Point, RGBA } from "@nut-tree/shared";
import { ImageProcessor } from "@nut-tree/provider-interfaces";
export default class implements ImageProcessor {
    colorAt(image: Image | Promise<Image>, point: Point | Promise<Point>): Promise<RGBA>;
}
