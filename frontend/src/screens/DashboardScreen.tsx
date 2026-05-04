import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../theme/colors';
import { getUser, getToken } from '../services/authService';
import { ENDPOINTS } from '../config/api';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const DashboardScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      await Promise.all([loadUserData(), fetchDashboard()]);
      setLoading(false);
    };
    init();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await getUser();
      setUser(userData);
    } catch (err) {
      console.error('Error loading user data:', err);
    }
  };

  const fetchDashboard = async () => {
    try {
      const token = await getToken();
      const response = await fetch(ENDPOINTS.GET_DASHBOARD, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setDashboardData(data.data);
      }
    } catch (err) {
      console.error('Error fetching dashboard:', err);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hi, {user?.name || 'Sourav'}! 👋</Text>
        </View>

        {/* 📜 Quote of the Day */}
        {dashboardData?.quote && (
          <View style={styles.quoteCard}>
            <MaterialIcons name="format-quote" size={32} color={colors.secondary} />
            <Text style={styles.quoteText}>"{dashboardData.quote.text}"</Text>
            <Text style={styles.quoteAuthor}>— {dashboardData.quote.author}</Text>
          </View>
        )}

        {/* 🔥 Trending Dish */}
        {dashboardData?.trending && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trending Dish 🔥</Text>
            <TouchableOpacity 
                style={styles.trendingCard}
                onPress={() => navigation.navigate('Generate', { cuisine: dashboardData.trending.cuisine })}
            >
              <View style={styles.trendingHeader}>
                <Text style={styles.trendingName}>{dashboardData.trending.name}</Text>
                <Text style={styles.trendingCuisine}>{dashboardData.trending.cuisine}</Text>
              </View>
              <Text style={styles.trendingDesc}>{dashboardData.trending.description}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* 🍽️ Meal Suggestions */}
        {dashboardData?.suggestions && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Meal Suggestions</Text>
            <View style={styles.suggestionGrid}>
              <View style={styles.suggestionItem}>
                <View style={[styles.suggestionIcon, { backgroundColor: '#FFF9C4' }]}>
                  <MaterialIcons name="wb-sunny" size={24} color="#FBC02D" />
                </View>
                <View style={styles.suggestionContent}>
                    <Text style={styles.suggestionLabel}>Breakfast</Text>
                    <Text style={styles.suggestionValue}>{dashboardData.suggestions.breakfast}</Text>
                </View>
              </View>

              <View style={styles.suggestionItem}>
                <View style={[styles.suggestionIcon, { backgroundColor: '#E3F2FD' }]}>
                  <MaterialIcons name="restaurant" size={24} color="#1976D2" />
                </View>
                <View style={styles.suggestionContent}>
                    <Text style={styles.suggestionLabel}>Lunch</Text>
                    <Text style={styles.suggestionValue}>{dashboardData.suggestions.lunch}</Text>
                </View>
              </View>

              <View style={styles.suggestionItem}>
                <View style={[styles.suggestionIcon, { backgroundColor: '#F3E5F5' }]}>
                  <MaterialIcons name="nights-stay" size={24} color="#7B1FA2" />
                </View>
                <View style={styles.suggestionContent}>
                    <Text style={styles.suggestionLabel}>Dinner</Text>
                    <Text style={styles.suggestionValue}>{dashboardData.suggestions.dinner}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 24,
    paddingBottom: 100, // Extra space for tab bar
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  quoteCard: {
    backgroundColor: '#F1F8E9',
    padding: 20,
    borderRadius: 20,
    marginBottom: 32,
    borderLeftWidth: 5,
    borderLeftColor: colors.secondary,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: colors.textDark,
    marginVertical: 8,
    lineHeight: 24,
  },
  quoteAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'right',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 16,
  },
  trendingCard: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  trendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  trendingName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  trendingCuisine: {
    fontSize: 12,
    color: colors.textMuted,
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    textTransform: 'uppercase',
  },
  trendingDesc: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },
  suggestionGrid: {
    flexDirection: 'column',
    gap: 16,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  suggestionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.textMuted,
    marginBottom: 2,
  },
  suggestionValue: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textDark,
  },
});

export default DashboardScreen;
