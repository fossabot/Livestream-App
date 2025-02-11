import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { StreamsComponent } from "./streams.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("StreamsComponent", () => {
  let component: StreamsComponent;
  let fixture: ComponentFixture<StreamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StreamsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
