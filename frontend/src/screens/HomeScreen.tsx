import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import colors from '../theme/colors';
import IngredientChip from '../components/IngredientChip';
import CuisineTile from '../components/CuisineTile';
import { ENDPOINTS } from '../config/api';
import { getToken } from '../services/authService';

interface Cuisine {
  id: string;
  label: string;
  emoji: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [inputText, setInputText] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      console.log('Fetching initial data from:', ENDPOINTS.CUISINES);
      const [cuisineRes, suggestRes] = await Promise.all([
        fetch(ENDPOINTS.CUISINES),
        fetch(ENDPOINTS.SUGGESTED_INGREDIENTS)
      ]);

      const cuisineData = await cuisineRes.json().catch(async (e) => {
        const text = await cuisineRes.text();
        console.error('Cuisine JSON Parse Error. Response text:', text);
        throw e;
      });
      const suggestData = await suggestRes.json().catch(async (e) => {
        const text = await suggestRes.text();
        console.error('Suggestion JSON Parse Error. Response text:', text);
        throw e;
      });

      if (cuisineData.success) {
        setCuisines(cuisineData.data);
      } else {
        console.warn('Cuisine fetch failed:', cuisineData.message);
      }

      if (suggestData.success) {
        setSuggestions(suggestData.data);
      }
    } catch (err) {
      console.error('Failed to fetch initial data', err);
      Alert.alert(
        'Connection Error',
        'Could not fetch cuisines or suggestions. Please check if your server is running and your IP is correct.',
        [{ text: 'Retry', onPress: fetchInitialData }]
      );
    } finally {
      setInitialLoading(false);
    }
  };

  const addIngredient = (item?: string): void => {
    const trimmed = (item ?? inputText).trim().toLowerCase();
    if (!trimmed) return;
    if (ingredients.includes(trimmed)) {
      Alert.alert('Already added', `"${trimmed}" is already in your list.`);
      return;
    }
    setIngredients((prev) => [...prev, trimmed]);
    setInputText('');
  };

  const removeIngredient = (item: string): void => {
    setIngredients((prev) => prev.filter((i) => i !== item));
  };

  const visibleSuggestions: string[] = suggestions
    .filter((s) => !ingredients.includes(s))
    .slice(0, 10);

  const canGenerate: boolean = ingredients.length > 0 && selectedCuisine !== null;

  const handleGenerate = async (): Promise<void> => {
    if (!canGenerate) return;

    setLoading(true);
    try {
      const token = await getToken();
      const response = await fetch(ENDPOINTS.GENERATE_RECIPE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ingredients,
          cuisine: selectedCuisine,
        }),
      });

      const data = await response.json();

      if (data.success) {
        navigation.navigate('Result', { recipe: data.data });
      } else {
        Alert.alert('Generation Failed', data.message || 'Could not generate recipe. Please try again.');
      }
    } catch (err) {
      Alert.alert('Error', 'Cannot connect to server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.headerEmoji}>🌿</Text>
            <Text style={styles.headerTitle}>RecipeLeaf</Text>
          </View>
          <Text style={styles.headerSubtitle}>
            Tell us what you have — we'll create something amazing
          </Text>
        </View>

        {/* ── Ingredient Input Card ── */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🥕 Your Ingredients</Text>

          {/* Input Row */}
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Type ingredient, press Add..."
              placeholderTextColor={colors.textMuted}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={() => addIngredient()}
              returnKeyType="done"
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addIngredient()}
              activeOpacity={0.75}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          {/* Added Chips */}
          {ingredients.length > 0 && (
            <View style={styles.chipsContainer}>
              {ingredients.map((item) => (
                <IngredientChip
                  key={item}
                  label={item}
                  onRemove={() => removeIngredient(item)}
                />
              ))}
            </View>
          )}

          {/* Suggestions */}
          {visibleSuggestions.length > 0 && (
            <View>
              <Text style={styles.suggestLabel}>Quick add:</Text>
              <View style={styles.suggestionsRow}>
                {visibleSuggestions.map((s) => (
                  <TouchableOpacity
                    key={s}
                    style={styles.suggestionPill}
                    onPress={() => addIngredient(s)}
                    activeOpacity={0.75}
                  >
                    <Text style={styles.suggestionText}>+ {s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* ── Cuisine Card ── */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🌍 Choose Cuisine</Text>
          <FlatList<Cuisine>
            data={cuisines}
            keyExtractor={(item) => item.id}
            numColumns={4}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <CuisineTile
                item={item}
                isSelected={selectedCuisine === item.id}
                onPress={() =>
                  setSelectedCuisine((prev) =>
                    prev === item.id ? null : item.id
                  )
                }
              />
            )}
          />
        </View>

        {/* ── Generate Button ── */}
        <TouchableOpacity
          style={[styles.generateButton, (!canGenerate || loading) && styles.generateButtonDisabled]}
          onPress={handleGenerate}
          activeOpacity={0.75}
          disabled={!canGenerate || loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.generateButtonText}>Generate Recipe ✨</Text>
          )}
        </TouchableOpacity>

        {!canGenerate && !loading && (
          <Text style={styles.hintText}>
            {ingredients.length === 0
              ? 'Add at least one ingredient to continue'
              : 'Select a cuisine to continue'}
          </Text>
        )}

        <View style={styles.bottomPad} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 32,
  },

  /* Header */
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  headerEmoji: {
    fontSize: 28,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.white,
    letterSpacing: 0.8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.accent,
    marginTop: 2,
    lineHeight: 20,
  },

  /* Card */
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderColor: colors.border,
    borderWidth: 1,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 14,
  },

  /* Input */
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.textDark,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 11,
  },
  addButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },

  /* Chips */
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },

  /* Suggestions */
  suggestLabel: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  suggestionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  suggestionPill: {
    borderColor: colors.accent,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  suggestionText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },

  /* Generate */
  generateButton: {
    backgroundColor: colors.primary,
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  generateButtonDisabled: {
    backgroundColor: colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  generateButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.4,
  },
  hintText: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 10,
  },
  bottomPad: {
    height: 16,
  },
});

export default HomeScreen;
