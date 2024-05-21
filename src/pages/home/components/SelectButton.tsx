import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface SelectButtonProps {
	placeholder: string;
	options: string[];
	setSelectedOption: (value: string | undefined) => void;
}

function SelectButton({
	placeholder,
	options,
	setSelectedOption,
}: SelectButtonProps) {
	return (
		<div>
			<Select
				onValueChange={(value) => {
					if (value === "none") {
						setSelectedOption(undefined);
					} else {
						setSelectedOption(value);
					}
				}}
			>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{/* map over options */}
					<SelectItem value={"none"}>{placeholder}</SelectItem>
					{options.map((option, index) => (
						<SelectItem key={index} value={option}>
							{option}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}

export default SelectButton;
