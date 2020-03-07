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
    @ViewChild('searchInputContainer', { read: ElementRef, static: false }) searchInputContainerEl: ElementRef;
    @ViewChild('suggestionsContainer', { read: ElementRef, static: false }) suggestionsContainerEl: ElementRef;

    searchStr: string;

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
        if (null == this.searchInputContainerEl || null == this.suggestionsContainerEl) {
            return;
        }
        if (null != this.suggestions && this.suggestions.length > 0) {
            this.renderer.addClass(this.searchInputContainerEl.nativeElement, 'expanded');
            this.renderer.addClass(this.suggestionsContainerEl.nativeElement, 'show');
        } else {
            this.renderer.removeClass(this.searchInputContainerEl.nativeElement, 'expanded');
            this.renderer.removeClass(this.suggestionsContainerEl.nativeElement, 'show');
        }
    }

    clearSearch() {
        if (null != this.searchStr && '' !== this.searchStr) {
            this.searchStr = '';
            this.performSearch('');
        }
    }
}
