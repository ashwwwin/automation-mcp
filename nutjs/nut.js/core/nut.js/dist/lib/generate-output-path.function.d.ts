import { FileType } from "@nut-tree/shared";
/**
 * {@link generateOutputPath} is used to assemble full file path from a filename and various parameters
 * @param filename The base filename
 * @param params A config object which allows to configure {@link FileType}, base path, filename prefix and filename postfix
 */
export declare const generateOutputPath: (filename: string, params?: {
    type?: FileType;
    path?: string;
    prefix?: string;
    postfix?: string;
}) => string;
