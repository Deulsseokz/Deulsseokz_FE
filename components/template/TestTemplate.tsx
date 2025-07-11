import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopBar } from '../common/TopBar';
import { Box } from '../test/Box';

interface TestTemplateProps {
  onAction: () => void;
  featureData: { label: string; description: string }[];
  btnTxt: string;
}

export default function TestTemplate({ onAction, featureData, btnTxt }: TestTemplateProps) {
  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="Test Screen" />
      <View style={styles.content}>
        <View style={styles.boxContainer}>
          {featureData.map((item, idx) => (
            <Box key={idx} label={item.label} description={item.description} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  boxContainer: {
    // flex: 1,
  },
});
