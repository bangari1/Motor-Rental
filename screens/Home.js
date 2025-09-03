// Home.js
import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LottieView from 'lottie-react-native';
import Rental_process from './Rental_process.js';
import { useNavigation } from '@react-navigation/native';
import Vehicle_card from './Vehicle_card.js';   

export default function Home() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/logo.png")} 
          style={styles.logo_image}
        />
        {/* <TouchableOpacity>
          <Ionicons name="person-circle" size={36} color="#000" />
        </TouchableOpacity> */}

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Ionicons name="person-circle" size={36} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
         <View style={styles.text}>
                <Text style={styles.text_content}>RENT . RIDE . REPEAT</Text>
            </View>
        <View style={styles.home_animation} >
            <LottieView style={{flex:1}}source={require('../assets/car_animation.json')} autoPlay loop />
        </View>
        <Text style={styles.avail_text}>Top Rentals Of The Month</Text>
        <View style={styles.avail}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                <Vehicle_card/>
                <Vehicle_card/>
                <Vehicle_card/>
            </ScrollView>
        </View> 
        <Rental_process/>
        <View style={styles.refer}>
            <Text style={styles.refer_text}>Refer and Earn</Text>
        </View>
            <View style={styles.refer_main}>
                {/* <View style={{width:150,height:150}}> */}
                <Image source={require('../assets/refer.jpg')} style={styles.refer_image}/>
                {/* </View> */}
                <View style={{flex:1,backgroundColor:"#f2f2ecff"}}> 
                    <Text style={styles.refer_main_text}>Get Rs.50 For Each Friend's Login !</Text>
                <Text style={styles.refer_main_text1}>Get Another Rs.50 At Their First Rental Trip !!</Text>
                <TouchableOpacity style={styles.refer_button}>
                        <Text style={styles.refer_buttonText}>Invite Code</Text>
                </TouchableOpacity> 
                </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    elevation: 3, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  logo_image: {
    width: 140,
    height: 160,
    resizeMode: "contain",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  home_animation:{
    height:250,
  },
   text: {
        width: "90%",
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 4,        
        borderBottomColor: "#fdc200",
        marginBottom: 10,
    },
    text_content: {
        fontSize: 30,
        
    },
    avail:{
        backgroundColor:"orange",
        height:280,
        fontSize:20,
    },
    avail_text:{
        fontSize:19,
        marginBottom:15,
        marginTop:7,
        fontWeight:"bold",
        marginLeft:15,
    },
    image1:{
        width:200,
        height:140,
    },
    refer:{
        height: 35,
        backgroundColor: "orange",
        elevation: 3, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        justifyContent:'center',
        marginBottom:15,
    },
    refer_text:{
        fontSize:18,
        fontWeight:"bold",
        marginLeft:15,
    },
    refer_main:{
        height:550,
        backgroundColor: "#fff",
        elevation: 3, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    refer_main_text:{
        color:"black",
        fontSize:17,
        marginLeft:10,
        marginBottom:7,
    },
    refer_main_text1:{
        color:"black",
        fontSize:17,
        marginLeft:10,
        marginBottom:7,
    },
    refer_image:{
        width:"100%",
        height:"80%",
        // resizeMode:"contain"
    },
    refer_button:{
        backgroundColor: "red",
        borderRadius: 10,
        alignItems: "center",
        width:100,
        height:40,
        justifyContent:'center',
        marginLeft:10,
        
  }, 
  refer_buttonText:{
    color:"white",
    fontSize:16,
    fontWeight:"bold"
  }
});


