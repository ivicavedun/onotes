import { Plugin, TFile, normalizePath } from "obsidian";

export default class AutoTimestampNotes extends Plugin {
    private isCreatingNote = false;

    async onload() {
        // Create note on startup
        this.app.workspace.onLayoutReady(() => {
            this.createAndOpenNote();
        });

        // Intercept Ctrl/Cmd+N
        this.registerDomEvent(
            document,
            "keydown",
            (evt) => {
                if ((evt.ctrlKey || evt.metaKey) && evt.key === "n" && !evt.shiftKey) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    this.createAndOpenNote();
                }
            },
            { capture: true }
        );

        // Intercept file creation to catch other new note methods
        this.registerEvent(
            this.app.vault.on("create", async (file) => {
                if (this.isCreatingNote) return;

                if (file instanceof TFile && file.extension === "md") {
                    // If it's an Untitled note, rename and move it
                    if (file.basename === "Untitled" || file.basename.startsWith("Untitled ")) {
                        this.isCreatingNote = true;

                        // Small delay to ensure file is ready
                        setTimeout(async () => {
                            try {
                                await this.renameAndMoveFile(file);
                            } catch (error) {
                                console.error("Failed to rename/move file:", error);
                            } finally {
                                setTimeout(() => {
                                    this.isCreatingNote = false;
                                }, 200);
                            }
                        }, 50);
                    }
                }
            })
        );
    }

    async renameAndMoveFile(file: TFile) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const timestamp = Math.floor(now.getTime() / 1000);

        const folderPath = normalizePath(`note/${year}-${month}-${day}`);
        const newPath = normalizePath(`${folderPath}/${timestamp}.md`);

        // Create folder if needed
        try {
            if (!this.app.vault.getAbstractFileByPath(folderPath)) {
                await this.app.vault.createFolder(folderPath);
            }
        } catch (e) {
            // Folder might already exist
        }

        // Rename and move the file
        await this.app.fileManager.renameFile(file, newPath);
    }

    async createAndOpenNote() {
        if (this.isCreatingNote) return;
        this.isCreatingNote = true;

        try {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, "0");
            const day = String(now.getDate()).padStart(2, "0");
            const timestamp = Math.floor(now.getTime() / 1000);

            const folderPath = normalizePath(`note/${year}-${month}-${day}`);
            const filePath = normalizePath(`${folderPath}/${timestamp}.md`);

            // Create folder if needed
            try {
                if (!this.app.vault.getAbstractFileByPath(folderPath)) {
                    await this.app.vault.createFolder(folderPath);
                }
            } catch (e) {
                // Folder might already exist
            }

            // Create and open file
            const file = await this.app.vault.create(filePath, "");
            const leaf = this.app.workspace.getLeaf(false);
            await leaf.openFile(file);
        } catch (error) {
            console.error("Error creating timestamp note:", error);
        } finally {
            setTimeout(() => {
                this.isCreatingNote = false;
            }, 200);
        }
    }
}
