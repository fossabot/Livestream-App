import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DashboardComponent } from "./dashboard.component";
import { ActivationTileComponent } from "../activation-tile/activation-tile.component";
import { MatDialog, MatDialogModule, MatCardModule, MatGridListModule } from "@angular/material";
import { HttpClientModule } from "@angular/common/http";

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatDialogModule,
        MatCardModule,
        MatGridListModule
      ],
      declarations: [DashboardComponent, ActivationTileComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
