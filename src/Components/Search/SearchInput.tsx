interface Props {
  placeholder: string;
  func: (item: string) => void;
}

const SearchInput = ({ placeholder, func }: Props) => {
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        onInput={(e) => {
          func(e.currentTarget.value);
        }}
      />
    </>
  );
};

export default SearchInput;
