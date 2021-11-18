/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import Counter from 'react-native-counters';
import Swiper from 'react-native-swiper';
import Slider, { Range } from 'rc-slider';
import { SliderPicker } from 'react-native-slider-picker';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import ReactDOM from 'react-dom';
// import Stepper from 'react-js-stepper'

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import Toast from 'react-native-simple-toast';
import { SimpleStepper } from 'react-native-simple-stepper';
// import { Stepper,Step } from 'react-form-stepper';
import StepIndicator from 'react-native-step-indicator';

const labels = ['Not At All','Moderate','Too Strong'];
const steps = [{title: 'Stage - 1'}, {title: 'Stage - 2'}, {title: 'Stage - 3'},]


const  customStyles = {
  stepIndicatorSize: 18,
  currentStepIndicatorSize:18,
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: '#0072BB',
  stepStrokeWidth: 0,
  stepStrokeFinishedColor: '#B6C0CB',
  stepStrokeUnFinishedColor: '#B6C0CB',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#0072BB',
  stepIndicatorUnFinishedColor: '#B6C0CB',
  stepIndicatorCurrentColor: '#0072BB',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#0072BB',
  stepIndicatorLabelFinishedColor: '#0072BB',
  stepIndicatorLabelUnFinishedColor: '#FFFFFF',
  labelColor: '#202020',
  labelSize: responsiveFontSize(1.45),
  currentStepLabelColor: '#202020',
  labelFontFamily: 'SF-Medium',
  labelAlign: 'center',
};
const PAGES = ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'];


export default class Sample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 5,
      diary_date: '',
      notes: '',
      craving_count: 1,
      currentPosition: 0,
      activeStep: 1,

    };
  }
  handleOnClickStepper = (step) => {
    this.setState({activeStep: step});
}

handleOnClickNext = () => {
    let nextStep = this.state.activeStep + 1;
    this.setState({activeStep: nextStep})
}

handleOnClickBack = () => {
    let prevStep = this.state.activeStep - 1;
    this.setState({activeStep:prevStep})
}
  componentDidMount = () => {

    this.setState({diary_date:new Date()})
  };
  onChange(number, type) {
    console.log(number, type);
    this.setState({craving_count: number}); // 1, + or -
  }
  onStepPress (currentPosition,number)  {
    this.setState({currentPosition: number});
    // setCurrentPage(position);
  };
  
  // valueChanged(value) {
  //   // Truncate value to 2 decimal places and cast as Number.
  //   const nextValue = Number(value.toFixed(2));
  //   this.setState({ value: nextValue });
  //   // ...
  // }
  onPageChange(position) {
    this.setState({currentPosition: position});
    console.log(position);
  }
 
  routes = [
    {
      'Shipping': () => this.doSomething('Shipping'),
      'nextAction': () => this.doSomething('hello world!'),
      'previousAction': () => this.doSomething('back to previous view #1')
    },
    {
      'Payment': () => this.doSomething('Payment'),
      'nextAction': () => this.doSomething('hello world #2!'),
      'previousAction': () => this.doSomething('back to previous view #2')
    },
    {
      'Confirm': () => this.doSomething('Confirm'),
      'nextAction': () => this.doSomething('hello world #3!'),
      'previousAction': () => this.doSomething('back to previous view #3')
    }
  ];
  customStyle = {/*Here your styles properties */}

  doSomething(text = 'do something...') {
    console.log(text);
  }
  
  render() {
    
const {setCurrentPage,currentPage}=this.state;


    return (
     <View>
            <Text >
              How strong was your desire to use tobacco?
            </Text>
            <View
              style={{
                flex: 0.15,
                marginTop: responsiveHeight(2),
                width: responsiveWidth(100),
              }}>
              <StepIndicator
                customStyles={customStyles}
                currentPosition={this.state.currentPosition}
                labels={labels}
                stepCount={7}
                // onPress={ () => ({position}) => this.onPageChange(position)}
                onPress={this.onStepPress}
              />
            </View>
            {/* <Swiper
        style={{ flexGrow: 1 }}
        loop={false}
        index={currentPage}
        autoplay={false}
        showsButtons
        onIndexChanged={(page) => {
          setCurrentPage(page);
        }}
      >
      </Swiper> */}
        {/* <Stepper
  steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]}
  activeStep={2}
/> */}
  <SliderPicker
          minLabel={'Not At All'}
          // midLabel={'mid'}
          maxLabel={'Strong'}
          maxValue={7}
          callback={position => {
            this.setState({ value: position });
          }}
          defaultValue={this.state.value}
          labelFontColor={"#202020"}
          labelFontWeight={'100'}
          showFill={true}
          fillColor={'#0072BB'}
          showNumberScale={false}
          showSeparatorScale={true}
          sliderInnerBackgroundColor={'#0072BB'}
          buttonBackgroundColor={'#0072BB'}
          buttonBorderColor={"#FFFFFF"}
          buttonBorderWidth={1}
          scaleNumberFontWeight={'100'}
          buttonDimensionsPercentage={6}
          heightPercentage={1}
          widthPercentage={65}
          separatorStylesOverride	={{ borderWidth: 10 , borderColor: '#0072BB', borderBottomColor: '#0072BB', borderRadius: 100/2 }}
          // sliderInnerBorderStyles={{borderWidth: responsiveWidth(1) / 2, borderColor: '#d9dce4', borderBottomColor: '#f1f4f5', borderRadius: 50 }}
        />

        <Text>state.value: {this.state.value}</Text>
        {/* <Stepper
                    steps={steps}
                    activeStep={this.state.activeStep}
                    onSelect={this.handleOnClickStepper}
                    showNumber={false}
                />

                <View>
                {this.state.activeStep === 1 ? <Text> You are in Stage {this.state.activeStep} </Text> : 
                 this.state.activeStep === 2 ? <Text> You are in Stage {this.state.activeStep} </Text> :
                 <Text> You are in Stage {this.state.activeStep} </Text>
                }
                </View> */}

                {/* <View style={{marginTop: '40px'}}>
                    <Button value={this.state.activeStep === steps.length ? 'Finish' : 'Next'} 
                            onClick={this.state.activeStep === steps.length ? null : this.handleOnClickNext}/>
                    {this.state.activeStep ===1 ? '' : <input type="button" value="Back" onClick={this.handleOnClickBack} /> }
                </View> */}
      
            </View>
    );
  }
}
