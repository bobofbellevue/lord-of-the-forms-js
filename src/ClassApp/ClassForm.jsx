import { Component, createRef } from "react";
import { ClassTextInput } from "./ClassTextInput";
import { ClassPalantirInput } from "./ClassPalantirInput";
import {
  validateName,
  validateAbode,
  validateEmail,
  validatePalantir,
} from "../utils/validations.js";

export class ClassForm extends Component {
  state = {
    name: "",
    clan: "",
    abode: "",
    palantir: ["", "", "", ""],
    email: "",
    submitted: false,
  };
  nameRef = createRef();
  clanRef = createRef();
  abodeRef = createRef();
  palantirRef = createRef();
  emailRef = createRef();

  onSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const errorMessage = this.validateForm();
    if (!errorMessage) {
      this.props.setUser(
        this.state.name,
        this.state.clan,
        this.state.abode,
        this.state.palantir,
        this.state.email
      );
    }
  }

  validateForm() {
    let errorMessage = "";
    this.nameRef.current.onChangeText(this.nameRef.current.state.value, true);
    this.clanRef.current.onChangeText(this.clanRef.current.state.value, true);
    this.abodeRef.current.onChangeText(this.abodeRef.current.state.value, true);
    this.palantirRef.current.onChangePalantir(false, true);
    this.emailRef.current.onChangeText(this.emailRef.current.state.value, true);
    errorMessage += validateName(this.state.name, true, true);
    errorMessage += validateName(this.state.clan, false, true);
    errorMessage += validateAbode(this.state.abode, true, true);
    errorMessage += validatePalantir(
      this.state.palantir[0] +
        this.state.palantir[1] +
        this.state.palantir[2] +
        this.state.palantir[3],
      true,
      true
    );
    errorMessage += validateEmail(this.state.email, true, true);
    return errorMessage;
  }

  setName(name) {
    this.setState({ name: name });
  }

  setClan(clan) {
    this.setState({ clan: clan });
  }

  setAbode(abode) {
    this.setState({ abode: abode });
  }

  setPalantir(palantir) {
    this.setState({
      palantir: [
        palantir.slice(0, 2),
        palantir.slice(2, 4),
        palantir.slice(4, 6),
        palantir.slice(6, 7),
      ],
    });
  }

  setEmail(email) {
    this.setState({ email: email });
  }

  render() {
    return (
      <form>
        <u>
          <h3>User Information Form</h3>
        </u>
        <ClassTextInput
          label="Name *"
          value={this.state.name}
          ref={this.nameRef}
          required={true}
          submitted={this.state.submitted}
          validator={validateName}
          setter={(name) => this.setName(name)}
        />
        <ClassTextInput
          label="Clan"
          value={this.state.clan}
          ref={this.clanRef}
          required={false}
          submitted={this.state.submitted}
          validator={validateName}
          setter={(clan) => this.setClan(clan)}
        />
        <ClassTextInput
          label="Abode *"
          value={this.state.abode}
          ref={this.abodeRef}
          required={true}
          submitted={this.state.submitted}
          validator={validateAbode}
          setter={(abode) => this.setAbode(abode)}
          list="abodes"
        />
        <ClassPalantirInput
          label="Palantir *"
          ref={this.palantirRef}
          value={this.state.palantir}
          required={true}
          submitted={this.state.submitted}
          setter={(palantir) => this.setPalantir(palantir)}
        />
        <ClassTextInput
          label="Email *"
          value={this.state.email}
          ref={this.emailRef}
          required={true}
          submitted={this.state.submitted}
          validator={validateEmail}
          setter={(email) => this.setEmail(email)}
        />
        <input type="submit" value="Submit" onClick={(e) => this.onSubmit(e)} />
      </form>
    );
  }
}
