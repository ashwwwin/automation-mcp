import { Key } from "@nut-tree/shared";
import { KeyboardProviderInterface } from "@nut-tree/provider-interfaces";
export default class KeyboardAction implements KeyboardProviderInterface {
    static KeyLookupMap: Map<Key, string | null>;
    static keyLookup(key: Key): any;
    private static mapModifierKeys;
    private static key;
    constructor();
    type(input: string): Promise<void>;
    click(...keys: Key[]): Promise<void>;
    pressKey(...keys: Key[]): Promise<void>;
    releaseKey(...keys: Key[]): Promise<void>;
    setKeyboardDelay(delay: number): void;
}
