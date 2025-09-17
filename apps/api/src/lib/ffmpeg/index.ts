import ffmpeg from "fluent-ffmpeg";

ffmpeg.setFfmpegPath("C:/ffmpeg/bin/ffmpeg.exe");
ffmpeg.setFfprobePath("C:/ffmpeg/bin/ffprobe.exe");
ffmpeg.setFlvtoolPath("C:/ffmpeg/bin/flvtool.exe");

export default ffmpeg;
