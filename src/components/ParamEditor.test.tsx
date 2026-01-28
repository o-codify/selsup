import { fireEvent, render, screen } from '@testing-library/react';
import React, { createRef } from 'react';
import { Model, Param, ParamEditor, ParamEditorRef } from './ParamEditor';
import { describe, expect, test } from 'vitest';

const params: Param[] = [
  {id: 1, name: 'Назначение', type: 'string'},
  {id: 2, name: 'Длина', type: 'string'}
];

const model: Model = {
  paramValues: [
    {paramId: 1, value: 'повседневное'},
    {paramId: 2, value: 'макси'}
  ]
};

describe('ParamEditor', () => {
  test('renders fields based on params', () => {
    render(<ParamEditor params={params} model={model}/>);
    expect(screen.getByText('Назначение')).toBeInTheDocument();
    expect(screen.getByText('Длина')).toBeInTheDocument();
  });

  test('initializes values from model', () => {
    render(<ParamEditor params={params} model={model}/>);
    const inputs = screen.getAllByTestId('string-input');
    expect(inputs[0]).toHaveValue('повседневное');
    expect(inputs[1]).toHaveValue('макси');
  });

  test('getModel returns updated values', () => {
    const ref = createRef<ParamEditorRef>();

    render(<ParamEditor ref={ref} params={params} model={model}/>);

    const inputs = screen.getAllByTestId('string-input');
    fireEvent.change(inputs[0], {target: {value: 'офисное'}});

    const result = ref.current!.getModel();

    expect(result.paramValues).toEqual([
      {paramId: 1, value: 'офисное'},
      {paramId: 2, value: 'макси'}
    ]);
  });
});
