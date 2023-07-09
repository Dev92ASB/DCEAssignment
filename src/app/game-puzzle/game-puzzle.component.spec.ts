import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePuzzleComponent } from './game-puzzle.component';

describe('GamePuzzleComponent', () => {
  let component: GamePuzzleComponent;
  let fixture: ComponentFixture<GamePuzzleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GamePuzzleComponent]
    });
    fixture = TestBed.createComponent(GamePuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
