import {
  Component, OnDestroy,
  OnInit
} from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private resizeObservable$: Observable<Event> | null;
  private resizeSubscription$!: Subscription;

  isSplitDisabled = true;
  pageSplitDirection: 'vertical' | 'horizontal' = 'vertical';
  headerSizeInPercent = 20;
  bodySizeInPercent = 80;
  contentSplitDirection: 'vertical' | 'horizontal' = 'horizontal';
  leftChildSizeInPercent = 50;
  rightChildSizeInPercent = 50;

  constructor() {
    this.resizeObservable$ = null;
  }

  ngOnInit(): void {
    this.computeLayout();

    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$?.subscribe({
      next: () => this.computeLayout(),
    });
  }

  ngOnDestroy(): void {
    this.resizeSubscription$?.unsubscribe();
  }

  private computeLayout() {
    // landscape
    if (window.innerWidth > window.innerHeight) {
      this.contentSplitDirection = 'horizontal';
      this.headerSizeInPercent = 20;
      this.bodySizeInPercent = 80;
      this.leftChildSizeInPercent = 50;
      this.rightChildSizeInPercent = 50;
    }
    // portrait
    else {
      this.contentSplitDirection = 'vertical';
      this.headerSizeInPercent = 15;
      this.bodySizeInPercent = 85;
      this.leftChildSizeInPercent = 55;
      this.rightChildSizeInPercent = 45;
    }
  }
}
