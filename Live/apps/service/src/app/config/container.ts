import { LinuxShutdownService } from "../lib/shutdown/linux-shutdown-service";
import { ShutdownSimulationService } from "../lib/shutdown/shutdown-simulation-service";
import { Container, interfaces } from "inversify";
import { Logger } from "../lib/logging/logger";
import { ServiceConfig } from "./service.config";
import { ProcessExecutionService } from "../lib/process-execution/process-execution-service";
import { DeviceDetector } from "../lib/devices/device-detector";
import { LinuxDeviceDetector } from "../lib/devices/linux-device-detector";
import { SimulationDeviceDetector } from "../lib/devices/simulation-device-detector";
import { DataService } from "../lib/data/data-service";
import { SessionService } from "../lib/sessions/session-service";
import { StreamService } from "../lib/streams/stream-service";
import { WebsocketServer } from "../lib/core/websocket-server";
import { Stream } from "../lib/streams/stream";
import { Session } from "../lib/sessions/session";
import { Device } from "../lib/devices/device";
import { DeviceFactory } from "../lib/devices/device-factory";
import { SessionFactory } from "../lib/sessions/session-factory";
import { StreamFactory } from "../lib/streams/stream-factory";
import { StreamingSourceFactory } from "../lib/streaming-sources/streaming-source-factory";
import { Bootstrapper } from "../lib/core/bootstrapper";
import { WebServer } from "../lib/core/web-server";
import { ActivationService } from "../lib/activation/activation-service";
import { Scheduler } from "../lib/scheduling/scheduler";
import { ShutdownService } from "../lib/shutdown/shutdown-service";
import { ServiceLogger, FfmpegLogger } from "./logging.config";
import { StreamingSimulationSourceFactory } from "../lib/streaming-sources/streaming-simulation-source-factory";
import { IStreamingSource } from "../lib/streaming-sources/i-streaming-source";
import { ActivityService } from "../lib/activity/activity.service";
import { ICommand } from '../lib/streaming-command/i-command';
import { LinuxStreamingCommand } from '../lib/streaming-command/linux-streaming-command';
import { WindowsDeviceDetector } from '../lib/devices/windows-device-detector';
import { WindowStreamingCommand } from '../lib/streaming-command/windows-streaming-command';
import { WindowsShutdownService } from '../lib/shutdown/windows-shutdown-service';

export const container = new Container();

if (!ServiceConfig.production) {
  container.bind<ShutdownService>("ShutdownService").to(ShutdownSimulationService).inSingletonScope();
} else {
  switch (ServiceConfig.os) {
    case "linux": {
      container.bind<ShutdownService>("ShutdownService").to(LinuxShutdownService).inSingletonScope();
      break;
    }
    case "win32": {
      container.bind<ShutdownService>("ShutdownService").to(WindowsShutdownService).inSingletonScope();
      break;
    }
    default: {
      throw new Error(`OS ${ServiceConfig.os} is unsupported.`);
    }
  }
}

if (ServiceConfig.simulate) {
  container.bind<DeviceDetector>("DeviceDetector").to(SimulationDeviceDetector).inSingletonScope();
  container.bind<interfaces.Factory<IStreamingSource>>("StreamingSourceFactory").toFactory(StreamingSimulationSourceFactory);
} else {
  container.bind<interfaces.Factory<IStreamingSource>>("StreamingSourceFactory").toFactory(StreamingSourceFactory);

  switch (ServiceConfig.os) {
    case "linux": {
      container.bind<DeviceDetector>("DeviceDetector").to(LinuxDeviceDetector).inSingletonScope();
      container.bind<ICommand>("StreamingCommand").toConstantValue(LinuxStreamingCommand);
      break;
    }
    case "win32": {
      container.bind<DeviceDetector>("DeviceDetector").to(WindowsDeviceDetector).inSingletonScope();
      container.bind<ICommand>("StreamingCommand").toConstantValue(WindowStreamingCommand);
      break;
    }
    default: {
      throw new Error(`Device detection for OS ${ServiceConfig.os} is unsupported.`);
    }
  }
}

container.bind<interfaces.Factory<Device>>("DeviceFactory").toFactory(DeviceFactory);
container.bind<interfaces.Factory<Stream>>("StreamFactory").toFactory(StreamFactory);
container.bind<interfaces.Factory<Session>>("SessionFactory").toFactory(SessionFactory);

container.bind<DataService>("DataService").to(DataService);
container.bind<Bootstrapper>("Bootstrapper").to(Bootstrapper);
container.bind<ActivityService>("ActivityService").to(ActivityService);
container.bind<ProcessExecutionService>("ProcessExecutionService").to(ProcessExecutionService);

container.bind<Logger>("Logger").toConstantValue(new Logger(ServiceLogger));
container.bind<Logger>("FfmpegLogger").toConstantValue(new Logger(FfmpegLogger));

container.bind<StreamService>("StreamService").to(StreamService).inSingletonScope();
container.bind<SessionService>("SessionService").to(SessionService).inSingletonScope();
container.bind<WebServer>("WebServer").to(WebServer).inSingletonScope();
container.bind<WebsocketServer>("WebsocketServer").to(WebsocketServer).inSingletonScope();
container.bind<ActivationService>("ActivationService").to(ActivationService).inSingletonScope();
container.bind<Scheduler>("Scheduler").to(Scheduler).inSingletonScope();
