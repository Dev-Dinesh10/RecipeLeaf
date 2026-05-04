import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import colors from '../theme/colors';
import MetaBadge from '../components/MetaBadge';
import ChefTipBox from '../components/ChefTipBox';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

const ResultScreen: React.FC<Props> = ({ navigation, route }) => {
  const { recipe } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── Hero Image ── */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: recipe.imageUrl }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          {/* Gradient overlay for readability */}
          <View style={styles.imageOverlay} />

          {/* Floating Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.75}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        </View>

        {/* ── Content ── */}
        <View style={styles.content}>

          {/* Cuisine Badge */}
          <View style={styles.cuisineBadgeRow}>
            <View style={styles.cuisineBadge}>
              <Text style={styles.cuisineBadgeText}>
                {recipe.cuisine.charAt(0).toUpperCase() + recipe.cuisine.slice(1)} Cuisine
              </Text>
            </View>
          </View>

          {/* Title and Saved Status */}
          <View style={styles.titleRow}>
            <Text style={styles.recipeName}>{recipe.name}</Text>
            <View style={styles.savedBadge}>
              <Text style={styles.savedBadgeText}>✓ Saved</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.description}>{recipe.description}</Text>

          {/* ── Meta Badges ── */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.metaScroll}
            contentContainerStyle={styles.metaScrollContent}
          >
            <MetaBadge icon="⏱" label="Prep" value={recipe.prepTime} />
            <MetaBadge icon="🍳" label="Cook" value={recipe.cookTime} />
            <MetaBadge icon="👥" label="Serves" value={recipe.servings} />
            <MetaBadge icon="📊" label="Difficulty" value={recipe.difficulty} />
          </ScrollView>

          {/* Divider */}
          <View style={styles.divider} />

          {/* ── Ingredients ── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {recipe.ingredients.map((ing: string, idx: number) => (
              <View key={idx} style={styles.ingredientRow}>
                <View style={styles.bullet} />
                <Text style={styles.ingredientText}>{ing}</Text>
              </View>
            ))}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* ── Steps ── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Steps</Text>
            {recipe.steps.map((step: string, idx: number) => (
              <View key={idx} style={styles.stepRow}>
                <View style={styles.stepNumberCircle}>
                  <Text style={styles.stepNumber}>{idx + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>

          {/* Divider */}
          <View style={styles.divider} />
        </View>

        {/* ── Chef Tip ── */}
        <ChefTipBox tip={recipe.tip} />

        {/* ── Try Another Button ── */}
        <TouchableOpacity
          style={styles.tryAnotherButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.75}
        >
          <Text style={styles.tryAnotherText}>← Try Another Recipe</Text>
        </TouchableOpacity>

        <View style={styles.bottomPad} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.background,
  },

  /* Hero Image */
  imageWrapper: {
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: 260,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: 'rgba(26, 92, 46, 0.18)',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: colors.white,
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 5,
  },
  backArrow: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: 'bold',
    lineHeight: 24,
  },

  /* Content */
  content: {
    paddingHorizontal: 16,
  },
  cuisineBadgeRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },
  cuisineBadge: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  cuisineBadgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  savedBadge: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  savedBadgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  recipeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textDark,
    lineHeight: 32,
    flex: 1,
    marginRight: 10,
  },
  description: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 22,
    marginBottom: 16,
  },

  /* Meta */
  metaScroll: {
    marginBottom: 4,
  },
  metaScrollContent: {
    paddingBottom: 12,
  },

  /* Divider */
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 20,
  },

  /* Sections */
  section: {
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 14,
  },

  /* Ingredients */
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.primary,
    marginTop: 6,
    marginRight: 12,
    flexShrink: 0,
  },
  ingredientText: {
    fontSize: 14,
    color: colors.textDark,
    flex: 1,
    lineHeight: 22,
  },

  /* Steps */
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    borderColor: colors.border,
    borderWidth: 1,
  },
  stepNumberCircle: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    flexShrink: 0,
    marginTop: 1,
  },
  stepNumber: {
    color: colors.white,
    fontSize: 13,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 14,
    color: colors.textDark,
    flex: 1,
    lineHeight: 22,
  },

  /* Try Another */
  tryAnotherButton: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: 14,
    alignItems: 'center',
  },
  tryAnotherText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomPad: {
    height: 32,
  },
});

export default ResultScreen;
