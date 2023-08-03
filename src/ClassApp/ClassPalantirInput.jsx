import { Component, createRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { validatePalantir } from "../utils/validations.js";

export class ClassPalantirInput extends Component {
  state = {
    value: ["", "", "", ""],
    oldValueLength: -1,
    errorMessage: "",
  };
  palantirRef1 = createRef();
  palantirRef2 = createRef();
  palantirRef3 = createRef();
  palantirRef4 = createRef();

  setPalantirCaret(backwards) {
    const value = this.state.value.toString().replace(/,/g, "");
    switch (value.length) {
      case 0:
        this.palantirRef1.current.focus();
        this.palantirRef1.current.selectionStart = 0;
        this.palantirRef1.current.selectionEnd = 0;
        break;
      case 1:
        this.palantirRef1.current.focus();
        this.palantirRef1.current.selectionStart = 1;
        this.palantirRef1.current.selectionEnd = 1;
        break;
      case 2:
        if (value.length >= this.state.oldValueLength && !backwards) {
          this.palantirRef2.current.focus();
          this.palantirRef2.current.selectionStart = 0;
          this.palantirRef2.current.selectionEnd = 0;
        } else {
          this.palantirRef1.current.focus();
          this.palantirRef1.current.selectionStart = 2;
          this.palantirRef1.current.selectionEnd = 2;
        }
        break;
      case 3:
        this.palantirRef2.current.focus();
        this.palantirRef2.current.selectionStart = 1;
        this.palantirRef2.current.selectionEnd = 1;
        break;
      case 4:
        if (value.length >= this.state.oldValueLength && !backwards) {
          this.palantirRef3.current.focus();
          this.palantirRef3.current.selectionStart = 0;
          this.palantirRef3.current.selectionEnd = 0;
        } else {
          this.palantirRef2.current.focus();
          this.palantirRef2.current.selectionStart = 2;
          this.palantirRef2.current.selectionEnd = 2;
        }
        break;
      case 5:
        this.palantirRef3.current.focus();
        this.palantirRef3.current.selectionStart = 1;
        this.palantirRef3.current.selectionEnd = 1;
        break;
      case 6:
        if (value.length >= this.state.oldValueLength && !backwards) {
          this.palantirRef4.current.focus();
          this.palantirRef4.current.selectionStart = 0;
          this.palantirRef4.current.selectionEnd = 0;
        } else {
          this.palantirRef3.current.focus();
          this.palantirRef3.current.selectionStart = 2;
          this.palantirRef3.current.selectionEnd = 2;
        }
        break;
      case 7:
        this.palantirRef4.current.focus();
        this.palantirRef4.current.selectionStart = 1;
        this.palantirRef4.current.selectionEnd = 1;
        break;
      default:
        this.palantirRef1.current.focus();
        this.palantirRef1.current.selectionStart = 0;
        this.palantirRef1.current.selectionEnd = 0;
        break;
    }
  }

  onChangePalantir(maySetFocus, submitted) {
    this.setState({
      oldValueLength: this.state.value.toString().replace(/,/g, "").length,
    });
    let value = this.palantirRef1.current.value.replace(/[^0-9]/g, "");
    value += this.palantirRef2.current.value.replace(/[^0-9]/g, "");
    value += this.palantirRef3.current.value.replace(/[^0-9]/g, "");
    value += this.palantirRef4.current.value.replace(/[^0-9]/g, "");
    this.setState(
      {
        value: [
          value.slice(0, 2),
          value.slice(2, 4),
          value.slice(4, 6),
          value.slice(6, 7),
        ],
      },
      () => (maySetFocus ? this.setPalantirCaret(false) : null)
    );
    this.validatePalantir(
      value.slice(0, 2) +
        value.slice(2, 4) +
        value.slice(4, 6) +
        value.slice(6, 7),
      this.props.required,
      submitted
    );
  }

  validatePalantir(value, required, submitted) {
    const errorMessage = validatePalantir(value, required, submitted);
    this.setState({
      errorMessage: errorMessage,
    });
    if (!errorMessage) {
      this.props.setter(value);
    }
  }

  onKeyUpPalantir(e) {
    if (e.key === "Backspace") {
      this.setPalantirCaret(true);
    }
  }

  render() {
    return (
      <div>
        <div className="input-wrap">
          <label htmlFor={this.props.label}>{this.props.label}:</label>
          <div id="palantir-input-wrap">
            <input
              type="text"
              id="palantir-input-1"
              onChange={() => this.onChangePalantir(true, this.props.submitted)}
              ref={this.palantirRef1}
              value={this.state.value[0]}
            />
            -
            <input
              type="text"
              id="palantir-input-2"
              onChange={() => this.onChangePalantir(true, this.props.submitted)}
              onKeyUp={(e) => this.onKeyUpPalantir(e)}
              ref={this.palantirRef2}
              value={this.state.value[1]}
            />
            -
            <input
              type="text"
              id="palantir-input-3"
              onChange={() => this.onChangePalantir(true, this.props.submitted)}
              onKeyUp={(e) => this.onKeyUpPalantir(e)}
              ref={this.palantirRef3}
              value={this.state.value[2]}
            />
            -
            <input
              type="text"
              id="palantir-input-4"
              onChange={() => this.onChangePalantir(true, this.props.submitted)}
              onKeyUp={(e) => this.onKeyUpPalantir(e)}
              ref={this.palantirRef4}
              value={this.state.value[3]}
            />
          </div>
        </div>
        <ErrorMessage
          message={this.state.errorMessage}
          show={this.state.errorMessage.length > 0}
        />
      </div>
    );
  }
}
