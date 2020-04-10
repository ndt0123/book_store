import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, TextInput } from 'react-native';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import {getTimeLeft, server} from '../../config';

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username_value: '',
            password_value: '',
            repassword_value: '',
            error_input_username: false,
            error_input_password: false,
            error_repassword: false,
            error_repass_incorrect: false,
            signIn_fail: false,
            error_sigIn: ''
        }
    }

    onSubmitSignIn = () => {
        var username = this.state.username_value;
        var password = this.state.password_value;
        var repassword = this.state.repassword_value;

        if(username == '') {
            this.setState({
                error_input_username: true
            })
        } else {
            this.setState({
                error_input_username: false
            })
        }

        if(password == '') {
            this.setState({
                error_input_password: true,
                error_repassword: false,
                error_repass_incorrect: false,
            })
        } else {
            this.setState({
                error_input_password: false,
            })
        }

        if(repassword == '' && password != '') {
            this.setState({
                error_repassword: true,
                error_repass_incorrect: false
            })
        } else if(repassword != '' && password != '') {
            if(repassword != password) {
                this.setState({
                    error_repassword: false,
                    error_repass_incorrect: true
                })
            } else {
                this.setState({
                    error_repassword: false,
                    error_repass_incorrect: false
                })
            }
        }

        if(username != '' && password != '' && repassword != '' && password == repassword) {
            fetch(server + '/auth/signin', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {

                if(responseJson.status == 'error') {
                    this.setState({
                        signIn_fail: true,
                        error_sigIn: responseJson.error
                    })
                } else if(responseJson.status == 'success') {
                    this.setState({
                        signIn_fail: false,
                    })

                    this.props.logged_in();
                }
            })
            .catch((error) => {
                console.error(error);
            });;
        }

    }

    render() {
        return(
            <View style={styles.box_screen}>
                <View style={{paddingBottom: 40, paddingTop: 40}}>
                    <Text style={{textAlign: 'center', fontSize: 28, fontWeight: '600', color: '#D96704'}}>Đăng ký</Text>
                </View>
                <View style={styles.box_login_input_feild}>
                    <IconFontAwesome name='user' size={25} color='white' style={{flex: 1}}/>
                    <TextInput 
                        placeholder='Tên đăng nhập' 
                        style={[styles.input_feild]}
                        maxLength={50}
                        value={this.state.username_value}
                        onChangeText={(value) => {
                            this.setState({
                                username_value: value.trim()
                            })
                        }}></TextInput>
                </View>
                {
                    this.state.error_input_username == true ? 
                        <View style={{flexDirection: 'row', paddingLeft: 10}}>
                            <IconFontAwesome name='exclamation-triangle' size={12} color='red' />
                            <Text style={{fontSize: 12, color: 'red'}}> Nhập tài khoản</Text>
                        </View> :
                        null
                }
                <View style={styles.box_login_input_feild}>
                    <IconFontAwesome name='lock' size={25} color='white' style={{flex: 1}} />
                    <TextInput 
                        placeholder='Mật khẩu' 
                        style={[styles.input_feild]} 
                        secureTextEntry={true}
                        maxLength={20}
                        value={this.state.password_value}
                        onChangeText={(value) => {
                            this.setState({
                                password_value: value.trim()
                            })
                        }}></TextInput>
                </View>
                {
                    this.state.error_input_password == true ? 
                        <View style={{flexDirection: 'row', paddingLeft: 10}}>
                            <IconFontAwesome name='exclamation-triangle' size={12} color='red' />
                            <Text style={{fontSize: 12, color: 'red'}}> Nhập mật khẩu</Text>
                        </View> :
                        null
                }
                <View style={styles.box_login_input_feild}>
                    <IconFontAwesome name='lock' size={25} color='white' style={{flex: 1}} />
                    <TextInput 
                        placeholder='Nhập lại mật khẩu' 
                        style={[styles.input_feild]} 
                        secureTextEntry={true}
                        maxLength={20}
                        value={this.state.repassword_value}
                        onChangeText={(value) => {
                            this.setState({
                                repassword_value: value.trim()
                            })
                        }}></TextInput>
                </View>
                {
                    this.state.error_repassword == true ? 
                        <View style={{flexDirection: 'row', paddingLeft: 10}}>
                            <IconFontAwesome name='exclamation-triangle' size={12} color='red' />
                            <Text style={{fontSize: 12, color: 'red'}}> Xác nhận lại mật khẩu</Text>
                        </View> :
                        null
                }
                {
                    this.state.error_repass_incorrect == true ? 
                        <View style={{flexDirection: 'row', paddingLeft: 10}}>
                            <IconFontAwesome name='exclamation-triangle' size={12} color='red' />
                            <Text style={{fontSize: 12, color: 'red'}}> Mật khẩu xác nhận sai</Text>
                        </View> :
                        null
                }
                {
                    this.state.signIn_fail == true ? 
                    <View style={{flexDirection: 'row', paddingLeft: 10}}>
                        <IconFontAwesome name='exclamation-triangle' size={12} color='red' />
                        <Text style={{fontSize: 12, color: 'red'}}> {this.state.error_sigIn}</Text>
                    </View> :
                    null
                }
                <TouchableWithoutFeedback onPress={this.props.press_on_logIn_btn}>
                    <View style={{alignItems: 'flex-end'}}>
                        <Text style={{color: 'white'}}>Đăng nhập</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.onSubmitSignIn}>
                    <View style={[styles.box_login_btn]}>
                        <Text style={{textAlign: 'center', fontWeight: '500', color: 'white'}}>ĐĂNG KÝ</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

class LogIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username_value: '',
            password_value: '',
            login_fail: false,
            error_login: '',
        }
    }

    onSubmitLogIn = () => {
        var username = this.state.username_value;
        var password = this.state.password_value;
        
        if(username != '' && password != '') {
            fetch(server + '/auth/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {

                if(responseJson.status == 'error') {
                    this.setState({
                        login_fail: true,
                        error_login: responseJson.error
                    })
                } else if(responseJson.status == 'success') {
                    this.setState({
                        login_fail: false
                    })
                    this.props.logged_in();
                }
            })
            .catch((error) => {
                console.error(error);
            });;
        }
        
    }

    render() {
        return (
            <View style={styles.box_screen}>
                <View style={{paddingBottom: 40, paddingTop: 40}}>
                    <Text style={{textAlign: 'center', fontSize: 28, fontWeight: '600', color: '#D96704'}}>Đăng nhập</Text>
                </View>
                <View style={styles.box_login_input_feild}>
                    <IconFontAwesome name='user' size={25} color='white' style={{flex: 1}}/>
                    <TextInput 
                        placeholder='Tên đăng nhập' 
                        style={[styles.input_feild]}
                        maxLength={50}
                        value={this.state.username_value}
                        onChangeText={(value) => {
                            this.setState({
                                username_value: value.trim()
                            })
                        }}></TextInput>
                </View>
                <View style={styles.box_login_input_feild}>
                    <IconFontAwesome name='lock' size={25} color='white' style={{flex: 1}} />
                    <TextInput 
                        placeholder='Mật khẩu' 
                        style={[styles.input_feild]} 
                        secureTextEntry={true}
                        maxLength={20}
                        value={this.state.password_value}
                        onChangeText={(value) => {
                            this.setState({
                                password_value: value.trim()
                            })
                        }}></TextInput>
                </View>

                {
                    this.state.login_fail == true ? 
                        <View style={{flexDirection: 'row', paddingLeft: 10}}>
                            <IconFontAwesome name='exclamation-triangle' size={12} color='red' />
                            <Text style={{fontSize: 12, color: 'red'}}> {this.state.error_login}</Text>
                        </View> :
                        null
                }

                <TouchableWithoutFeedback onPress={this.props.press_on_signIn_btn}>
                    <View style={{alignItems: 'flex-end'}}>
                        <Text style={{color: 'white'}}>Đăng ký</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.onSubmitLogIn}>
                    <View style={[styles.box_login_btn]}>
                        <Text style={{textAlign: 'center', fontWeight: '500', color: 'white'}}>ĐĂNG NHẬP</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            );
    }
}

class LogInScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login_state: 1, // Trạng thái hiển thị khung đăng nhập, đăng ký (1-đăng nhập, 2-đăng ký)
        }
    }
    render() {
        return(
            this.state.login_state == 1 ? 
                <LogIn press_on_signIn_btn={() => 
                        this.setState({ login_state: 2 })
                    }
                    logged_in={this.props.logged_in}/> :
                <SignIn press_on_logIn_btn={() => 
                        this.setState({ login_state: 1 })
                    }
                    logged_in={this.props.logged_in}/>
        );
    }
}
export default LogInScreen;

const styles = StyleSheet.create({
    box_screen: {
        flex: 1,
        padding: 40,
        paddingTop: 80,
        paddingBottom: 50,
        backgroundColor: '#73F5EE'
    },
    box_login_input_feild: {    
        padding: 10,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e4e4e4',
        marginBottom: 10,
        marginTop: 10
    },
    input_feild: {
        flex: 8
    }, 
    login_btn: {
        padding: 15,
        width: '100%',
        backgroundColor: 'red',
        borderRadius: 20,
    },
    box_login_btn: {
        marginTop: 10,
        borderRadius: 50,
        width: '100%',
        marginTop: 20,
        padding: 15,
        backgroundColor: '#D96704'
    }
});