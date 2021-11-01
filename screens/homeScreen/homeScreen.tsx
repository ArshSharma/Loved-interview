import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import BottomDrawer from './../../components/bottomDrawer/index'
import MenuCard from './../../components/menuCard'
import { MENU_ITEMS } from './constants';

const Homescreen = () => {
    const [isOpenBottemDrawer, setIsOpenBottomDrawer] = useState(false);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Loved Demo App</Text>
            <TouchableOpacity style={styles.button} onPress={() => setIsOpenBottomDrawer(true)}>
                <Text style={styles.buttonText}>OPEN SHEET</Text>
            </TouchableOpacity>
            <BottomDrawer
            open={isOpenBottemDrawer}
            onClose={()=> setIsOpenBottomDrawer(false)}>
                <FlatList
                data={MENU_ITEMS}
                keyExtractor={(item)=> item.title}
                renderItem={(item) =>{ 
                    return (
                        <MenuCard data={item.item}/>
                    )
                }}
                />
                
                </BottomDrawer>         
        </View>
    )
}

export default Homescreen;