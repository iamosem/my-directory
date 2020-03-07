import { Component, ViewChild, ElementRef, Output, EventEmitter, Input, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged
} from 'rxjs/operators';

@Component({
    selector: 'txt-auto-complete',
    templateUrl: './auto-complete.component.html',
    styleUrls: ['auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnChanges {
    @ViewChild('searchInputContainer', { read: ElementRef, static: false }) searchInputEl: ElementRef;
    @ViewChild('suggestionsContainer', { read: ElementRef, static: false }) suggestionsEl: ElementRef;

    @Input() debounceTime = 500;
    @Input() suggestions: any[] = [];

    @Output() searchFn = new EventEmitter<any>();

    modelChanged: Subject<string> = new Subject<string>();

    constructor(private renderer: Renderer2, ) {
        this.modelChanged.pipe(
            debounceTime(this.debounceTime),
            distinctUntilChanged()
        ).subscribe(value => {
            this.performSearch(value);
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('suggestions' in changes) {
            this.showSuggestions();
        }
    }

    changed(text: string) {
        this.modelChanged.next(text);
    }

    performSearch(value: string) {
        this.searchFn.emit({ value });
    }

    showSuggestions() {
        if (null == this.searchInputEl || null == this.suggestionsEl) {
            return;
        }

        if (null != this.suggestions && this.suggestions.length > 0) {
            this.renderer.addClass(this.searchInputEl.nativeElement, 'expanded');
            this.renderer.addClass(this.suggestionsEl.nativeElement, 'show');
        } else {
            this.renderer.removeClass(this.searchInputEl.nativeElement, 'expanded');
            this.renderer.removeClass(this.suggestionsEl.nativeElement, 'show');
        }
    }
}
