import { LightningElement, api, track } from "lwc";

export default class Pagination extends LightningElement {
  records = [];
  @api pageRange = 5;
  @api
  get inputRecords() {
    return this.records;
  }

  set inputRecords(value) {
    if (value) {
      this.records = value;
      this.setRecordsToDisplay();
    }
  }

  @api recordsperpage = 5;
  @api browsemessage = false;
  @track recordsToDisplay;
  totalRecords;
  pageNo;
  totalPages;
  startRecord;
  endRecord;
  end = false;

  get options() {
    return [
      { label: "2", value: "2" },
      { label: "5", value: "5", selected: "selected" },
      { label: "10", value: "10" },
      { label: "15", value: "15" },
      { label: "20", value: "20" },
      { label: "30", value: "30" },
      { label: "40", value: "40" },
      { label: "50", value: "50" }
    ];
  }

  handlex(event) {
    this.browsemessage = false;
  }

  handlePageSize(event) {
    this.recordsperpage = event.target.value;
    this.setRecordsToDisplay();
  }

  setRecordsToDisplay() {
    try {
      this.totalRecords = this.records.length;
      this.pageNo = 1;
      this.totalPages = Math.ceil(this.totalRecords / this.recordsperpage);
      if (this.totalPages > 1) {
        this.browsemessage = false;
      }
      this.preparePaginationList();
    } catch (error) {
      const errMsg = this.reduceErrors(error).join(", ");
      console.log(errMsg);
    }
  }

  /**
   * @description: method called by parent component to set the total records count
   * @param {recordCount} totalRecorCount in parent component
   */
  @api
  setPageNumbers({ recordCount }) {
    this.totalRecords = recordCount;
    this.totalPages = Math.ceil(this.totalRecords / this.recordsperpage);
    if (this.totalPages > 1) {
      this.browsemessage = true;
    }
    this.preparePaginationList();
  }

  handleBtnClick(event) {
    let label = event.target.name;
    if (label === "First") {
      this.browsemessage = false;
      this.handleFirst();
    } else if (label === "Previous") {
      this.browsemessage = false;
      this.handlePrevious();
    } else if (label === "Next") {
      this.browsemessage = false;
      this.handleNext();
    } else if (label === "Last") {
      this.browsemessage = false;
      this.handleLast();
    }
  }

  handleNext() {
    this.pageNo += 1;
    this.preparePaginationList();
  }

  handlePrevious() {
    this.pageNo -= 1;
    this.preparePaginationList();
  }

  handleFirst() {
    this.pageNo = 1;
    this.preparePaginationList();
  }

  handleLast() {
    this.pageNo = this.totalPages;
    this.preparePaginationList();
  }

  preparePaginationList() {
    try {
      let begin = (this.pageNo - 1) * parseInt(this.recordsperpage);
      let end = parseInt(begin) + parseInt(this.recordsperpage);
      this.recordsToDisplay = this.records.slice(begin, end);

      this.startRecord = begin + parseInt(1);
      this.endRecord = end > this.totalRecords ? this.totalRecords : end;
      this.end = end > this.totalRecords ? true : false;

      const event = new CustomEvent("pagination", {
        detail: {
          records: this.recordsToDisplay
        }
      });
      this.dispatchEvent(event);
    } catch (error) {
      const errMsg = this.reduceErrors(error).join(", ");
      console.log(errMsg);
    }
  }

  handlePage(button) {
    this.pageNo = button.target.label;
    this.preparePaginationList();
  }

  renderPage(event) {
    this.pageNo = Number(event.target.dataset.index);
    this.preparePaginationList();
  }

  get isDisabledFirstPage() {
    return this.pageNo === 1;
  }

  get isDisabledLastPage() {
    return this.pageNo === this.totalPages;
  }

  get indexesRenderedPages() {
    let min = 1;
    let currentIndex = this.pageNo;
    let max = this.totalPages;
    let median = Math.floor(this.pageRange / 2);
    let range = Math.min(this.pageRange - 1, max - min); // as range is to show 5 pageRange
    const createPageIndex = (value, isCurrentPage) => {
      return { value, isCurrentPage };
    };
    const newArr = [];

    let start = currentIndex - median;
    let end = currentIndex + median;
    // making sure start is not less than min
    if (start < min) {
      end += min - start;
      start = min;
    }
    // making sure end is not increasing max page numbers
    end = end > max ? max : end;
    start = end - start < range ? start - (range - (end - start)) : start;

    for (let i = start; i <= end; ++i) {
      newArr.push(createPageIndex(i, currentIndex === i ? true : false));
    }
    return newArr;
  }

  get renderPagination() {
    return this.records.length > 0;
  }

  reduceErrors(errors) {
    if (!Array.isArray(errors)) {
      errors = [errors];
    }

    return (
      errors
        // Remove null/undefined items
        .filter((error) => !!error)
        // Extract an error message
        .map((error) => {
          // UI API read errors
          if (Array.isArray(error.body)) {
            return error.body.map((e) => e.message);
          }
          // UI API DML, Apex and network errors
          else if (error.body && typeof error.body.message === "string") {
            return error.body.message;
          }
          // JS errors
          else if (typeof error.message === "string") {
            return error.message;
          }
          // Unknown error shape so try HTTP status text
          return error.statusText;
        })
        // Flatten
        .reduce((prev, curr) => prev.concat(curr), [])
        // Remove empty strings
        .filter((message) => !!message)
    );
  }
}
