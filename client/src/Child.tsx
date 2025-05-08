interface ChildProps {
  onClick: () => void;
}

const Child = ({ onClick }: ChildProps) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click me</button>;
};

export default Child;
