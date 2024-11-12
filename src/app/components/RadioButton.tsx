
type Param = {
    label: string;
    value: string;
    selected: string;
    onChange: (value: string) => void
}

const RadioButton: React.FC<Param> = ({ label, value, selected, onChange }) => (
    <label className="flex items-center mr-6 cursor-pointer">
      <input
        type="radio"
        name="player"
        value={value}
        checked={selected === value}
        onChange={() => onChange(value)}
        className="hidden"
      />
      <div
        className={`w-5 h-5 rounded-full border-2 mr-2 ${
          selected === value ? "border-blue-500" : "border-gray-500"
        } flex items-center justify-center`}
      >
        {selected === value && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
      </div>
      <span className="text-gray-300">{label}</span>
    </label>
  );

export default RadioButton