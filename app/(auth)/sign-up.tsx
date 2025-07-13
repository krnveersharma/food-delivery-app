import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { createUser } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSubmit = async () => {
    if (!form.name || !form.email || !form.password)
      return Alert.alert(
        "Error",
        "Please Enter valid email address or password"
      );

    setIsSubmitting(true);

    try {
      await createUser({
        email: form.email,
        password: form.password,
        name: form.name,
      });
      router.push("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your full name"
        value={form.name}
        onChangeText={(text) =>
          setForm((prev) => ({
            ...prev,
            name: text,
          }))
        }
        label="Full name"
      />

      <CustomInput
        placeholder="Enter your Email"
        value={form.email}
        onChangeText={(text) =>
          setForm((prev) => ({
            ...prev,
            email: text,
          }))
        }
        label="Email"
        keyboardType="email-address"
      />

      <CustomInput
        placeholder="Enter your Password"
        value={form.password}
        onChangeText={(password) =>
          setForm((prev) => ({
            ...prev,
            password: password,
          }))
        }
        label="Password"
        secureTextEntry={true}
      />

      <CustomButton
        title="Sign Up"
        isLoading={isSubmitting}
        onPress={onSubmit}
      />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Already have an account?
        </Text>
        <Link href="/sign-in" className="base-bold text-primary">
          Sign In
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
