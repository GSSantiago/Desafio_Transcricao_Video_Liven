import path from "path";

import ffmpeg from "../lib/ffmpeg";

export function getMediaDuration(filePath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) return reject(err);
      const duration = metadata.format.duration || 0;
      resolve(Math.floor(duration));
    });
  });
}

export function convertToMP3(filePath: string, filename: string): Promise<string>{
  return new Promise((resolve, reject) => {
    const formatedName = filename.replace(/\.[^/.]+$/, "");
    
    const folder = path.dirname(filePath);
    const output = path.join(folder,`${formatedName}.mp3`);

    ffmpeg(filePath)
      .toFormat("mp3")
      .on("end", () => {
        resolve(output);
      })
      .on("error", (err) => {
        reject(err);
      })
      .save(output);
  });
 }