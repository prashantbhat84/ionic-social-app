import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabonePage } from './tabone.page';

describe('TabonePage', () => {
  let component: TabonePage;
  let fixture: ComponentFixture<TabonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
