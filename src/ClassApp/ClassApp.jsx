import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { ProfileInformation } from "../ProfileInformation";

export class ClassApp extends Component {
  state = {
    user: {
      name: "",
      clan: "",
      abode: "",
      palantir: ["", "", "", ""],
      email: "",
    },
  };

  setUser(name, clan, abode, palantir, email) {
    this.setState({
      user: {
        name: name,
        clan: clan,
        abode: abode,
        palantir: palantir,
        email: email,
      },
    });
  }

  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation {...this.state.user} />
        <ClassForm
          setUser={(name, clan, abode, palantir, email) =>
            this.setUser(name, clan, abode, palantir, email)
          }
        />
      </>
    );
  }
}
