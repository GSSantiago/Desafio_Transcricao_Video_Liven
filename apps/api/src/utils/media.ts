import fs from "fs";  

import path from "path";

import ffmpeg from "../lib/ffmpeg";
import { BIT_RATE, MAX_SIZE } from "../constants/audio";

export function getMediaDuration(filePath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) return reject(err);
      const duration = metadata.format.duration || 0;
      resolve(Math.floor(duration));
    });
  });
}

function getBitrate(filePath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) return reject(err);
      const bitrate = metadata.format.bit_rate
        ? metadata.format.bit_rate
        : BIT_RATE;

      resolve(bitrate);
    });
  });
}

export function convertToMP3(filePath: string, filename: string): Promise<string>{
  return new Promise((resolve, reject) => {
    const formatedName = filename.replace(/\.[^/.]+$/, "");

    const folder = path.dirname(filePath);
    const output = path.join(folder,`out-${formatedName}.mp3`);

    ffmpeg(filePath)
      .audioBitrate(128)
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

 export function splitAudio(filePath: string): Promise<string[]> {
  return new Promise(async (resolve, reject) => {
    const outputFolder = path.dirname(filePath);

    const bitrate = await getBitrate(filePath) / 8; //Em bytes

    const maxDurationSec = Math.floor(MAX_SIZE / bitrate);

    const outputPattern = path.join(outputFolder, "part-%03d.mp3");

    ffmpeg(filePath)
        .outputOptions([
          "-f segment",
          `-segment_time ${maxDurationSec}`,
          "-c copy"
        ])
        .output(outputPattern)
        .on("end", () => {
          const files = fs
            .readdirSync(outputFolder)
            .filter((file) => file.startsWith("part-"))
            .map((file) => path.join(outputFolder, file));

          resolve(files);
        })
        .on("error", (err) => reject(err))
        .run();
    });

  }