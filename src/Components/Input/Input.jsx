export const Input = ({ onChange, value }) => {
  return (
    <div>
      <input
        type='text'
        value={value}
        placeholder='Your Name'
        onChange={onChange}
      />
    </div>
  );
};
