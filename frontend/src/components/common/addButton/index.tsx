import { Plus } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

export function AddButton() {
  return (
    <TouchableOpacity className="p-4 rounded-full bg-violet-400">
      <Plus color={"#FFFFFF"} size={22} strokeWidth={2} />
    </TouchableOpacity>
  );
}
