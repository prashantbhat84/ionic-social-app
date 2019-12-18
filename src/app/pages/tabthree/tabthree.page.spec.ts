import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabthreePage } from './tabthree.page';

describe('TabthreePage', () => {
  let component: TabthreePage;
  let fixture: ComponentFixture<TabthreePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabthreePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabthreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
