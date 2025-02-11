import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AngularMaterialModule } from "./angular-material.module";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { ShutdownComponent } from "./components/shutdown/shutdown.component";
import { ShutdownDialogComponent } from "./components/shutdown-dialog/shutdown-dialog.component";
import { HttpClientModule } from "@angular/common/http";
import { StreamsComponent } from "./components/streams/streams.component";
import { SessionsComponent } from "./components/sessions/sessions.component";
import { ActivationDialogComponent } from "./components/activation-dialog/activation-dialog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material";
import { ActivationTileComponent } from "./components/activation-tile/activation-tile.component";
import { LogoComponent } from "./components/logo/logo.component";
import { InlineSVGModule } from "ng-inline-svg";
import { ActivationDeletionDialogComponent } from "./components/activation-deletion-dialog/activation-deletion-dialog.component";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    InlineSVGModule.forRoot()
  ],
  declarations: [
    AppComponent,
    LogoComponent,
    DashboardComponent,
    NavigationComponent,
    ShutdownComponent,
    ShutdownDialogComponent,
    StreamsComponent,
    SessionsComponent,
    ActivationDialogComponent,
    ActivationTileComponent,
    ActivationDeletionDialogComponent
  ],
  entryComponents: [
    ShutdownDialogComponent,
    ActivationDialogComponent,
    ActivationDeletionDialogComponent
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
