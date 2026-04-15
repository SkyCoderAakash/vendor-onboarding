import { openDB } from "idb";
import type { DBSchema } from "idb";

export interface FileMetadata {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
}

interface OnboardingDB extends DBSchema {
  files: {
    key: string;
    value: {
      metadata: FileMetadata;
      blob: Blob;
    };
  };
}

class IndexedDBService {
  private dbName = "VendorOnboardingDB";
  private version = 1;

  async getDB() {
    return openDB<OnboardingDB>(this.dbName, this.version, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("files")) {
          db.createObjectStore("files");
        }
      },
    });
  }

  async saveFile(file: File): Promise<string> {
    const db = await this.getDB();
    const id = `${Date.now()}_${file.name}`;

    const metadata: FileMetadata = {
      id,
      name: file.name,
      type: file.type,
      size: file.size,
      uploadDate: new Date().toISOString(),
    };

    await db.put("files", { metadata, blob: file }, id);
    return id;
  }

  async getFile(
    id: string,
  ): Promise<{ metadata: FileMetadata; blob: Blob } | undefined> {
    const db = await this.getDB();
    return db.get("files", id);
  }

  async deleteFile(id: string): Promise<void> {
    const db = await this.getDB();
    await db.delete("files", id);
  }

  async getFileUrl(id: string): Promise<string | null> {
    const fileData = await this.getFile(id);
    if (fileData) {
      return URL.createObjectURL(fileData.blob);
    }
    return null;
  }
}

export const indexedDBService = new IndexedDBService();
