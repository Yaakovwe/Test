import { LightningElement, api } from "lwc";

export default class User extends LightningElement {
  @api user;
  googleMapUrl = "http://www.google.com/maps/place/";
  sectionName;
  modalHeading = "New User";
  modalContentStyle = "height:65%";
  modalGridStyleClass = "slds-medium-size_1-of-2";

  columns = [
    {
      index: 1,
      inputs: [
        { Id: 1, label: "First Name", isText: true },
        { Id: 2, label: "Last Name", isText: true },
        { Id: 3, label: "Gender", isText: true }
      ]
    },
    {
      index: 2,
      inputs: [
        { Id: 4, label: "Age", isNumeric: true },
        { Id: 5, label: "Phone", isText: true },
        { Id: 6, label: "Address", isText: true }
      ]
    }
  ];

  connectedCallback() {
    this.sectionName = this.user.firstName + " " + this.user.lastName;
    this.googleMapUrl += this.user.address;
  }

  handleEdit() {
    this.modalHeading = "Edit User";
    this.template.querySelector("c-modal").openModal();
  }

  closeConformationModal() {
    this.template.querySelector("c-modal").closeModal();
  }

  handleInputChanged(event) {
    console.log(JSON.stringify(this.user));
    const data = event.detail;
  }
}
