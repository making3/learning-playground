export default function ViewChapter({ chapter, children, exampleName }) {
  return (
    <div>
      <h2>Chapter {chapter}</h2>
      <h3>Example: {exampleName}</h3>
      <div>{children}</div>
    </div>
  );
}
