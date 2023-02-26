import { LightningElement, track } from "lwc";
import getRandomUsers from "@salesforce/apex/UserService.getRandomUsers";

export default class UserWizard extends LightningElement {
  @track users = [];
  currPageUsers = [];
  renderPagination = false;
  hasPageChanged = false;
  modalHeading = "New User";
  modalContentStyle = "height:65%";
  modalGridStyleClass = "slds-medium-size_1-of-2";
  inputs = [
    { Id: 1, label: "First Name", type: "text" },
    { Id: 2, label: "Last Name", type: "text" },
    { Id: 3, label: "Gender", type: "text" },
    { Id: 4, label: "Age", type: "number" },
    { Id: 5, label: "Phone", type: "text" },
    { Id: 6, label: "Address", type: "text" }
  ];
  get usersToRender() {
    return this.currPageUsers;
  }
  async connectedCallback() {
    const results = await getRandomUsers();
    if (results) {
      const users = this.handleResults(results);
      this.users = users;
      this.renderPagination = true;
    } else {
      console.log("oops");
    }
  }

  handleResults(results) {
    const resultsParsed = JSON.parse(results);
    const rawArr = resultsParsed.results;
    const users = [];
    rawArr.forEach((result) => {
      const user = {};
      user.gender = result.gender;
      user.firstName = result.name.first;
      user.lastName = result.name.last;
      user.email = result.email;
      user.id = result.location.value;
      user.address = this.getAddress(result.location);
      user.picture = result.picture.large;
      user.phone = result.phone;
      user.age = result.dob.age;
      users.push(user);
    });
    return users;
  }

  getAddress(location) {
    let address = "";
    address += location.street.number;
    address += " " + location.street.name;
    address += " " + location.city;
    address += " " + location.state;
    address += " " + location.country;
    address += " " + location.postcode;
    return address;
  }

  handlePagination(event) {
    this.hasPageChanged = !this.hasPageChanged;
    this.currPageLocations = event.detail.records;
  }

  handleAddUser() {
    this.template.querySelector("c-modal").openModal();
  }

  closeConformationModal() {
    this.template.querySelector("c-modal").closeModal();
  }
}
