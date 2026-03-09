import {
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState, type ComponentProps } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const BLUE = "#2952CC";
const BLUE_DARK = "#1a3aab";
const BLUE_LIGHT = "#EEF2FF";
const PURPLE = "#A855F7";
const ORANGE = "#FFA500";
const YELLOWGREEN = "#9ACD32";
const GREEN = "#22C55E";

type IoniconsName = ComponentProps<typeof Ionicons>["name"];

const contact: { icon: IoniconsName; color:string; name: string; desc: string; contact: string }[] = [
    {
        icon: "call-sharp",
        name: "Phone",
        desc: "call us anytime",
        contact: "(123) 456-7890",
        color: BLUE
    },
    {
        icon: "mail",
        name: "Email",
        desc: "Send us a message",
        contact: "info@community.com",
        color: PURPLE
    },
    {
        icon: "location-sharp",
        name: "Address",
        desc: "Visit our main branch",
        contact: "123 Main Street",
        color: YELLOWGREEN
    },
    {
        icon: "time-outline",
        name: "Hours",
        desc: "We're open",
        contact: "Mon-Fri 9AM-5PM",
        color: ORANGE
    }
];

export default function ContactUs(){
    const [fullname, setFullname] =useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold,
      });
    
      if (!fontsLoaded) return null;
    return (
        <>
            <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
                <LinearGradient
                    colors={["#1A56DB", "#2563C7", "#3B82F6"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.hero}
                >
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>Get in Touch</Text>
                    </View>
                    <Text style={styles.heroTitle}>Contact Us</Text>
                    <Text style={styles.heroDesc}>
                        Have questions? We're here to help. 
                        Reach out to us through any of our channels.
                    </Text>
                </LinearGradient>
                <View style={styles.section}>
                    <View style={styles.contactGrid}>
                        {contact.map((item, index)=>(
                            <View key={index} style={styles.valueCard}>
                                <View style={styles.valueIconBox}>
                                    <Ionicons name={item.icon} size={28} color={item.color} />
                                </View>
                                <Text style={styles.valueTitle}>{item.name}</Text>
                                <Text style={styles.valueDesc}>{item.desc}</Text>
                                <Text style={styles.valueContact}>{item.contact}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.cardsWrapper}>
                    <View style={styles.card}>
                        <View style={styles.cardTopRow}>
                            <Text style={styles.cardTitle}>Send us a Message</Text>
                        </View>
                        <Text style={styles.cardDesc}>Fill out the form below and we'll get back to you within 24 hours.</Text>
                        <View style={styles.fieldGroup}>
                            <Text style={styles.label}>Full Name</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="person-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your full name"
                                    placeholderTextColor="#9CA3AF"
                                    value={fullname}
                                    onChangeText={setFullname}
                                />
                            </View>
                        </View>
                        <View style={styles.fieldGroup}>
                            <Text style={styles.label}>Email</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="mail" size={18} color="#9CA3AF" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your email"
                                    placeholderTextColor="#9CA3AF"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>
                        </View>
                        <View style={styles.fieldGroup}>
                            <Text style={styles.label}>Subject</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="pricetag" size={18} color="#9CA3AF" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your subject"
                                    placeholderTextColor="#9CA3AF"
                                    value={subject}
                                    onChangeText={setSubject}
                                />
                            </View>
                        </View>
                        <View style={styles.fieldGroup}>
                            <Text style={styles.label}>Message</Text>
                            <TextInput
                                style={styles.textArea}
                                placeholder="Tell us more about your inquiry"
                                placeholderTextColor="#9CA3AF"
                                multiline={true}
                                numberOfLines={4}
                                value={subject}
                                onChangeText={setSubject}
                            />
                        </View>
                        <View style={styles.fieldGroup}>
                            <TouchableOpacity style={styles.button} onPress={() => alert("Submitted")}>
                                <Ionicons name="checkmark" size={20} color="#fff" />
                                <Text style={styles.buttonText}>Send Message</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                        

            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#F5F6FA",
    },
    hero: {
        padding: 28,
        paddingBottom: 36,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
    },
    tag: {
        alignSelf: "center",
        backgroundColor: "rgba(255,255,255,0.18)",
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 6,
        marginBottom: 16,
    },
    tagText: {
        color: "#FFFFFF",
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        letterSpacing: 0.3,
    },
    heroTitle: {
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: 30,
        fontFamily: "Poppins_700Bold",
        lineHeight: 38,
        marginBottom: 14,
        letterSpacing: -0.3,
    },
    heroDesc: {
        textAlign: "center",
        color: "rgba(255,255,255,0.82)",
        fontSize: 16,
        fontFamily: "Poppins_400Regular",
        lineHeight: 22,
    },
    section: {
        padding: 20,
        paddingBottom: 32,
        alignItems: "center",
    },
    contactGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 14,
        justifyContent: "center",
        width: "100%",
    },
    valueCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 18,
        width: "47%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
        position: "relative",
    },
    valueIconBox: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: BLUE_LIGHT,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
        marginTop: 8,
    },
    valueTitle: {
        fontSize: 16,
        fontFamily: "Poppins_700Bold",
        color: "#111827",
        marginBottom: 6,
        textAlign: "center",
    },
    valueDesc: {
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        color: "#6B7280",
        lineHeight: 19,
        textAlign: "center",
    },
    valueContact:{
        fontSize: 14,
        fontFamily: "Poppins_700Bold",
        color: "#111827",
        marginBottom: 6,
        textAlign: "center",
    },
    cardsWrapper: {
        paddingHorizontal: 20,
        paddingTop: 24,
        gap: 16,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    cardTopRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        gap: 15,
    },
    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 14,
        backgroundColor: BLUE_LIGHT,
        alignItems: "center",
        justifyContent: "center",
    },
    cardTitle: {
        color: "#111827",
        fontSize: 20,
        fontFamily: "Poppins_700Bold",
        marginBottom: 6,
    },
    cardDesc: {
        color: "#6B7280",
        fontSize: 16,
        fontFamily: "Poppins_500Medium",
        lineHeight: 20,
        marginBottom: 16,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
    },
    fieldGroup: {
        marginHorizontal: 15,
        marginBottom: 16,
    },
    label: {
        fontSize: 13,
        fontFamily: "Poppins_600SemiBold",
        color: "#374151",
        marginBottom: 6,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 46,
        backgroundColor: "#fff",
    },
    inputIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 14,
        fontFamily: "Poppins_500Medium",
        color: "#111827",
        paddingVertical: 0,
    },
    textArea: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        height: 100, // controls the visible size
        textAlignVertical: "top", // important for Android
    },
    button: {
        backgroundColor: BLUE,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        flexDirection: "row",   // puts icon and text in one line
        alignItems: "center",
        justifyContent: "center",
        gap: 8,                 // space between icon and text
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});