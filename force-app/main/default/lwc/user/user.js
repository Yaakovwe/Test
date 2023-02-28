import { LightningElement, api, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class User extends LightningElement {
	@api user = {};
	@api showAddUser = false;
	googleMapUrl = "http://www.google.com/maps/place/";
	sectionName;
	modalHeading = "New User";
	modalContentStyle = "height:65%";
	modalGridStyleClass = "slds-medium-size_1-of-2";
	temp = {};
	isNew = false;
	cols = [
		{
			index: 1,
			inputs: [
				{
					Id: 1,
					label: "First Name",
					isText: true,
					key: "firstName",
					isRequired: true,
				},
				{
					Id: 2,
					label: "Last Name",
					isText: true,
					key: "lastName",
					isRequired: true,
				},
				{ Id: 3, label: "Gender", isText: true, key: "gender" },
			],
		},
		{
			index: 2,
			inputs: [
				{ Id: 4, label: "Age", isNumeric: true, key: "age" },
				{ Id: 5, label: "Phone", isText: true, key: "phone" },
				{ Id: 6, label: "Address", isText: true, key: "address" },
			],
		},
	];

	columns = [
		{
			index: 1,
			inputs: [
				{ Id: 1, label: "First Name", isText: true, key: "firstName" },
				{ Id: 2, label: "Last Name", isText: true, key: "lastName" },
				{ Id: 3, label: "Gender", isText: true, key: "gender" },
			],
		},
		{
			index: 2,
			inputs: [
				{ Id: 4, label: "Age", isNumeric: true, key: "age" },
				{ Id: 5, label: "Phone", isText: true, key: "phone" },
				{ Id: 6, label: "Address", isText: true, key: "address" },
			],
		},
	];

	connectedCallback() {
		if (this.user && !this.isNew) {
			this.sectionName = this.user.firstName + " " + this.user.lastName;
			this.googleMapUrl += this.user.address;
			this.addValuesFromParent();
		} else {
			this.isNew = true;
		}
	}

	addValuesFromParent() {
		this.columns.forEach((col) => {
			col.inputs.forEach((input) => {
				const value = this.user[input.key];
				input.value = value;
			});
		});
	}

	handleEdit() {
		this.modalHeading = "Edit User";
		this.template.querySelector("c-modal").openModal();
	}

	handleOpen() {
		this.columns = [];
		this.columns = this.cols;
		this.user = {};
		this.template.querySelector("c-modal").openModal();
	}

	closeConformationModal() {
		this.template.querySelector("c-modal").closeModal();
	}

	handleModalConfirmation() {
		this.handleSaveData();
		this.showToastMsg(
			"Success",
			"User data Successfully Updated",
			"success"
		);
		if (this.showAddUser) {
			const data = this.user;
			const dataToSend = new CustomEvent("handleadd", {
				detail: data,
			});

			this.dispatchEvent(dataToSend);
		}
		this.closeConformationModal();
	}

	handleSaveData() {
		this.columns.forEach((col) => {
			col.inputs.forEach((input) => {
				if (this.temp.hasOwnProperty(input.label)) {
					const label = input.label;
					input.value = this.temp[label];
					const user = { ...this.user };
					user[input.key] = this.temp[label];
					this.user = user;
					delete this.temp[label];
				}
			});
		});
	}

	handleInputChanged(event) {
		const data = event.detail;
		this.temp[data.label] = data.value;
	}

	showToastMsg(title, message, variant) {
		this.dispatchEvent(
			new ShowToastEvent({
				title: title,
				message: message,
				variant: variant,
			})
		);
	}

	handleDelete() {
		console.log(JSON.stringify(this.user));
		const obj = { data: this.user.email };
		const dataToParent = new CustomEvent("handledelete", {
			detail: obj,
		});
		this.dispatchEvent(dataToParent);
	}
}
