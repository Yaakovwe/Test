import { LightningElement, track } from "lwc";
import getRandomUsers from "@salesforce/apex/UserService.getRandomUsers";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class UserWizard extends LightningElement {
	@track users = [];
	@track user = {};
	currPageUsers = [];
	renderPagination = false;
	hasPageChanged = false;
	modalHeading = "New User";
	modalContentStyle = "height:65%";
	modalGridStyleClass = "slds-medium-size_1-of-2";
	showAddUser = true;
	show = false;

	get isReady() {
		return this.show;
	}
	get usersToRender() {
		return this.currPageUsers;
	}
	async connectedCallback() {
		const results = await getRandomUsers();
		if (results) {
			const users = this.handleResults(results);
			this.users = users;
			this.renderPagination = true;
			this.show = true;
		} else {
			console.log("oops");
		}
	}

	handleResults(results) {
		console.log(results);
		const resultsParsed = JSON.parse(results);
		const rawArr = resultsParsed.results;
		const users = [];
		rawArr.forEach((result) => {
			const user = {};
			user.gender = result.gender;
			user.firstName = result?.name.first;
			user.lastName = result?.name.last;
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
		this.currPageUsers = event.detail.records;
	}

	add(event) {
		this.showAddUser = false;
		const users = this.users;
		const user = event.detail;
		if (!user.hasOwnProperty("firstName")) {
			user.firstName = "";
		}
		if (!user.hasOwnProperty("lastName")) {
			user.lastName = "";
		}
		users.push(event.detail);
		this.users = users;
		this.user = undefined;
		this.showAddUser = true;
	}

	del(event) {
		this.show = false;
		const email = JSON.parse(JSON.stringify(event.detail.data));
		const users = this.users;
		this.users = users.filter((user) => user.email != email);
		this.showToastMsg("Success", "User Successfully Deleted", "success");
		this.show = true;
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
}
