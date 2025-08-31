import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
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
  runOnJS,
} from 'react-native-reanimated';

// You can replace these with your preferred icons or use react-native-vector-icons
const UserIcon = () => <FontAwesome name="user" size={20} color="#000000ff" />;
const MailIcon = () => <FontAwesome name="envelope" size={20} color="#000000ff" />;
const LockIcon = () => <FontAwesome name="lock" size={20} color="#000000ff" />;
const EyeIcon = () => <FontAwesome name="eye" size={20} color="#000000ff" />;
const EyeOffIcon = () => <FontAwesome name="eye-slash" size={20} color="#000000ff" />;
const SendIcon = () => <FontAwesome name="paper-plane" size={20} color="#000000ff" />;
const CarIcon = () => <FontAwesome name="motorcycle" size={40} color="#f98f16ff" />;
const CheckIcon = () => <FontAwesome name="square-check" size={20} color="#4af44aff" />;
const AlertIcon = () => <FontAwesome name="circle-exclamation" size={40} color="#f91616ff" />;
const OtpIcon = () => <FontAwesome name="key" size={20} color="#5493ffff" />;

// Custom Hook for form validation
const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.otpSent && !formData.otp.trim()) {
      newErrors.otp = 'OTP is required';
    } else if (formData.otpSent && formData.otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validateForm, validateEmail };
};

// Animated Input Component
const AnimatedInput = ({ 
  icon, 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry, 
  keyboardType, 
  error,
  rightIcon,
  onRightIconPress,
  maxLength 
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
          keyboardType={keyboardType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={maxLength}
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
            {loading ? 'Please wait...' : title}
          </Text>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Main Registration Component
export default function SignUp({ navigation, onSignUpSuccess, onNavigateToSignIn }) {
  // Form state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    otp: '',
    password: '',
    otpSent: false,
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Animations
  const otpFieldAnimation = useSharedValue(0);
  const successAnimation = useSharedValue(0);

  // Validation hook
  const { errors, validateForm, validateEmail } = useFormValidation();

  // Update form data
  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  // Handle OTP send
  const handleSendOTP = async () => {
    if (!validateEmail(formData.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    setOtpLoading(true);
    
    try {
      // Replace this with your actual API call
      // const response = await sendOTPAPI(formData.email);
      
      // Simulate API call
      setTimeout(() => {
        setFormData(prev => ({ ...prev, otpSent: true }));
        setSuccessMessage('OTP sent successfully!');
        successAnimation.value = withSpring(1);
        otpFieldAnimation.value = withSpring(1);
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          successAnimation.value = withSpring(0);
          runOnJS(setSuccessMessage)('');
        }, 3000);
        
        setOtpLoading(false);
      }, 2000);
    } catch (error) {
      setOtpLoading(false);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    }
  };

  // Handle registration
  const handleRegister = async () => {
    if (!validateForm(formData)) {
      return;
    }

    setLoading(true);

    try {
      // Replace this with your actual API call
      // const response = await registerAPI(formData);
      
      // Simulate API call
      setTimeout(() => {
        Alert.alert(
          'Registration Successful!',
          'Welcome to VehicleRent! Your account has been created successfully.',
          [{ 
            text: 'Continue', 
            onPress: () => {
              setLoading(false);
              onSignUpSuccess && onSignUpSuccess(formData);
            }
          }]
        );
      }, 2000);
    } catch (error) {
      setLoading(false);
      Alert.alert('Registration Failed', 'Please try again.');
    }
  };

  // Handle navigate to sign in
  const handleNavigateToSignIn = () => {
    if (onNavigateToSignIn) {
      onNavigateToSignIn();
    } else if (navigation) {
      navigation.navigate('SignIn');
    }
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      formData.username.trim().length >= 3 &&
      validateEmail(formData.email) &&
      formData.password.trim().length >= 8 &&
      (!formData.otpSent || formData.otp.trim().length === 6)
    );
  };

  // Animated styles
  const animatedOtpStyle = useAnimatedStyle(() => ({
    opacity: otpFieldAnimation.value,
    transform: [
      { translateY: (1 - otpFieldAnimation.value) * -20 },
      { scale: 0.8 + (otpFieldAnimation.value * 0.2) }
    ],
  }));

  const animatedSuccessStyle = useAnimatedStyle(() => ({
    opacity: successAnimation.value,
    transform: [{ translateY: (1 - successAnimation.value) * -10 }],
  }));

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Background Gradient */}
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#000' }]} />


      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <CarIcon />
          </View>
          <Text style={styles.title}>RentalRidez</Text>
          <Text style={styles.subtitle}>Create your account to get started</Text>
        </View>

        {/* Success Message */}
        {successMessage ? (
          <Animated.View style={[styles.successContainer, animatedSuccessStyle]}>
            <BlurView intensity={20} style={styles.successBlur}>
              <CheckIcon />
              <Text style={styles.successText}>{successMessage}</Text>
            </BlurView>
          </Animated.View>
        ) : null}

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

            {/* Email Input with Send OTP Button */}
            <View style={styles.emailContainer}>
              <View style={styles.emailInputContainer}>
                <AnimatedInput
                  icon={<MailIcon />}
                  placeholder="Email Address"
                  value={formData.email}
                  onChangeText={(value) => updateFormData('email', value)}
                  keyboardType="email-address"
                  error={errors.email}
                />
              </View>
              <TouchableOpacity
                style={[
                  styles.otpButton,
                  { opacity: validateEmail(formData.email) ? 1 : 0.5 }
                ]}
                onPress={handleSendOTP}
                disabled={!validateEmail(formData.email) || otpLoading}
              >
                <LinearGradient
                  colors={['#f97316', '#ea580c']}
                  style={styles.otpButtonGradient}
                >
                  <SendIcon />
                  <Text style={styles.otpButtonText}>
                    {otpLoading ? 'Sending...' : 'Send OTP'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* OTP Input (appears after sending OTP) */}
            {formData.otpSent && (
              <Animated.View style={animatedOtpStyle}>
                <AnimatedInput
                  icon={<OtpIcon />}
                  placeholder="Enter 6-digit OTP"
                  value={formData.otp}
                  onChangeText={(value) => updateFormData('otp', value.replace(/[^0-9]/g, ''))}
                  keyboardType="numeric"
                  maxLength={6}
                  error={errors.otp}
                />
              </Animated.View>
            )}

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

            {/* Password Requirements */}
            <View style={styles.requirementsContainer}>
              <Text style={styles.requirementsTitle}>Password must contain:</Text>
              <Text style={styles.requirementText}>• At least 8 characters</Text>
              <Text style={styles.requirementText}>• Mix of letters and numbers recommended</Text>
            </View>

            {/* Register Button */}
            <AnimatedButton
              title="Create Account"
              onPress={handleRegister}
              disabled={!isFormValid()}
              loading={loading}
              style={styles.registerButton}
            />
          </BlurView>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <TouchableOpacity onPress={handleNavigateToSignIn}>
              <Text style={styles.loginLink}>Sign In</Text>
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
    paddingTop: 60,
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
  successContainer: {
    marginBottom: 20,
  },
  successBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  successText: {
    color: '#22c55e',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
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
    // shadowColor: '#000',
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
  backgroundColor: 'transparent',
  outlineStyle: 'none',   // ✅ removes browser outline (web only)
  outlineWidth: 0,        // ✅ ensures no visible border
  borderWidth: 0,         // ✅ avoids browser-injected border
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
  emailContainer: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  emailInputContainer: {
    marginBottom: 12,
  },
  otpButton: {
    alignSelf: 'flex-end',
  },
  otpButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  otpButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  requirementsContainer: {
    backgroundColor: 'rgba(49, 45, 42, 0.49)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  requirementsTitle: {
    color: '#f97316',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  requirementText: {
    color: '#f97316',
    fontSize: 12,
    marginBottom: 2,
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
  registerButton: {
    marginTop: 8,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  footerText: {
    color: '#94a3b8',
    fontSize: 14,
  },
  loginLink: {
    color: '#f97316',
    fontWeight: '600',
  },
});