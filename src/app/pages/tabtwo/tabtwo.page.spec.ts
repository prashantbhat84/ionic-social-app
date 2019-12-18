import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabtwoPage } from './tabtwo.page';

describe('TabtwoPage', () => {
  let component: TabtwoPage;
  let fixture: ComponentFixture<TabtwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabtwoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabtwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
