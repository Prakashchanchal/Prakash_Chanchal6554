import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import styles from '../stylesheet/style'
export default class InputField extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const {
			style,
			label,
			secureTextEntry = false,
			onChangeText,
			placeholder = "",
            value = "",
            color=''
		} = this.props;

		return (
			<View>
				<TextInput
					placeholder={placeholder}
					returnKeyType="done"
					selectTextOnFocus={false}
					onFocus={() => {
					}}
					onBlur={() => {
					}}
					style={styles.textField}
					onChangeText={onChangeText}
					value={value}
					secureTextEntry={secureTextEntry}
					underlineColorAndroid="transparent"
					allowFontScaling={false}
					disableFullscreenUI={true}
				/>
			</View>
		);
	}
};