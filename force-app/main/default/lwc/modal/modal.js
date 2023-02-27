import { LightningElement, api } from "lwc";

export default class LwcModal extends LightningElement {
	@api showModal = false;
	@api message;
	@api submessage;
	@api modalHeading;
	@api saveLabel;
	@api closeLabel;
	//   @api modalSizeClass;
	//   @api modalContentStyle;
	tableStyleInLine =
		"min-height: 100px; max-height: 300px; overflow-y: auto; border-bottom: 0.5px solid #DDDBDA; border-right: 0.5px solid #DDDBDA; border-left: 0.5px solid #DDDBDA;";
	modalSizeClass = "slds-modal_medium";
	//   modalContentStyle = "height:65%";
	modalGridStyleClass = "slds-medium-size_1-of-2";
	@api disableSaveButton = false;
	@api disableCloseButton = false;
	@api columns;

	@api
	openModal() {
		this.showModal = true;
	}

	@api
	closeModal() {
		this.showModal = false;
	}

	handleSave() {
		// Creates the event with the data.
		const selectedEvent = new CustomEvent("handlesavemodal");
		this.dispatchEvent(selectedEvent);
	}

	handleClose() {
		// Creates the event with the data.
		const selectedEvent = new CustomEvent("handleclosemodal");
		// Dispatches the event.
		this.dispatchEvent(selectedEvent);
	}

	get getSectionClass() {
		let cls = "slds-modal slds-fade-in-open";
		cls += this.modalSizeClass
			? " slds-modal_medium"
			: " " + this.modalSizeClass;
		return cls;
	}
	get getContentStyle() {
		return this.modalContentStyle;
	}

	handleFormInputChange(event) {
		const data = {};
		data.value = event.target.value;
		data.label = event.target.label;
		const dataToSend = new CustomEvent("inputchanged", {
			detail: data,
		});

		this.dispatchEvent(dataToSend);
	}
}
