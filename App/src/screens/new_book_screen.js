
/*
 Màn hình đăng lên quyển sách mới
 */


import React from 'react';
import { TextInput, View, StyleSheet, Text, ScrollView, Picker, TouchableWithoutFeedback, Image, Alert, Keyboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import Icon from 'react-native-vector-icons/FontAwesome';

import {getTimeLeft, server} from '../../config';

var input_book_image;

/* Header */
class NewBookHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error_img: false,
            error_title: false,
            error_price: false,
            error_status: false,
            error_phone_number: false,
            error_description: false,
            error_author: false,
            error_type_of_book: false,
            error_position: false,
        }
    }

    press_on_submit_btn = () => {
        var error_img = false;
        var error_title = false;
        var error_price = false;
        var error_status = false;
        var error_phone_number = false;
        var error_description = false;
        var error_author = false;
        var error_type_of_book = false;
        var error_position = false;

        if (this.props.img_value.length == 0) {
            error_img = true;
        }

        //
        if (this.props.title_value.trim() == '') {
            error_title = true;
        }

        // 
        if (this.props.price_value.trim() == '') {
            error_price = true;
        }

        //
        if (this.props.phone_number_value.trim() == '') {
            error_phone_number = true;
        }

        //
        if (this.props.description_value.trim() == '') {
            error_description = true;
        }

        //
        if (this.props.status_value.trim() == '') {
            error_status = true;
        }

        // Trường tác giả có thể có hoặc không

        //
        if (this.props.type_of_book_value.trim() == '') {
            error_type_of_book = true;
        }

        //
        if(this.props.position_value.trim() == '') {
            error_position = true;
        }

        // Truyền giá trị các lỗi lên cho component cha NewBookScreen
        this.props.on_submit(
            error_img,
            error_title,
            error_price,
            error_status,
            error_phone_number,
            error_description,
            error_author,
            error_type_of_book,
            error_position);
    }

    render() {
        
        return (
            <View style={styles.box_header}>
                <View style={{ flex: 1 }}></View>
                <Text style={[styles.header_text, { textAlign: 'center' }]}>Đăng bài</Text>
                <TouchableWithoutFeedback onPress={this.press_on_submit_btn}>
                    <Text style={[styles.header_text, { textAlign: 'right' }]}>Xong</Text>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

/* Khung input hình ảnh sách */
class InputBookImages extends React.Component {

    constructor(props) {
        super(props);
        input_book_image = this;
        this.state = {
            selectedImage: []
        }
    }

    openImagePickerAsync = async () => {
        if(this.state.selectedImage.length < 10) {
            let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
            if (permissionResult.granted === false) {
                alert('Permission to access camera roll is required!');
                return;
            }
        
            let pickerResult = await ImagePicker.launchImageLibraryAsync();
            if (pickerResult.cancelled === true) {
                return;
            }

            // Biến phụ lưu biến state.selectedImage
            var arr_flag = this.state.selectedImage;
            arr_flag.push(pickerResult);

            // Trả danh sách hình ảnh về cho component cha
            this.props.get_value(arr_flag);

            this.setState({
                selectedImage: arr_flag
            })
        }
    };

    deleteImage = (index) => {
        var arr_flag = this.state.selectedImage;
        arr_flag.splice(index, 1);
        
        // Trả danh sách hình ảnh về cho component cha
        this.props.get_value(arr_flag);

        this.setState({
            selectedImage: arr_flag
        })
    }

    render() {
        return (
            <View style={styles.box_option_input} >
                <TouchableWithoutFeedback onPress={this.openImagePickerAsync}>
                    <View style={[
                        styles.box_input_text,
                        { width: 70, height: 70, 
                            padding: 0, 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            backgroundColor: '#f1f1f1' }]}>
                        <Icon name='camera' color='#6b6b6b' size={20} />
                        <Text style={{ color: '#6b6b6b' }}>{this.state.selectedImage.length}/10</Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{paddingTop: 5}}>
                    {
                        this.state.selectedImage.map(function(note, index) {
                            if(index % 4 == 0) {
                                return(
                                    <View style={{flexDirection: 'row'}} key={index}>
                                        <View style={{padding: 5, width: 80}}>
                                            <TouchableWithoutFeedback onPress={() => input_book_image.deleteImage(index)}>
                                                <View style={{position: 'absolute', top: 0, right: 0, zIndex: 2, padding: 2}}>
                                                    <Icon name='close' size={18} color='#585858' />
                                                </View>
                                            </TouchableWithoutFeedback>
                                            <Image source={{ uri: note.uri }} style={{borderRadius: 5, width: 70, height: 70}} />
                                        </View>
                                        {
                                            index+1 < input_book_image.state.selectedImage.length ? 
                                            <View style={{padding: 5, width: 80}}>
                                                <TouchableWithoutFeedback onPress={() => input_book_image.deleteImage(index+1)}>
                                                    <View style={{position: 'absolute', top: 0, right: 0, zIndex: 2, padding: 2}}>
                                                        <Icon name='close' size={18} color='#585858' />
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                <Image source={{ uri: input_book_image.state.selectedImage[index+1].uri }} style={{borderRadius: 5, width: 70, height: 70}} />
                                            </View> :
                                            null
                                        }
                                        {
                                            index+2 < input_book_image.state.selectedImage.length ? 
                                            <View style={{padding: 5, width: 80}}>
                                                <TouchableWithoutFeedback onPress={() => input_book_image.deleteImage(index+2)}>
                                                    <View style={{position: 'absolute', top: 0, right: 0, zIndex: 2, padding: 2}}>
                                                        <Icon name='close' size={18} color='#585858' />
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                <Image source={{ uri: input_book_image.state.selectedImage[index+2].uri }} style={{borderRadius: 5, width: 70, height: 70}} />
                                            </View> :
                                            null
                                        }
                                        {
                                            index+3 < input_book_image.state.selectedImage.length ? 
                                            <View style={{padding: 5, width: 80}}>
                                                <TouchableWithoutFeedback onPress={() => input_book_image.deleteImage(index+3)}>
                                                    <View style={{position: 'absolute', top: 0, right: 0, zIndex: 2, padding: 2}}>
                                                        <Icon name='close' size={18} color='#585858' />
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                <Image source={{ uri: input_book_image.state.selectedImage[index+3].uri }} style={{borderRadius: 5, width: 70, height: 70}} />
                                            </View> :
                                            null
                                        }
                                    </View>
                                );
                            }
                            
                        })
                    }
                </View>
                {
                    this.props.error_input ? 
                        <View style={styles.notifycation_error_input}>
                            <Icon name='warning' color='red' size={15} />
                            <Text style={styles.error_input_color} > Cần có ít nhất một ảnh</Text>
                        </View> :
                        null
                }
            </View>
        );
    }
}

/* Khung input tiêu đề sách */
class InputBookTitle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            number_of_input_character: 0, /* Số lượng kí tự tiêu đề */
            text_input_value: '', /* Nội dung tiêu đề */
        }
    }

    /*Sự kiện thay đổi nội dung tiêu đề */
    onChangeInputTitle = (value) => {
        if (value.length <= 50) {
            this.setState({
                text_input_value: value,
                number_of_input_character: value.length,
            })
        }

        // Truyền giá trị tiêu đề nhập vào lên component cha là NewBookScreen
        this.props.get_value(value);
    }

    render() {
        return (
            <View style={styles.box_option_input} >
                <View style={[styles.box_input_text, { flexDirection: 'row' }]}>
                    <TextInput placeholder='Tiêu đề'
                        value={this.state.text_input_value}
                        style={{ flex: 6 }} maxLength={50}
                        onChangeText={this.onChangeInputTitle}></TextInput>
                    <Text style={{ color: '#6b6b6b', flex: 1, paddingLeft: 5, textAlign: 'right' }}>{this.state.number_of_input_character}/50</Text>
                </View>
                {
                    this.props.error_input == true ? 
                        <View style={styles.notifycation_error_input}>
                            <Icon name='warning' color='red' size={15} />
                            <Text style={styles.error_input_color} > Vui lòng nhập tiêu đề sách</Text>
                        </View> :
                        null
                }
            </View>
        );
    }
}

/* Khung input giá sách */
class InputBookPrice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            price_input_value: '', /* Nội dung giá sách */
        }
    }

    /* Sự kiện thay đổi giá sách */
    onChangeInputPrice = (v) => {
        var value = v.split('.').join('');
        this.setState({
            price_input_value: value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        })

        this.props.get_value(value);
    }

    render() {
        return (
            <View style={styles.box_option_input} >
                <View style={[styles.box_input_text, { flexDirection: 'row' }]}>
                    <TextInput placeholder='Giá bán (0đ là miễn phí)'
                        keyboardType='numeric'
                        value={this.state.price_input_value}
                        style={{ flex: 6 }}
                        onChangeText={this.onChangeInputPrice} ></TextInput>
                    <Text style={{ color: '#6b6b6b', flex: 1, paddingLeft: 5, textAlign: 'right' }}>đồng</Text>
                </View>
                {
                    this.props.error_input ? 
                        <View style={styles.notifycation_error_input}>
                            <Icon name='warning' color='red' size={15} />
                            <Text style={styles.error_input_color} > Vui lòng nhập giá bán</Text>
                        </View> : 
                        null
                }
            </View>
        );
    }
}

/* Tình trạng sách */
class InputBookStatus extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status_input_value: '', /* Nội dung tình trạng sách */
            max_input_length: 3, /* Độ dài nội dung max=3 */
        }
    }

    /* Sự kiện thay đổi nội dung 
        Giá trị max=100%
     */
    onChangeInputStatus = (v) => {
        var value = v;

        this.setState({
            status_input_value: value
        })

        if (value.length == 1) {
            if (value[0] == 0) {
                this.setState({
                    max_input_length: 1
                })
            } else {
                this.setState({
                    max_input_length: 3
                })
            }
        } else if (value.length == 2) {
            if (value[0] > 1) {
                this.setState({
                    max_input_length: 2
                })
            } else if (value[0] == 1) {
                if (value[1] == 0) {
                    this.setState({
                        max_input_length: 3
                    })
                } else {
                    this.setState({
                        max_input_length: 2
                    })
                }
            }
        } else if (value.length == 3) {
            if (value[2] != 0) {
                this.setState({
                    status_input_value: '100'
                })
            }
        }


        this.props.get_value(value);
    }

    render() {
        return (
            <View style={styles.box_option_input} >
                <View style={[styles.box_input_text, { flexDirection: 'row' }]}>
                    <TextInput placeholder='Tình trạng sách (100% là sách mới)'
                        value={this.state.status_input_value}
                        keyboardType='number-pad'
                        maxLength={this.state.max_input_length}
                        style={{ flex: 6 }}
                        onChangeText={this.onChangeInputStatus}></TextInput>
                    <Text style={{ color: '#6b6b6b', flex: 1, paddingLeft: 5, textAlign: 'right' }}>%</Text>
                </View>
                {
                    this.props.error_input ?
                        <View style={styles.notifycation_error_input}>
                            <Icon name='warning' color='red' size={15} />
                            <Text style={styles.error_input_color} > Vui lòng nhập tình trạng của sách</Text>
                        </View> : 
                        null
                }
            </View>
        );
    }
}

/* Loại sách */
class InputTypeOfBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type_of_book: ''
        }
    }

    onChangeTypeOfBook = (value) => {
        this.setState({
            type_of_book: value
        })

        this.props.get_value(value);
    }

    render() {
        return (
            <View style={styles.box_option_input} >
                <View style={[styles.box_input_text, {}]}>
                    <Picker selectedValue={this.state.type_of_book} onValueChange={this.onChangeTypeOfBook}>
                        <Picker.Item label="Thể loại sách" value="" />
                        <Picker.Item label="Sách trinh thám" value="Sách trinh thám" />
                        <Picker.Item label="Truyện tranh" value="Truyện tranh" />
                        <Picker.Item label="Tiểu thuyết" value="Tiểu thuyết" />
                        <Picker.Item label="Sách thiếu nhi" value="Sách thiếu nhi" />
                        <Picker.Item label="Kỹ năng sống" value="Kỹ năng sống" />
                        <Picker.Item label="Ngôn tình" value="Ngôn tình" />
                        <Picker.Item label="Văn học" value="Văn học" />
                        <Picker.Item label="Văn hóa xã hội" value="Văn hóa xã hội" />
                        <Picker.Item label="Chính trị" value="Chính trị" />
                        <Picker.Item label="Pháp luật" value="Pháp luật" />
                        <Picker.Item label="Khoa học-Công nghệ" value="Khoa học-Công nghệ" />
                        <Picker.Item label="Kinh tế" value="Kinh tế" />
                        <Picker.Item label="Văn học nghệ thuật" value="Văn học nghệ thuật" />
                        <Picker.Item label="Giáo trình" value="Giáo trình" />
                        <Picker.Item label="Tâm lý" value="Tâm lý" />
                        <Picker.Item label="Tôn giáo" value="Tôn giáo" />
                    </Picker>
                </View>
                {
                    this.props.error_input ? 
                        <View style={styles.notifycation_error_input}>
                            <Icon name='warning' color='red' size={15} />
                            <Text style={styles.error_input_color} > Vui lòng chọn thể loại sách</Text>
                        </View> :
                        null
                }
            </View>
        );
    }
}

/* Mô tả sách */
class InputBookDescription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            description_input_value: '',
        }
    }

    onChangeDescInput = (value) => {
        this.setState({
            description_input_value: value
        })

        this.props.get_value(value);
    }

    render() {
        return (
            <View style={styles.box_option_input} >
                <View style={[styles.box_input_text, { flexDirection: 'row' }]}>
                    <TextInput placeholder='Mô tả chi tiết sách (tiêu đề sách, tác giả, nhà xuất bản, năm xuất bản, tình trạng sách,...)'
                        value={this.state.description_input_value}
                        multiline={true}
                        style={{ width: '100%', height: 100 }}
                        onChangeText={this.onChangeDescInput}></TextInput>
                </View>
                {
                    this.props.error_input ? 
                        <View style={styles.notifycation_error_input}>
                            <Icon name='warning' color='red' size={15} />
                            <Text style={styles.error_input_color} > Vui lòng nhập mô tả sách</Text>
                        </View> :
                        null
                }
            </View>
        );
    }
}

/* Số điện thoại */
class InputPhoneNumber extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            phone_number_input_value: ''
        }
    }

    onChangePhoneNumberInput = (value) => {
        this.setState({
            phone_number_input_value: value
        })

        this.props.get_value(value)
    }

    render() {
        return (
            <View style={styles.box_option_input} >
                <View style={[styles.box_input_text, { flexDirection: 'row' }]}>
                    <TextInput placeholder='Số điện thoại liên lạc'
                        keyboardType='number-pad'
                        style={{ width: '100%' }}
                        maxLength={10}
                        value={this.state.phone_number_input_value}
                        onChangeText={this.onChangePhoneNumberInput}></TextInput>
                </View>
                {
                    this.props.error_input ? 
                        <View style={styles.notifycation_error_input}>
                            <Icon name='warning' color='red' size={15} />
                            <Text style={styles.error_input_color} > Vui lòng nhập số điện thoại liên lạc</Text>
                        </View> :
                        null
                }

            </View>
        );
    }
}

/* Tác giả */
class InputBookAuthor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author_input_value: ''
        }
    }

    onChangeAuthorInput = (value) => {
        this.setState({
            author_input_value: value
        })

        this.props.get_value(value);
    }

    render() {
        return (
            <View style={styles.box_option_input} >
                <View style={[styles.box_input_text, { flexDirection: 'row' }]}>
                    <TextInput placeholder='Tác giả'
                        style={{ width: '100%' }}
                        value={this.state.author_input_value}
                        onChangeText={this.onChangeAuthorInput}></TextInput>
                </View>
            </View>
        );
    }
}

class InputPosition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position_input_value: ''
        }
    }

    onChangePositionInput = (value) => {
        this.setState({
            position_input_value: value
        })

        this.props.get_value(value);
    }
    render() {
        return(
            <View style={styles.box_option_input} >
                <View style={[styles.box_input_text, { flexDirection: 'row' }]}>
                    <TextInput placeholder='Địa điểm'
                        style={{ width: '100%' }}
                        value={this.state.position_input_value}
                        onChangeText={this.onChangePositionInput}></TextInput>
                </View>
                {
                    this.props.error_input ? 
                        <View style={styles.notifycation_error_input}>
                            <Icon name='warning' color='red' size={15} />
                            <Text style={styles.error_input_color} > Vui lòng nhập thông tin vị trí của bạn</Text>
                        </View> :
                        null
                }
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
                    <Text style={{ color: '#6b6b6b' }}>
                        Bài đăng của bạn có thể bị xóa vì một số lý do:
                    </Text>
                    <Text style={{ color: '#6b6b6b' }}>
                        - Đăng các thông tin không đúng sự thật
                    </Text>
                    <Text style={{ color: '#6b6b6b' }}>
                        - Các thông tin không sử dụng Tiếng Việt hoặc Tiếng Anh
                    </Text>
                    <Text style={{ color: '#6b6b6b' }}>
                        - Đăng bán các sản phẩm không phải là sách
                    </Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ color: '#6b6b6b' }}>Bạn nên nhập đầy đủ và chính xác thông tin, dùng ngôn từ chuẩn mực để bài viết có hiệu quả tốt nhất.</Text>
                </View>
            </View>
        );
    }
}

class NewBookScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error_img: false,
            error_title: false,
            error_price: false,
            error_status: false,
            error_phone_number: false,
            error_description: false,
            error_author: false,
            error_type_of_book: false,
            error_position: false,

            img_value: [],
            title_value: '',
            price_value: '',
            status_value: '',
            phone_number_value: '',
            description_value: '',
            author_value: '',
            type_of_book_value: '',
            position_value: ''
        };
    }

    // Lấy giá trị title nhập vào từ component con InputBookTitle
    get_title_value = (value) => {
        this.setState({
            title_value: value,
        })
    }
    //  Lấy giá trị price nhập vào từ component con
    get_price_value = (value) => {
        this.setState({
            price_value: value,
        })
    }
    //  Lấy giá trị status nhập vào từ component con
    get_status_value = (value) => {
        this.setState({
            status_value: value,
        })
    }
    //  Lấy giá trị type of book nhập vào từ component con
    get_type_of_book_value = (value) => {
        this.setState({
            type_of_book_value: value,
        })
    }
    //  Lấy giá trị author nhập vào từ component con
    get_author_value = (value) => {
        this.setState({
            author_value: value,
        })
    }
    //  Lấy giá trị phone number nhập vào từ component con
    get_phone_number_value = (value) => {
        this.setState({
            phone_number_value: value,
        })
    }
    //  Lấy giá trị description nhập vào từ component con
    get_description_value = (value) => {
        this.setState({
            description_value: value,
        })
    }
    //  Lấy giá trị image nhập vào từ component con
    get_img_value = (value) => {
        this.setState({
            img_value: value,
        })
    }
    // Lấy giá trị position nhập vào từ component con
    get_position_value = (value) => {
        this.setState({
            position_value: value,
        })
    }


    on_submit = (error_img, error_title,
        error_price,
        error_status,
        error_phone_number,
        error_description,
        error_author,
        error_type_of_book,
        error_position) => {
            Keyboard.dismiss();
            this.setState({
                error_img: error_img,
                error_title: error_title,
                error_price: error_price,
                error_status: error_status,
                error_phone_number: error_phone_number,
                error_description: error_description,
                error_author: error_author,
                error_type_of_book: error_type_of_book,
                error_position: error_position,
            })

            // Nếu tất cả mọi trường đều không có lỗi input thì thực hiện gửi dữ liệu lên server để xử lý
            if(!error_img && !error_title && 
                !error_price && !error_status && 
                !error_phone_number && !error_description && 
                !error_author && !error_type_of_book && 
                !error_position) {

                    // Thực hiện request json trước
                    // sau khi thêm thành công thì lấy id
                    // Sau đó thực hiện request file hình ảnh thêm vào db với id đã có bằng một url khác /new-book/images/id
                    fetch(server + '/new-book/info', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            title_value: this.state.title_value,
                            price_value: this.state.price_value,
                            status_value: this.state.status_value,
                            phone_number_value: this.state.phone_number_value,
                            description_value: this.state.description_value,
                            author_value: this.state.author_value,
                            type_of_book_value: this.state.type_of_book_value,
                            position_value: this.state.position_value
                        })
                    })
                    .then((response) => response.json())
                    .then((responseJson) => {

                        // Nếu việc insert thêm thông tin sách vào bảng books thành công - tức là server trả về status == 'success'
                        // thì tiến hành việc upload hình ảnh lên server và thêm đường dẫn vào bảng book_images
                        if(responseJson.status == 'success') {

                            // Id của sách vừa mới thêm vào
                            var book_id = responseJson.book_id;

                            // Thiết lập biến data có kiểu file FormData lưu file image
                            const data = new FormData();
                            var photos = this.state.img_value;
                            // Set giá trị cho biến data theo form dữ liệu của file
                            photos.forEach((photo) => {
                                data.append('photo', {
                                    uri: photo.uri,
                                    type: 'image/jpeg', // or photo.type
                                    name: 'img_' + Math.floor(Math.random() * Math.floor(999999999)) + '.jpg'
                                });  
                            });

                            // Fetch dữ liệu lên server
                            fetch(server + '/new-book/image/' + book_id, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'multipart/form-data'
                                },
                                body: data
                            }).then((response) => response.json())
                            .then((response_2) => {
                                // Hiển thị thông báo nếu thành công hoặc gặp lỗi
                                if(response_2.status == 'success') {
                                    Alert.alert(
                                        'Thông báo',
                                        'Thành công',
                                        [
                                          {text: 'OK', onPress: () => {
                                              this.props.navigation.navigate('Trang chủ');
                                            }},
                                        ],
                                        { cancelable: false }
                                    )                                    
                                } else if(response_2.status == 'error') {
                                    // Set lại state cho trang như ban đầu
                                    Alert.alert(
                                        'Thông báo',
                                        'Đã xảy ra lỗi',
                                        [
                                          {text: 'OK', onPress: () => {
                                              this.props.navigation.navigate('Trang chủ');
                                            }},
                                        ],
                                        { cancelable: false }
                                    )
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            });;

                        } else if(responseJson.status == 'error') { //Nếu xảy ra lỗi khi thêm thông tin sách thì hiển thị thông báo
                            Alert.alert(
                                'Thông báo',
                                'Đã xảy ra lỗi',
                                [
                                  {text: 'OK', onPress: () => {
                                      this.props.navigation.navigate('Trang chủ');
                                    }},
                                ],
                                { cancelable: false }
                            )
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
                <NewBookHeader
                    on_submit={this.on_submit}

                    img_value={this.state.img_value}
                    title_value={this.state.title_value}
                    price_value={this.state.price_value}
                    status_value={this.state.status_value}
                    phone_number_value={this.state.phone_number_value}
                    description_value={this.state.description_value}
                    author_value={this.state.author_value}
                    type_of_book_value={this.state.type_of_book_value}
                    position_value={this.state.position_value}
                />
                <ScrollView style={styles.box_content}>
                    <InputBookImages error_input={this.state.error_img} get_value={this.get_img_value} />

                    <InputBookTitle error_input={this.state.error_title} get_value={this.get_title_value} />

                    <InputBookPrice error_input={this.state.error_price} get_value={this.get_price_value} />

                    <InputBookStatus error_input={this.state.error_status} get_value={this.get_status_value} />

                    <InputTypeOfBook error_input={this.state.error_type_of_book} get_value={this.get_type_of_book_value} />

                    <InputBookAuthor error_input={this.state.error_author} get_value={this.get_author_value} />

                    <InputPhoneNumber error_input={this.state.error_phone_number} get_value={this.get_phone_number_value} />

                    <InputPosition error_input={this.state.error_position} get_value={this.get_position_value} />

                    <InputBookDescription error_input={this.state.error_description} get_value={this.get_description_value} />

                    <Infomation />

                </ScrollView>
            </View>
        );
    }
}

export default NewBookScreen;

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


