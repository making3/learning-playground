import React, { useEffect, useRef, useState } from 'react';
import './ShakeFormInput.css';

const InputField = React.forwardRef((props, ref) => {
  const actualInputRef = useRef();
  const [error, setError] = useState(false);
  useEffect(() => {
    actualInputRef.current.shake = () => {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, [500]);
    };

    ref.current = actualInputRef.current;
  }, [ref]);

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

export default function ExtendRefWithEffect() {
  return <Form></Form>;
}

ExtendRefWithEffect.title = 'Extend Ref With Effect';
