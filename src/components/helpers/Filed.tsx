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
  onChange ?:any;
  onBlur ?:any;
  value ?:any;
  errors ?:any;
}

// export default function InputField(props: IFieldProps) {

//   console.log(...props)
//   return (
//     <div className="form-group">
//       {label && (
//         <label htmlFor="" className={textColor}>
//           {label || <> &nbsp; </>}
//         </label>
//       )}
//       <div className="input-group">
//         <input
//           onKeyPress={(event) => {
//             if (event.key === 'Enter') {
//               event.preventDefault(); // <===== This stops the form from being submitted
//             } else {
//             }
//           }}
//           {...input}
//           name={name}
//           ref={ref}
//           autoComplete="off"
//           type={type}
//           id={id}
//           onChange={onChange}
//           style={{ textTransform: uppercase ? 'uppercase' : 'none' }}
//           className={`form-control ${required && value === undefined && 'is-invalid '} ${customeCss || ''} `}
//           value={value || ''}
//           readOnly={readOnly}
//           placeholder={placeholder}
//         />
//         {formGroup && (
//           <div className="input-group-append">
//             <div className="input-group-text">
//               <span className={iconFormGroup} />
//             </div>
//           </div>
//         )}
//         {required && value === undefined && <span className="error invalid-feedback">{label} is required.</span>}
//       </div>
//     </div>
//   );
// }

function Input(props : IFieldProps, ref:any) {
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
        style={{ textTransform: props.uppercase ? 'uppercase' : 'none' }}
        className={`form-control ${props.errors && 'is-invalid '} ${props.customeCss || ''} `}
        ref={ref}
      />
       {props.formGroup && (
          <div className="input-group-append">
            <div className="input-group-text">
              <span className={props.iconFormGroup} />
            </div>
          </div>
        )}
        {props.errors && <span className="error invalid-feedback">{props.errors.message || ""}</span>}
    </div>
    </div>
  );
}

const InputField = React.forwardRef(Input);

export default InputField;
