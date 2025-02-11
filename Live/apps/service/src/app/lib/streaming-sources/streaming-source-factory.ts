import { interfaces } from "inversify";
import { Logger } from "../logging/logger";
import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { StreamingSource } from "./streaming-source";
import { DeviceDetector } from "../devices/device-detector";
import { WebsocketServer } from "../core/websocket-server";
import { Stream } from "../streams/stream";
import { ICommand } from '../streaming-command/i-command';

export const StreamingSourceFactory = (context: interfaces.Context) =>
    (deviceId: string, stream: Stream) => {
        const logger = context.container.get<Logger>("Logger");
        const ffmpegLogger = context.container.get<Logger>("FfmpegLogger");
        const processExecutionService = context.container.get<ProcessExecutionService>("ProcessExecutionService");
        const websocketServer = context.container.get<WebsocketServer>("WebsocketServer");
        const deviceDetector = context.container.get<DeviceDetector>("DeviceDetector");
        const streamingCommand = context.container.get<ICommand>("StreamingCommand");
        const device = deviceDetector.getDevice(deviceId);

        return new StreamingSource(logger, ffmpegLogger, streamingCommand, websocketServer, processExecutionService, device, stream);
    };
