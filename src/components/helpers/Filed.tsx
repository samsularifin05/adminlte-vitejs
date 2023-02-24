import React from "react";

interface IFieldProps {
  name: string;
  type: string;
  label?: string;
  required?: boolean;
  formGroup?: boolean;
  readOnly?: boolean;
  textColor?: string;
  iconFormGroup?: string;
  tabIndex?: string;
  ref?: any;
  id?: string;
  uppercase?: string;
  placeholder?: string;
  customeCss?: string;
  input?: any;
  onChange?: any;
  onBlur?: any;
  value?: any;
  errors?: any;
  btnAction?: any;
}

function Input(props: IFieldProps, ref: any) {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <div className="input-group">
        <input
          name={props.name}
          type={props.type}
          onChange={props.onChange}
          onBlur={props.onBlur}
          readOnly={props.readOnly}
          placeholder={props.placeholder}
          style={{ textTransform: props.uppercase ? "uppercase" : "none" }}
          className={`form-control ${props.errors && "is-invalid "} ${
            props.customeCss || ""
          } `}
          ref={ref}
        />
        {props.formGroup && (
          <div className="input-group-append">
            <span
              style={{cursor : "pointer"}}
              onClick={props.btnAction} className="input-group-text"
            >
              <span className={props.iconFormGroup} />
            </span>
          </div>
        )}

        {props.errors && (
          <span className="error invalid-feedback">
            {props.errors.message || ""}
          </span>
        )}
      </div>
    </div>
  );
}

const InputField = React.forwardRef(Input);

export default InputField;
