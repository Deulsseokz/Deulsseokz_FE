// src/screens/MyPageMissionScreen.tsx
import { TopBar } from "@/components/common/TopBar"; // 경로 수정
import MyMissionBox from "@/components/mypage/MyMissionBox"; // 경로 수정
import fontStyles from "@/constants/fonts";
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ChallengeCompletionStatus, RegionConquerRateList } from "../mypage/_type";
import ConquestHistoryTabs from "../mypage/ConquestHistoryTabs";
import ConquestListView from "../mypage/ConquestListView";
import ConquestMapView from "../mypage/ConquestMapView";

type ActiveTab = 'list' | 'map';

interface MyPageMissionScreenProps {
    localConquerStatus: RegionConquerRateList;
    challengeCompletionStatus: ChallengeCompletionStatus;
}

export default function MyPageMissionScreen({ localConquerStatus, challengeCompletionStatus }: MyPageMissionScreenProps) {
    const [activeTab, setActiveTab] = useState<ActiveTab>('list');

    return (
    <View style={styles.page}>
        <TopBar title="나의 미션" />
        <View style={styles.contentsContainer}>
            {/* 정복 현황 */}
            <View style={styles.contentWrapper}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>정복 현황</Text>
                </View>
                <View>
                    <MyMissionBox isMainComponent={false} successCount={20} totalCount={214} />
                </View>
            </View>

            {/* 정복 내역 : 탭으로 구분 (리스트뷰 | 맵뷰 )*/}
            <View style={styles.contentWrapper}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>정복 내역</Text>
                    <ConquestHistoryTabs activeTab={activeTab} onTabChange={setActiveTab} />
                </View>
                <View>
                    {activeTab === 'list' ? (
                        <ConquestListView challengeCompletionStatus={challengeCompletionStatus} />
                    ) : (
                        <ConquestMapView localConquerStatus={localConquerStatus} />
                    )}
                </View>
            </View>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#FFF",
    },
   contentsContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40, 
        gap: 30,
    },
    contentWrapper : {
        gap: 10,
    },
    headerContainer : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: '#4a4a4a',
        ...fontStyles.bold15,
    },
});