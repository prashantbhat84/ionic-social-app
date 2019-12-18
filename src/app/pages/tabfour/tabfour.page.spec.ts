import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabfourPage } from './tabfour.page';

describe('TabfourPage', () => {
  let component: TabfourPage;
  let fixture: ComponentFixture<TabfourPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabfourPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabfourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
