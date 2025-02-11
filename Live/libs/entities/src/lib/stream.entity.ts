import { StreamType } from "./stream-type";

export class StreamEntity {
  constructor(public id: string,
    public title: string,
    public description: string,
    public countryCode: string,
    public deviceId: string,
    public streamType: StreamType) {
  }
}
