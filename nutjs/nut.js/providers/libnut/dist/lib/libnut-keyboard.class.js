"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const import_libnut_1 = require("../import_libnut");
const shared_1 = require("@nut-tree/shared");
class KeyboardAction {
    static keyLookup(key) {
        return this.KeyLookupMap.get(key);
    }
    static mapModifierKeys(...keys) {
        return keys
            .map((modifier) => KeyboardAction.keyLookup(modifier))
            .filter((modifierKey) => modifierKey != null && modifierKey.length > 1);
    }
    static key(key, event, ...modifiers) {
        return new Promise((resolve, reject) => {
            try {
                const nativeKey = KeyboardAction.keyLookup(key);
                const modifierKeys = this.mapModifierKeys(...modifiers);
                if (nativeKey != null) {
                    import_libnut_1.libnut.keyToggle(nativeKey, event, modifierKeys);
                }
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    constructor() {
    }
    type(input) {
        return new Promise((resolve, reject) => {
            try {
                import_libnut_1.libnut.typeString(input);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    click(...keys) {
        return new Promise((resolve, reject) => {
            try {
                keys.reverse();
                const [key, ...modifiers] = keys;
                const nativeKey = KeyboardAction.keyLookup(key);
                const modifierKeys = KeyboardAction.mapModifierKeys(...modifiers);
                if (nativeKey != null) {
                    import_libnut_1.libnut.keyTap(nativeKey, modifierKeys);
                }
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    pressKey(...keys) {
        return new Promise(async (resolve, reject) => {
            try {
                keys.reverse();
                const [key, ...modifiers] = keys;
                await KeyboardAction.key(key, "down", ...modifiers);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    releaseKey(...keys) {
        return new Promise(async (resolve, reject) => {
            try {
                keys.reverse();
                const [key, ...modifiers] = keys;
                await KeyboardAction.key(key, "up", ...modifiers);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    setKeyboardDelay(delay) {
        import_libnut_1.libnut.setKeyboardDelay(delay);
    }
}
KeyboardAction.KeyLookupMap = new Map([
    [shared_1.Key.A, "a"],
    [shared_1.Key.B, "b"],
    [shared_1.Key.C, "c"],
    [shared_1.Key.D, "d"],
    [shared_1.Key.E, "e"],
    [shared_1.Key.F, "f"],
    [shared_1.Key.G, "g"],
    [shared_1.Key.H, "h"],
    [shared_1.Key.I, "i"],
    [shared_1.Key.J, "j"],
    [shared_1.Key.K, "k"],
    [shared_1.Key.L, "l"],
    [shared_1.Key.M, "m"],
    [shared_1.Key.N, "n"],
    [shared_1.Key.O, "o"],
    [shared_1.Key.P, "p"],
    [shared_1.Key.Q, "q"],
    [shared_1.Key.R, "r"],
    [shared_1.Key.S, "s"],
    [shared_1.Key.T, "t"],
    [shared_1.Key.U, "u"],
    [shared_1.Key.V, "v"],
    [shared_1.Key.W, "w"],
    [shared_1.Key.X, "x"],
    [shared_1.Key.Y, "y"],
    [shared_1.Key.Z, "z"],
    [shared_1.Key.F1, "f1"],
    [shared_1.Key.F2, "f2"],
    [shared_1.Key.F3, "f3"],
    [shared_1.Key.F4, "f4"],
    [shared_1.Key.F5, "f5"],
    [shared_1.Key.F6, "f6"],
    [shared_1.Key.F7, "f7"],
    [shared_1.Key.F8, "f8"],
    [shared_1.Key.F9, "f9"],
    [shared_1.Key.F10, "f10"],
    [shared_1.Key.F11, "f11"],
    [shared_1.Key.F12, "f12"],
    [shared_1.Key.F13, "f13"],
    [shared_1.Key.F14, "f14"],
    [shared_1.Key.F15, "f15"],
    [shared_1.Key.F16, "f16"],
    [shared_1.Key.F17, "f17"],
    [shared_1.Key.F18, "f18"],
    [shared_1.Key.F19, "f19"],
    [shared_1.Key.F20, "f20"],
    [shared_1.Key.F21, "f21"],
    [shared_1.Key.F22, "f22"],
    [shared_1.Key.F23, "f23"],
    [shared_1.Key.F24, "f24"],
    [shared_1.Key.Num0, "0"],
    [shared_1.Key.Num1, "1"],
    [shared_1.Key.Num2, "2"],
    [shared_1.Key.Num3, "3"],
    [shared_1.Key.Num4, "4"],
    [shared_1.Key.Num5, "5"],
    [shared_1.Key.Num6, "6"],
    [shared_1.Key.Num7, "7"],
    [shared_1.Key.Num8, "8"],
    [shared_1.Key.Num9, "9"],
    [shared_1.Key.NumPad0, "numpad_0"],
    [shared_1.Key.NumPad1, "numpad_1"],
    [shared_1.Key.NumPad2, "numpad_2"],
    [shared_1.Key.NumPad3, "numpad_3"],
    [shared_1.Key.NumPad4, "numpad_4"],
    [shared_1.Key.NumPad5, "numpad_5"],
    [shared_1.Key.NumPad6, "numpad_6"],
    [shared_1.Key.NumPad7, "numpad_7"],
    [shared_1.Key.NumPad8, "numpad_8"],
    [shared_1.Key.NumPad9, "numpad_9"],
    [shared_1.Key.Decimal, "numpad_decimal"],
    [shared_1.Key.Space, "space"],
    [shared_1.Key.Escape, "escape"],
    [shared_1.Key.Tab, "tab"],
    [shared_1.Key.LeftAlt, "alt"],
    [shared_1.Key.LeftControl, "control"],
    [shared_1.Key.RightAlt, "right_alt"],
    [shared_1.Key.RightControl, "right_control"],
    [shared_1.Key.LeftWin, "win"],
    [shared_1.Key.RightWin, "right_win"],
    [shared_1.Key.LeftCmd, "cmd"],
    [shared_1.Key.RightCmd, "right_cmd"],
    [shared_1.Key.Menu, "menu"],
    [shared_1.Key.Fn, "fn"],
    [shared_1.Key.LeftShift, "shift"],
    [shared_1.Key.LeftSuper, "command"],
    [shared_1.Key.RightShift, "right_shift"],
    [shared_1.Key.RightSuper, "command"],
    [shared_1.Key.Grave, "`"],
    [shared_1.Key.Minus, "-"],
    [shared_1.Key.Equal, "="],
    [shared_1.Key.Backspace, "backspace"],
    [shared_1.Key.LeftBracket, "["],
    [shared_1.Key.RightBracket, "]"],
    [shared_1.Key.Backslash, "\\"],
    [shared_1.Key.Semicolon, ";"],
    [shared_1.Key.Quote, "'"],
    [shared_1.Key.Return, "enter"],
    [shared_1.Key.Comma, ","],
    [shared_1.Key.Period, "."],
    [shared_1.Key.Slash, "/"],
    [shared_1.Key.Left, "left"],
    [shared_1.Key.Up, "up"],
    [shared_1.Key.Right, "right"],
    [shared_1.Key.Down, "down"],
    [shared_1.Key.Print, "printscreen"],
    [shared_1.Key.Pause, null],
    [shared_1.Key.Insert, "insert"],
    [shared_1.Key.Delete, "delete"],
    [shared_1.Key.Home, "home"],
    [shared_1.Key.End, "end"],
    [shared_1.Key.PageUp, "pageup"],
    [shared_1.Key.PageDown, "pagedown"],
    [shared_1.Key.Add, "add"],
    [shared_1.Key.Subtract, "subtract"],
    [shared_1.Key.Multiply, "multiply"],
    [shared_1.Key.Divide, "divide"],
    [shared_1.Key.Enter, "enter"],
    [shared_1.Key.CapsLock, "caps_lock"],
    [shared_1.Key.ScrollLock, "scroll_lock"],
    [shared_1.Key.NumLock, "num_lock"],
    [shared_1.Key.AudioMute, "audio_mute"],
    [shared_1.Key.AudioVolDown, "audio_vol_down"],
    [shared_1.Key.AudioVolUp, "audio_vol_up"],
    [shared_1.Key.AudioPlay, "audio_play"],
    [shared_1.Key.AudioStop, "audio_stop"],
    [shared_1.Key.AudioPause, "audio_pause"],
    [shared_1.Key.AudioPrev, "audio_prev"],
    [shared_1.Key.AudioNext, "audio_next"],
    [shared_1.Key.AudioRewind, "audio_rewind"],
    [shared_1.Key.AudioForward, "audio_forward"],
    [shared_1.Key.AudioRepeat, "audio_repeat"],
    [shared_1.Key.AudioRandom, "audio_random"]
]);
exports.default = KeyboardAction;
//# sourceMappingURL=libnut-keyboard.class.js.map