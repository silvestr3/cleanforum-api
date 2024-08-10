import {
  Uploader,
  UploadParams,
} from "@/domain/forum/application/storage/uploader";
import { randomUUID } from "node:crypto";

interface Upload {
  url: string;
  fileName: string;
}

export class FakeUploader extends Uploader {
  public uploads: Upload[] = [];

  async upload({ fileName }: UploadParams): Promise<{ url: string }> {
    const url = randomUUID();

    this.uploads.push({
      fileName,
      url,
    });

    return { url };
  }
}
