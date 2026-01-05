import Svg, { Path } from "react-native-svg";

type Props = {
  active: boolean;
};

export default function TabShape({ active }: Props) {
  return (
    <Svg
      width="100%"
      height={29}
      viewBox="0 0 119 29"
      preserveAspectRatio="none"
    >
      <Path
        d="M9.15385 6.10526L0 29H119C116.385 22.386 110.892 8.24211 109.846 4.57895C108.8 0.915789 105.051 0 103.308 0H15.6923C11.5077 0 9.58974 4.07018 9.15385 6.10526Z"
        fill={active ? "#000" : "#fff"}
      />
    </Svg>
  );
}
