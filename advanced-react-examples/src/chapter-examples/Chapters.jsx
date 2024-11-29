import { useState } from 'react';
import ExtendRefWithEffect from './ch9/ExtendRefWithEffect';
import ViewChapter from './ViewChapter';
import ShakeInputWithImperativeRef from './ch9/ShakeInputWithImperativeRef';
import ExtendRefWithEffectAndNoState from './ch9/ExtendRefWithEffectAndNoState';
import SendRequestRefWithValue from './ch11/SendRequestRefWithValue';

const chapters = [
  {
    number: 9,
    examples: [
      ExtendRefWithEffect,
      ExtendRefWithEffectAndNoState,
      ShakeInputWithImperativeRef,
    ],
  },
  {
    number: 11,
    examples: [SendRequestRefWithValue],
  },
].reduce((acc, chapter) => {
  chapter.examples.forEach((ExComp) => {
    if (!ExComp.title) {
      throw new Error('must have <ComponentExport>.title property ');
    }
    acc.push({
      chapter: chapter.number,
      Component: ExComp,
      exampleName: ExComp.title,
    });
  });

  return acc;
}, []);

export default function Chapters() {
  const [selectedExample, setSelectedExample] = useState(null);

  const handleSelect = (e) => {
    const foundExample = chapters.find(
      ({ exampleName }) => exampleName === e.target.value
    );
    if (foundExample) {
      setSelectedExample(foundExample);
    } else {
      setSelectedExample(null);
    }
  };

  return (
    <div>
      <label>Select an Example</label>
      <select
        onChange={handleSelect}
        value={selectedExample ? selectedExample.exampleName : ''}
      >
        <option value=""></option>
        {chapters.map(({ chapter, exampleName }) => (
          <option key={exampleName} value={exampleName}>
            CH{chapter}: {exampleName}
          </option>
        ))}
      </select>
      <hr />
      {selectedExample ? (
        <ViewChapter
          chapter={selectedExample.chapter}
          exampleName={selectedExample.exampleName}
        >
          <selectedExample.Component />
        </ViewChapter>
      ) : (
        'Choose a component'
      )}
    </div>
  );
}
