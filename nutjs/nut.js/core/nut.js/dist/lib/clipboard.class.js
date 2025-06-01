"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClipboardClass = void 0;
class ClipboardClass {
    /**
     * {@link ClipboardClass} class constructor
     * @param providerRegistry
     */
    constructor(providerRegistry) {
        this.providerRegistry = providerRegistry;
    }
    /**
     * {@link setContent} copies a given text to the system clipboard
     * @param text The text to copy
     */
    async setContent(text) {
        await this.providerRegistry.getClipboard().copy(text);
        this.providerRegistry.getLogProvider().debug(`Saved to clipboard`);
    }
    /**
     * {@link getContent} returns the current content of the system clipboard (limited to text)
     */
    async getContent() {
        const content = await this.providerRegistry.getClipboard().paste();
        this.providerRegistry.getLogProvider().debug(`Fetched clipboard content`);
        return content;
    }
}
exports.ClipboardClass = ClipboardClass;
//# sourceMappingURL=clipboard.class.js.map