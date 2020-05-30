import React from 'react';
import { TextInput, View, StyleSheet, Text, ScrollView, Picker, TouchableWithoutFeedback, Image, Alert, Keyboard, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import Icon from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';

import {server} from '../../config';

/* Header */
class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        
        return (
            <View style={styles.box_header}>
                <TouchableWithoutFeedback onPress={() => {
                    this.props.navigation.navigate('Tài khoản');
                }}>
                    <View style={{ flex: 1 }}>
                        <IconEntypo name="chevron-left" color="white" size={30} />
                    </View>
                </TouchableWithoutFeedback>
                <Text style={[styles.header_text, { textAlign: 'center' }]}>Sửa hồ sơ</Text>
                <TouchableWithoutFeedback 
                    onPress={this.props.press_on_submit_btn}
                >
                    <Text style={[styles.header_text, { textAlign: 'right' }]}>Xong</Text>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

class InputAvatar extends React.Component {

    render() {
        return (
            <View style={[styles.box_option_input, {
                justifyContent: 'center', 
                flexDirection: 'row',}]} >
                <TouchableWithoutFeedback onPress={this.props.change_avatar}>
                    <View style={{ 
                        padding: 2,
                        borderColor: '#dadada',
                        borderWidth: 1,
                        borderRadius: 5,}}>
                        <Image source={{ uri: this.props.value.uri}} style={{ height: 90, width: 90, borderRadius: 5 }} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

class InputName extends React.Component {
    render() {
        return (
            <View style={styles.box_option_input} >
                <View style={[styles.box_input_text, { flexDirection: 'row' }]}>
                    <TextInput placeholder='Tên hiển thị'
                        value={this.props.value}
                        style={{ flex: 6 }} maxLength={50}
                        onChangeText={(value) => this.props.get_value(value)}></TextInput>
                    <Text style={{ color: '#6b6b6b', flex: 1, paddingLeft: 5, textAlign: 'right' }}>{this.props.value.length}/50</Text>
                </View>
                {
                    this.props.error_input == true ? 
                        <View style={styles.notifycation_error_input}>
                            <Icon name='warning' color='red' size={15} />
                            <Text style={styles.error_input_color} > Vui lòng nhập tên hiển thị</Text>
                        </View> :
                        null
                }
            </View>
        );
    }
}

class InputPhoneNumber extends React.Component {
    render() {
        return (
            <View style={styles.box_option_input} >
                <View style={[styles.box_input_text, { flexDirection: 'row' }]}>
                    <TextInput placeholder='Số điện thoại'
                        keyboardType='number-pad'
                        style={{ width: '100%' }}
                        maxLength={10}
                        value={this.props.value.toString()}
                        onChangeText={(value) => this.props.get_value(value)}></TextInput>
                </View>
            </View>
        );
    }
}

class InputTypeOfUser extends React.Component {
    render() {
        return (
            <View style={styles.box_option_input} >
                <View style={[styles.box_input_text, {}]}>
                    <Picker selectedValue={this.props.value} onValueChange={(value) => this.props.get_value(value)}>
                        <Picker.Item label="Cá nhân" value="Cá nhân" />
                        <Picker.Item label="Doanh nghiệp" value="Doanh nghiệp" />
                    </Picker>
                </View>
            </View>
        );
    }
}


/* Một số thông tin khi đăng bán sách */
class Infomation extends React.Component {
    render() {
        return (
            <View style={[styles.box_option_input, { marginBottom: 20 }]} >
                <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Text style={{ color: '#6b6b6b' }}>Lưu ý: </Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ color: '#6b6b6b' }}>Bạn nên nhập đầy đủ và chính xác thông tin.</Text>
                </View>
            </View>
        );
    }
}

class AccountEditting extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            is_loading_info: false,
            name_value: '',
            phone_number_value: '',
            type_of_user_value: '',
            avatar_value: '',
            error_input_name: false,
            new_avatar: false,
            is_change_info: false,
        };
    }

    // Hàm sửa ảnh đại diện
    changeImage = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync({quality: 0.1});
        if (pickerResult.cancelled === true) {
            return;
        }

        this.setState({
            avatar_value: pickerResult,
            new_avatar: true,
            is_change_info: true,
        })
    };

    // Hàm lấy giá trị của tên người dùng
    get_name_value = (value) => {
        if(value.trim() == '') {
            this.setState({
                name_value: value,
                error_input_name: true,
                is_change_info: true,
            })
        } else {
            this.setState({
                name_value: value,
                error_input_name: false,
                is_change_info: true,
            })
        }
    }
    // Hàm lấy số điện thoại
    get_phone_number_value = (value) => {
        this.setState({
            phone_number_value: value,
            is_change_info: true,
        })
    }
    // Hàm lấy kiểu user
    get_type_of_user_value = (value) => {
        this.setState({
            type_of_user_value: value,
            is_change_info: true,
        })
    }

    componentDidMount() {
        // Id của người dùng được pass trong params từ Account_Screen
        const { user_id } = this.props.route.params;
        
        // Lấy thông tin của người dùng cần sửa và gán giá trị cho các biến state
        fetch(server + '/account-info/info/' + user_id)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                is_loading_info: false,
                name_value: responseJson.user_info.name,
                phone_number_value: responseJson.user_info.phone_number,
                type_of_user_value: responseJson.user_info.type_of_user,
                avatar_value: {
                    uri: server + responseJson.user_info.avatar
                },
            })
        })
        .catch((error) => {
            console.error(error);
        });
    }    

    // 
    press_on_submit_btn = () => {

        // Có thay đổi ảnh đại diện không
        // Phải lưu ở đây vì không biết vì lý do gì mà khi goi đến this.state.new_avatar trong lệnh kiểm tra ở dưới
        // thì luôn cho kết quả là false
        var new_avatar = this.state.new_avatar;
        var avatar_value = this.state.avatar_value;

        // Id của người dùng được pass trong params từ Account_Screen
        const { user_id } = this.props.route.params;

        // Ẩn bàn phím
        Keyboard.dismiss();

        // Kiểm tra xem có lỗi input không
        // Nếu không có thì tiến hành submit
        if(this.state.is_change_info) {
            if(!this.state.error_input_name) {
                // Submit cho các thông tin text như: tên, sđt, kiểu người dùng
                fetch(server + '/account-info/edit/info/' + user_id, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.state.name_value,
                        phone_number: this.state.phone_number_value,
                        type_of_user: this.state.type_of_user_value,
                    })
                }).then((response) => response.json())
                .then((response_2) => {

                    // Nếu thành công thì kiểm tra xem avatar có thay đổi không
                    // Nếu có thì tiến hành submit avatar mới
                    // Nếu không thì thông báo thành công
                    if(response_2.status == 'success') {
                        
                        // Nếu người dùng thay avatar mới thì 
                        // tiến hành submit avatar mới
                        if(new_avatar) {
                            // Lưu avatar mới
                            var avatar = new FormData();
                            avatar.append('photo', {
                                uri: avatar_value.uri,
                                type: 'image/jpeg', // or photo.type
                                name: 'img_' + Math.floor(Math.random() * Math.floor(999999999)) + '.jpg'
                            });

                            fetch(server + '/account-info/edit/avatar/' + user_id, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'multipart/form-data'
                                },
                                body: avatar
                            }).then((response) => response.json())
                            .then((response_1) => {
                                if(response_1.status == 'success') {
                                    Alert.alert(
                                        'Thông báo',
                                        'Thành công.',
                                        [
                                        {text: 'OK', onPress: () => {
                                            this.props.route.params.update_state(user_id);
                                            this.props.navigation.goBack();
                                        }},
                                        ],
                                        { cancelable: false }
                                    )
                                } else {
                                    Alert.alert(
                                        'Thông báo',
                                        'Đã xảy ra lỗi.',
                                        [
                                        {text: 'OK', onPress: () => {}},
                                        ],
                                        { cancelable: false }
                                    )
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            });;
                        } else {
                            Alert.alert(
                                'Thông báo',
                                'Thành công.',
                                [
                                {text: 'OK', onPress: () => {
                                    this.props.route.params.update_state(user_id);
                                    this.props.navigation.goBack();
                                }},
                                ],
                                { cancelable: false }
                            )
                        }
                    } else {
                        Alert.alert(
                            'Thông báo',
                            'Đã xảy ra lỗi.',
                            [
                            {text: 'OK', onPress: () => {}},
                            ],
                            { cancelable: false }
                        )
                    }
                })
                .catch((error) => {
                    console.error(error);
                });;

                this.setState({
                    name_value: '',
                    phone_number_value: '',
                    type_of_user_value: '',
                    avatar_value: '',
                    error_input_name: false,
                    new_avatar: false,
                    is_change_info: false,
                })
            }
        } else {
            Alert.alert(
                'Thông báo',
                'Bạn không có chỉnh sửa nào.',
                [
                  {text: 'OK', onPress: () => {}},
                ],
                { cancelable: false }
            )
        }
    }

    render() {
        if (this.state.is_loading_info) {
            return (
                <View style={{ flex: 1 }}>
                    <ActivityIndicator style={{ flex: 1 }} />
                </View>
            )
        } 
        return (
            <View style={styles.box_screen}>
                <Header
                    navigation={this.props.navigation}
                    press_on_submit_btn={this.press_on_submit_btn}/>
                <ScrollView style={styles.box_content}>

                    <InputAvatar change_avatar={this.changeImage} value={this.state.avatar_value}/>
                    <InputName get_value={this.get_name_value} value={this.state.name_value} error_input={this.state.error_input_name}/>
                    <InputPhoneNumber get_value={this.get_phone_number_value} value={this.state.phone_number_value}/>
                    <InputTypeOfUser get_value={this.get_type_of_user_value} value={this.state.type_of_user_value}/>
                    <Infomation />

                </ScrollView>
            </View>
        );
    }
}

export default AccountEditting;

const styles = StyleSheet.create({
    /*Style của box toàn màn hình*/
    box_screen: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    /*Style của header*/
    box_header: {
        paddingTop: 30,
        paddingBottom: 7,
        backgroundColor: '#D96704',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    header_text: {
        color: 'white',
        fontSize: 18,
        padding: 5,
        flex: 1
    },

    /*Style của phần nhập nội dung*/
    box_content: {
        flex: 1,
    },
    box_option_input: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5
    },
    box_input_text: {
        borderColor: '#dadada',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        paddingLeft: 5,
        paddingRight: 5,
    },
    notifycation_error_input: {
        padding: 5,
        flexDirection: 'row'
    },


    /*Style của thông báo input sai*/
    error_input_color: {
        color: 'red'
    },
});


