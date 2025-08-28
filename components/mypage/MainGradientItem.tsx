import { MCOLORS } from "@/constants/colors";
import fontStyles from "@/constants/fonts";
import { useRepresentativeBadge } from "@/store/useBadgeStore";
import { useProfileStore } from "@/store/useProfileStore";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Badge from "../common/Badge";
import Profile from "../common/Profile";
import RadialBackground from "./RadialBackground";

export default function MainGradientItem() {
  // 대표 배지
  const repBadge = useRepresentativeBadge();

  const name = useProfileStore(s => s.data.userName) ?? '';
  const profileImage = useProfileStore(s => s.data.profileImage) ?? require('@/assets/images/default_profile.png');

    return (  
    <View style={styles.shadowWrapper}>
        <RadialBackground style={styles.gradientBackground}/>
        <View style={styles.container}>
            <View style={styles.boxContainer}>
                <Text style={styles.badgeTitle}>{repBadge?.name}</Text>
                <Text style={styles.name}>{name}</Text>
            </View>
            <View style={styles.imgContainer}>
              <View style={styles.badgeContainer}>
                  {repBadge && <Badge type={repBadge?.name} active={true} selected={false}/>}
              </View>
                <Pressable onPress={()=>router.push('/mypage/profile')} style={styles.profilePressable} >
                    <Profile size={IMAGE_SIZE} imageUrl={profileImage} style={styles.imgContainer}/>
                    <Image 
                        source={require('@/assets/images/editable.png')} 
                        style={styles.editable} 
                    />
                </Pressable>
               
            </View>
        </View>
    </View>
    );
}

const IMAGE_SIZE = 55;

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
  badgeContainer : {
    position: 'absolute',
    right: (IMAGE_SIZE/1.3),
    zIndex: 1,
  },
  profilePressable: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  imgContainer : {
    marginLeft: 10,
    position: 'relative',
    right: 0,
  },
  editable: {
    position: "absolute",
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    right: 0,
  },
})