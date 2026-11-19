import { Icon } from "@omn1/icons/native";
import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

/** Rotating loader glyph (Figma: LoaderSpinner). `className` colours it via NativeWind. */
export function Spinner({ size = 20, className }: { size?: number; className?: string }) {
  const turn = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(turn, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [turn]);
  const rotate = turn.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
  return (
    <Animated.View style={{ transform: [{ rotate }] }} accessibilityLabel="Loading">
      <Icon name="loader" size={size} className={className} />
    </Animated.View>
  );
}
