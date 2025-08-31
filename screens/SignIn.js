import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

// You can replace these with your preferred icons or use react-native-vector-icons
const UserIcon = () => <Text style={{ fontSize: 20, color: '#64748b' }}>👤</Text>;
const LockIcon = ({ color }) => <Text style={{ fontSize: 20, color }}>🔒</Text>;
const EyeIcon = () => <Text style={{ fontSize: 20, color: '#64748b' }}>👁️</Text>;
const EyeOffIcon = () => <Text style={{ fontSize: 20, color: '#64748b' }}>🙈</Text>;
const CarIcon = () => <Text style={{ fontSize: 40, color: '#f97316' }}>🚗</Text>;
const AlertIcon = () => <Text style={{ fontSize: 14, color: '#ef4444' }}>⚠️</Text>;

// Custom Hook for form validation
const useSignInValidation = () => {
  const [errors, setErrors] = useState({});

  const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validateForm };
};

// Animated Input Component
const AnimatedInput = ({ 
  icon, 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry, 
  error,
  rightIcon,
  onRightIconPress,
}) => {
  const focusAnimation = useSharedValue(0);
  const errorAnimation = useSharedValue(0);

  useEffect(() => {
    errorAnimation.value = withSpring(error ? 1 : 0);
  }, [error]);

  const handleFocus = () => {
    focusAnimation.value = withTiming(1, { duration: 200 });
  };

  const handleBlur = () => {
    focusAnimation.value = withTiming(0, { duration: 200 });
  };

  const animatedContainerStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      focusAnimation.value,
      [0, 1],
      [error ? '#ef4444' : '#e2e8f0', error ? '#ef4444' : '#2563eb']
    ),
    shadowOpacity: focusAnimation.value * 0.1,
  }));

  const animatedErrorStyle = useAnimatedStyle(() => ({
    opacity: errorAnimation.value,
    transform: [{ translateY: errorAnimation.value * -5 }],
  }));

  return (
    <View style={styles.inputContainer}>
      <Animated.View style={[styles.inputWrapper, animatedContainerStyle]}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {rightIcon && (
          <TouchableOpacity 
            style={styles.rightIconContainer}
            onPress={onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </Animated.View>
      {error && (
        <Animated.View style={[styles.errorContainer, animatedErrorStyle]}>
          <AlertIcon />
          <Text style={styles.errorText}>{error}</Text>
        </Animated.View>
      )}
    </View>
  );
};

// Animated Button Component
const AnimatedButton = ({ title, onPress, disabled, loading, style }) => {
  const buttonScale = useSharedValue(1);
  const buttonOpacity = useSharedValue(1);

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1);
  };

  useEffect(() => {
    buttonOpacity.value = withTiming(disabled ? 0.6 : 1);
  }, [disabled]);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
    opacity: buttonOpacity.value,
  }));

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      <Animated.View style={[animatedButtonStyle]}>
        <LinearGradient
          colors={disabled ? ['#94a3b8', '#64748b'] : ['#2563eb', '#1d4ed8']}
          style={[styles.button, style]}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Signing in...' : title}
          </Text>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Main Sign In Component
export default function SignIn({ navigation, onSignInSuccess, onNavigateToSignUp }) {
  // Form state
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validation hook
  const { errors, validateForm } = useSignInValidation();

  // Update form data
  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  // Handle sign in
  const handleSignIn = async () => {
    if (!validateForm(formData)) {
      return;
    }

    setLoading(true);

    try {
      // Replace this with your actual API call
      // const response = await signInAPI(formData.username, formData.password);
      
      // Simulate API call
      setTimeout(() => {
        Alert.alert(
          'Sign In Successful!',
          'Welcome back to VehicleRent! You have been signed in successfully.',
          [{ 
            text: 'Continue', 
            onPress: () => {
              setLoading(false);
              onSignInSuccess && onSignInSuccess(formData);
            }
          }]
        );
      }, 2000);
    } catch (error) {
      setLoading(false);
      Alert.alert('Sign In Failed', 'Please check your credentials and try again.');
    }
  };

  // Handle forgot password
  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'Password reset functionality would be implemented here.',
      [{ text: 'OK' }]
    );
  };

  // Handle navigate to sign up
  const handleNavigateToSignUp = () => {
    if (onNavigateToSignUp) {
      onNavigateToSignUp();
    } else if (navigation) {
      navigation.navigate('SignUp');
    }
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      formData.username.trim().length >= 3 &&
      formData.password.trim().length >= 8
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Background Gradient */}
      <LinearGradient
        colors={['#1e293b', '#334155', '#475569']}
        style={StyleSheet.absoluteFillObject}
      />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <CarIcon />
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your VehicleRent account</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          <BlurView intensity={20} style={styles.formBlur}>
            {/* Username Input */}
            <AnimatedInput
              icon={<UserIcon />}
              placeholder="Username"
              value={formData.username}
              onChangeText={(value) => updateFormData('username', value)}
              error={errors.username}
            />

            {/* Password Input */}
            <AnimatedInput
              icon={<LockIcon color={errors.password ? '#ef4444' : '#64748b'} />}
              placeholder="Password"
              value={formData.password}
              onChangeText={(value) => updateFormData('password', value)}
              secureTextEntry={!showPassword}
              rightIcon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
              onRightIconPress={() => setShowPassword(!showPassword)}
              error={errors.password}
            />

            {/* Forgot Password Link */}
            <TouchableOpacity 
              style={styles.forgotPasswordContainer}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <AnimatedButton
              title="Sign In"
              onPress={handleSignIn}
              disabled={!isFormValid()}
              loading={loading}
              style={styles.signInButton}
            />

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Sign In Options */}
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <View style={styles.socialIconContainer}>
                  <Text style={styles.socialIcon}>G</Text>
                </View>
                <Text style={styles.socialButtonText}>Continue with Google</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <TouchableOpacity onPress={handleNavigateToSignUp}>
              <Text style={styles.registerLink}>Create Account</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40,
  },
  logoContainer: {
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 30,
  },
  formBlur: {
    padding: 24,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    padding: 16,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    paddingVertical: 16,
  },
  rightIconContainer: {
    padding: 16,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 4,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginLeft: 4,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#f97316',
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInButton: {
    marginBottom: 24,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dividerText: {
    color: '#94a3b8',
    fontSize: 14,
    marginHorizontal: 16,
  },
  socialContainer: {
    gap: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  socialIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4285f4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  socialIcon: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  socialButtonText: {
    color: '#1e293b',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  footerText: {
    color: '#94a3b8',
    fontSize: 14,
  },
  registerLink: {
    color: '#f97316',
    fontWeight: '600',
  },
});