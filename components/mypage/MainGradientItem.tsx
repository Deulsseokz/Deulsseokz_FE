import { MCOLORS } from "@/constants/colors";
import fontStyles from "@/constants/fonts";
import { useRepresentativeBadge } from "@/store/useBadgeStore";
import { StyleSheet, Text, View } from "react-native";
import Badge from "../common/Badge";
import Profile from "../common/Profile";
import RadialBackground from "./RadialBackground";

export default function MainGradientItem(){
  // 대표 배지
  const repBadge = useRepresentativeBadge();

    return (  
    <View style={styles.shadowWrapper}>
        <RadialBackground style={styles.gradientBackground}/>
        <View style={styles.container}>
            <View style={styles.boxContainer}>
                <Text style={styles.badgeTitle}>징기즈칸</Text>
                <Text style={styles.name}>예림</Text>
            </View>
            <View style={styles.imgContainer}>
               {repBadge && <Badge type={repBadge?.name} active={true} selected={false}/>}
                <Profile/>
            </View>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    shadowWrapper: {
    height: 91,
    display:'flex',
    gap: 30,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 1.7,
    elevation: 2,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
   gradientBackground : {
    ...StyleSheet.absoluteFillObject,
  },
  container : {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 30,
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 29,
  },
    boxContainer: {
        display: 'flex',
        gap: 5,
  },
    badgeTitle: {
      color: MCOLORS.grayscale.gray0,
      ...fontStyles.medium15,
    },
    name: {
      color: MCOLORS.grayscale.gray0,
      fontSize: 20,
      fontWeight: 700, 
    },
    imgContainer : {
    display: 'flex',
    flexDirection: 'row',
  }
})