import {
  useFonts as useExpoFonts,
  Roboto_400Regular as RobotoRegular,
  Roboto_500Medium as RobotoMedium,
  Roboto_700Bold as RobotoBold,
} from '@expo-google-fonts/roboto';

function useFonts() {
  const [fontsAreLoaded, error] = useExpoFonts({
    RobotoRegular,
    RobotoMedium,
    RobotoBold,
  });

  return [fontsAreLoaded, error];
}

export default useFonts;
