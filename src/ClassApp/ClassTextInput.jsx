import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";

export class ClassTextInput extends Component {
  state = {
    value: this.props.value,
    errorMessage: "",
  };

  validateText(value, required, submitted) {
    const errorMessage = this.props.validator(value, required, submitted);
    this.setState({ errorMessage: errorMessage });
    if (!errorMessage) {
      this.props.setter(value);
    }
  }

  onChangeText(value, submitted) {
    this.setState({ value: value });
    this.validateText(value, this.props.required, submitted);
  }

  render() {
    return (
      <div>
        <div className="input-wrap">
          <label>{this.props.label}:</label>
          <input
            type="text"
            placeholder={this.props.placeholder}
            onChange={(e) =>
              this.onChangeText(e.target.value, this.props.submitted)
            }
            value={this.state.value}
            list={this.props.list}
          />
        </div>
        <ErrorMessage
          message={this.state.errorMessage}
          show={this.state.errorMessage.length > 0}
        />
      </div>
    );
  }
}
