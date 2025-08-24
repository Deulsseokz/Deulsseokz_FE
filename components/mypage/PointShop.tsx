import { PURCHASE_OPTIONS } from "@/types/point"
import { FlatList, StyleSheet, View } from "react-native"
import PointShopItem from "./PointShopItem"

export default function PointShop(){
    

    return (
    <View style={styles.container}>
            <FlatList
                data={[...PURCHASE_OPTIONS]}
                keyExtractor={(item)=>String(item.points)}
                renderItem={({item})=> (
                    <PointShopItem point={item.points} price={item.priceKRW}/>
                )}>
            </FlatList>
    </View>)
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    }
})