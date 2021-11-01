import React, { useEffect } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerGestureEvent, PanGestureHandler, PanGestureHandlerGestureEvent, TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { Easing, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { DRAWER_DIMENSIONS } from './constants';

type Props = {
    open: boolean,
    onClose: () => void,
    children?: React.ReactChild
 }
const dimensions = Dimensions.get('window')
const styles= StyleSheet.create({
    container: {
        height: dimensions.height,
        position: 'absolute',
        width: dimensions.width,
    },
    gestureAreaContainer: {
        width: '100%',
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',      
    },
    gestureControlLine: {
        width: 80,
        height: 4,
        borderRadius: 4,
        backgroundColor: 'white',
        elevation: 6,
        shadowOffset:{
            height: 100,
            width: 100
        },
        shadowColor: 'black',
        shadowOpacity: 1
    },
    drawerContainer: {
        bottom: 0,
        position:'absolute',
        left:0,
        width: dimensions.width,
        marginBottom: 1
    },
    drawerSheet:{
        backgroundColor:'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: DRAWER_DIMENSIONS.HEIGHT,
        shadowColor: 'black',
        shadowOpacity: 1,
        overflow:'hidden',
        paddingBottom: 100
    }

})

type ContextType ={
    translateY: number
}

const Index = (props: Props) => {

    const {open, onClose, children} = props

    const translateY = useSharedValue(0);

    const opacity = useSharedValue(0);

    const handleClose =  () => {
        setTimeout(onClose, 500)
    }

    const onBlur = () => {
        'worklet'
        translateY.value =  withTiming(DRAWER_DIMENSIONS.HIDDEN, {
            duration: 1000,
            easing: Easing.out(Easing.exp),
        });
        opacity.value = 0
        runOnJS(handleClose)()
    }

    useEffect(() => {
        if(open){
            translateY.value = withTiming(0, {
                duration: 500,
                easing: Easing.out(Easing.exp),
              })
              opacity.value = 0.5
        }
    },[open])

    const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
        onActive: (event) =>{
            if(event.translationY>0){
                translateY.value = event.translationY
                opacity.value = 0.5*(1-event.translationY/DRAWER_DIMENSIONS.HEIGHT)
            }
        },
        onEnd:(event) =>{
            if(event.translationY > DRAWER_DIMENSIONS.HEIGHT/2 || event.velocityY > DRAWER_DIMENSIONS.THERSHOLD_VELOCITY){
                onBlur()
            }
            else{
                translateY.value = withTiming(0, {
                    duration: 500,
                    easing: Easing.out(Easing.exp),
                  })
                  opacity.value = 0.5
            }
        },
    })

    const tapGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent, ContextType>({
        onEnd:(event) =>{
                onBlur()
            }
            
    })
    const animatedStyles = useAnimatedStyle(() =>{
        return {
            transform: [{translateY: translateY.value}]
        }
    })

    const backgroundOpacityStyle =  useAnimatedStyle(() => {
        return {
            backgroundColor: `rgba(0, 0, 0,${opacity.value})`
        }
    })
    if(!open){
        return null
    }

    return (
        <Animated.View style={[styles.container, backgroundOpacityStyle]}>
            <TapGestureHandler onGestureEvent ={tapGestureEvent}>
            <Animated.View style={{flex: 1}}/>
            </TapGestureHandler>
            <Animated.View style={[styles.drawerContainer, animatedStyles]}>
            <PanGestureHandler onGestureEvent={panGestureEvent} >
                <Animated.View style={[styles.gestureAreaContainer]}>
                    <View style={styles.gestureControlLine}/>
                </Animated.View>
            </PanGestureHandler>
            <View style={styles.drawerSheet}>
                <SafeAreaView>
                {children}
                </SafeAreaView>
            </View>
            </Animated.View>
        </Animated.View>
    )
}

export default Index;