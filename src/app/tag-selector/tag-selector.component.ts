import { AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Chips } from 'primeng/chips';
import { fromEvent, map, Observable, startWith } from 'rxjs';

import { RecipeService } from '../shared/recipe.service';

@Component({
  selector: 'app-tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagSelectorComponent),
      multi: true
    }
  ]
})
export class TagSelectorComponent implements AfterViewInit, OnInit, ControlValueAccessor {
  @Input() allowNew: boolean = false;
  @Input() placeholder: string = '';
  @Input() label: string = 'Filtrer par catégories ou ingrédients';
  @ViewChild(MatAutocompleteTrigger) autoComplete: MatAutocompleteTrigger;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  textInput: HTMLInputElement = null;
  allTags: string[] = [];
  selectedTags: string[] = [];
  filteredTags: Observable<string[]>;

  tagControl: FormControl = new FormControl();

  propagateChange = (_: any) => { };

  constructor(private recipeService: RecipeService) {
    this.recipeService.getAllTags()
      .subscribe((tags: string[]) => {
        this.allTags = tags;
      });

    this.filteredTags = this.tagControl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
    )
  }

  ngOnInit() {

  }

  add(event: MatChipInputEvent): void {
    const tag = event.value;
    if (this.allowNew && tag?.length > 0) {
      this.selectedTags.push(tag);
      this.propagateChange(this.selectedTags);

      event.chipInput.clear();
      this.tagControl.setValue(null);
      this.tagInput.nativeElement.value = '';
      this.autoComplete.closePanel();
    }
  }

  remove(tag: string): void {
    let index = this.selectedTags.indexOf(tag);
    this.selectedTags.splice(index, 1);
    this.propagateChange(this.selectedTags);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let tag = event.option.value;
    this.selectedTags.push(tag);

    this.tagInput.nativeElement.value = '';
    this.tagControl.setValue(null);

    this.propagateChange(this.selectedTags);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }

  ngAfterViewInit() {

  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.selectedTags = value;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

}
