import { Logger } from "../logging/logger";
import { ProcessExecutionService } from "../processes/process-execution-service";
import { injectable, inject } from "inversify";
import { Device } from "../devices/device";
import { DeviceState } from "../devices/device-state";
import { ChildProcess } from "child_process";
import { WebsocketServer } from "../core/websocket-server";
import { Stream } from "./stream";
import { FfmpegConfig } from "../../config/ffmpeg.config";

/**
 * Class responsible for opening a child process and passing the data to the websocket server
 */
@injectable()
export class StreamingSource {

    private _childProcess: ChildProcess;
    private _command: string;
    private _arguments: string[] = [];

    constructor(@inject("Logger") private _logger: Logger,
        @inject("FfmpegLogger") private _ffmpegLogger: Logger,
        @inject("WebsocketService") private _websocketServer: WebsocketServer,
        @inject("ProcessExecutionService") private _processExecutionService: ProcessExecutionService,
        private _device: Device,
        private _stream: Stream) {
        this.parseFfmpegConfig();
    }

    private parseFfmpegConfig(): void {
        this._command = FfmpegConfig.command;
        this._arguments = FfmpegConfig.arguments.map((argument: string) => argument.replace("__deviceId__", this._device.id));
        this._logger.debug(`Parsed command: ${this._command} ${this._arguments.join(" ")}.`);
    }

    public get hasValidDevice(): boolean {
        return this._device.state !== DeviceState.UnknownDevice;
    }

    public startStreaming(): void {
        this._websocketServer.addStream(this._stream.id);
        this._childProcess = this._processExecutionService.spawn(this._command, this._arguments);
        this._childProcess.on("error", (error) => this._logger.error(`Error spawning child process: ${error}.`));
        this._logger.debug(`Started child process from device ${this._device.id} and PID ${this._childProcess.pid}.`);
        this._childProcess.stdout.on("data", (data) => this._websocketServer.emit(this._stream.id, data));
        this._childProcess.stderr.on("data", (data) => this._ffmpegLogger.info(`${data}`));
        this._childProcess.on("close", (code) => this._logger.info(`Child process exited with code ${code}.`));
    }

    public stopStreaming(): void {
        this._childProcess.kill();
        this._logger.debug(`Killing child process with id ${this._childProcess.pid}.`);
        this._websocketServer.removeStream(this._stream.id);
    }
}
