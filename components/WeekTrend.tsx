import { StyleSheet, Text, View } from 'react-native';

export interface DayTotal {
  date: string;
  total: number;
}

function weekdayLabel(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString(undefined, {
    weekday: 'short',
    timeZone: 'UTC',
  });
}

export function WeekTrend({ days }: { days: DayTotal[] }) {
  const max = Math.max(1, ...days.map((d) => d.total));

  return (
    <View style={styles.container}>
      <View style={styles.bars}>
        {days.map((day) => (
          <View key={day.date} style={styles.barColumn}>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.bar,
                  { height: `${Math.max(4, (day.total / max) * 100)}%` },
                ]}
              />
            </View>
            <Text style={styles.dayLabel}>{weekdayLabel(day.date)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  bars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 56,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barTrack: {
    height: 40,
    width: 14,
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: 3,
    backgroundColor: '#A9701E',
  },
  dayLabel: {
    fontSize: 11,
    color: '#8B968F',
    marginTop: 4,
  },
});
