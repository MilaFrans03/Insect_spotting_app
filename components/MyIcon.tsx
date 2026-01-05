import Svg, { Path } from "react-native-svg";

export default function MyIcon() {
  return (
    <Svg width={120} height={120} viewBox="0 0 24 24">
      <Path
        d="M12 2L2 22h20L12 2z"
        fill="black"
      />
    </Svg>
  );
}