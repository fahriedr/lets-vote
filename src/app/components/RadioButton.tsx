
type Param = {
  label: string;
  value: string;
  isSelected?: boolean;
  onChange: (value: string) => void
}

const RadioButton: React.FC<Param> = ({ label, value, isSelected, onChange }) => (
  <label className="flex cursor-pointer items-center justify-center rounded-md border border-[##7F7F7F] bg-[##7F7F7F] px-3 py-2 text-white hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white">
    <input
      type="radio"
      name="player"
      value={value}
      checked={isSelected}
      onChange={() => onChange(value)}
      className="hidden"
    />
    <span className="text-white">{label}</span>
  </label>

);

export default RadioButton