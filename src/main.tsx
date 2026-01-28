import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { Model, Param, ParamEditor, ParamEditorRef } from './components/ParamEditor';
import './styles.css';

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

const App = () => {
  const ref = useRef<ParamEditorRef>(null);

  return <>
    <ParamEditor ref={ref} params={params} model={model}/>

    <button
      onClick={() => {
        console.log(ref.current?.getModel());
      }}
    >
      Console Log model
    </button>
  </>;
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App/>);
