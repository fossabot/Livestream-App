import * as appRoot from "app-root-path";
import { environment } from "../../environments/environment";

export const ServiceConfig = {
  os: process.platform,
  arch: process.arch,
  port: process.env.PORT ? process.env.PORT : environment.port,
  production: process.env.PRODUCTION ? process.env.PRODUCTION === "true" : environment.production,
  simulate: process.env.SIMULATE ? process.env.SIMULATE === "true" : environment.simulate,
  standalone: process.env.STANDALONE ? process.env.STANDALONE === "true" : environment.standalone,
  sessions: `${appRoot}/dist/apps/service/assets/data/sessions.json`,
  streams: `${appRoot}/dist/apps/service/assets/data/streams.json`,
  autostart: `${appRoot}/dist/apps/service/assets/data/autostart.json`,
  logfilename: `${appRoot}/dist/apps/service/logs/live-service.log`,
  ffmpeglogfilename: `${appRoot}/dist/apps/service/logs/live-ffmpeg.log`
};
