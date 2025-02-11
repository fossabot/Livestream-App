import { Injectable } from "@angular/core";
import { L3asPlayer, UserAgentInfo } from "@live/l3as";

@Injectable({
  providedIn: "root"
})
export class L3asService {
  public userAgentInfo: UserAgentInfo;
  public isBrowserCompatible: boolean;
  private _l3asPlayer: L3asPlayer;

  constructor() {
  }

  public initialize(): void {
    this._l3asPlayer = new L3asPlayer();
    this.userAgentInfo = this._l3asPlayer.userAgentInfo;
    this.isBrowserCompatible = this._l3asPlayer.isBrowserCompatible;
  }

  public get isPlaying(): boolean {
    return this._l3asPlayer.isPlaying;
  }

  public play(streamId: string): void {
    console.log("play");
    this._l3asPlayer.play(streamId);
  }

  public stop(): void {
    this._l3asPlayer.stop();
  }

  public mute(): void {
    this._l3asPlayer.mute();
  }

  public unmute(): void {
    this._l3asPlayer.unmute();
  }

  public setVolume(value: number): void {
    this._l3asPlayer.setVolume(value);
  }
}
