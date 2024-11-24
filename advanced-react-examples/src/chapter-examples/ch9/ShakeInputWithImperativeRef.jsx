import React, { useImperativeHandle, useRef, useState } from 'react';
import './ShakeFormInput.css';

const InputField = React.forwardRef((props, ref) => {
  const actualInputRef = useRef(null);
  const [error, setError] = useState(false);

  useImperativeHandle(ref, () => {
    actualInputRef.current.shake = () => {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, [500]);
    };
    return actualInputRef.current;
  });

  return <input className={error ? 'error' : ''} ref={actualInputRef} />;
});
InputField.displayName = 'InputField';

function Form() {
  const inputRef = useRef(null);

  const handleSubmit = () => {
    if (!inputRef.current.value) {
      inputRef.current.shake();
    }
  };

  return (
    <form className="shakeform">
      <div>
        <InputField ref={inputRef} />
      </div>
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default function ShakeInputWithImperativeRef() {
  return <Form></Form>;
}

ShakeInputWithImperativeRef.title = 'Shake Input With Imperative Ref';
