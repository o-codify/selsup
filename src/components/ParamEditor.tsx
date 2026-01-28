import React, { forwardRef, useImperativeHandle, useState } from 'react';

export interface Param {
  id: number;
  name: string;
  type: 'string';
}

export interface ParamValue {
  paramId: number;
  value: string;
}

export interface Model {
  paramValues: ParamValue[];
  colors?: unknown[];
}

export interface Props {
  params: Param[];
  model: Model;
}

interface FieldProps {
  value: string;
  onChange: (value: string) => void;
}

export interface ParamEditorRef {
  getModel: () => Model;
}

const StringField: React.FC<FieldProps> = ({value, onChange}) => (
  <input
    data-testid="string-input"
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

const fieldFactory: Record<
  Param['type'],
  React.FC<FieldProps>
> = {
  string: StringField
};

export const ParamEditor = forwardRef<ParamEditorRef, Props>(
  ({params, model}, ref) => {
    const initialValues = new Map<number, string>(
      model.paramValues.map((p) => [p.paramId, p.value])
    );

    const [values, setValues] = useState(initialValues);

    const setValue = (paramId: number, value: string) => {
      setValues((prev) => new Map(prev).set(paramId, value));
    };

    useImperativeHandle(ref, () => ({
      getModel(): Model {
        return {
          ...model,
          paramValues: params.map((p) => ({
            paramId: p.id,
            value:   values.get(p.id) ?? ''
          }))
        };
      }
    }));

    return (
      <div className="params">
        {params.map((param) => {
          const Field = fieldFactory[param.type];

          return (
            <div className="param" key={param.id}>
              <div>{param.name}</div>
              <Field
                value={values.get(param.id) ?? ''}
                onChange={(value) => setValue(param.id, value)}
              />
            </div>
          );
        })}
      </div>
    );
  }
);
