import React, { useState } from "react";
import { View, Text } from "react-native";
import { useForm, Controller } from 'react-hook-form'
import CustomButton from "@components/Common/CustomButton/CustomButton";

const Home = () => {
    console.log("Home")

    return (
        <View style={{ backgroundColor: "yellow", height: "100%" }}>
            <CustomButton title={"hfhfh"} />

        </View>
    )

}


export default Home;