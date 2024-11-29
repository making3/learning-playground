import { useMemo, useRef, useState } from 'react';

function debounce(cb, ms) {
  let timeout = null;
  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(cb, ms);
  };
}

export default function SendRequestRefWithValue() {
  const valueRef = useRef('');
  const [value, setValue] = useState('');

  const sendRequest = useMemo(
    () =>
      debounce(() => {
        console.log('sending request!!', valueRef.current);
      }, 800),
    []
  );

  const handleChange = (e) => {
    setValue(e.target.value);
    sendRequest(value);
    valueRef.current = value;
  };

  return <input onChange={handleChange} value={value} />;
}

SendRequestRefWithValue.title = 'Send Request (ref with value)';
