
/*
 Màn hình đăng lên quyển sách mới
 */


import React from 'react';
import { TextInput, View, StyleSheet, Text, ScrollView, Picker, TouchableWithoutFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {getTimeLeft, server} from '../../config';

/* Header */
class NewBookHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error_img: false,
            error_title: false,
            error_price: false,
            error_satus: false,
            error_phone_number: false,
            error_description: false,
            error_author: false,
            error_type_of_book: false,
        };
    }

    // Gọi hàm khi lick vào button xong
    onPressSubmitBtn = () => {

        console.log('\n');
        console.log('Anh: ' + this.props.img_value);
        console.log('Tieu de: ' + this.props.title_value);
        console.log('Gia: ' + this.props.price_value);
        console.log('Trang thai: ' + this.props.status_value);
        console.log('Sdt: ' + this.props.phone_number_value);
        console.log('Mo ta: ' + this.props.description_value);
        console.log('Tac gia: ' + this.props.author_value);
        console.log('Loai sach: ' + this.props.type_of_book_value);

        //
        if (this.props.img_value == '') {
            this.setState({
                error_img: true,
            })
        } else {
            this.setState({
                error_img: false,
            })
        }

        //
        if (this.props.title_value == '') {
            this.setState({
                error_title: true,
            })
        } else {
            this.setState({
                error_title: false,
            })
        }

        // 
        if (this.props.price_value == '') {
            this.setState({
                error_price: true,
            })
        } else {
            this.setState({
                error_price: false,
            })
        }

        //
        if (this.props.phone_number_value == '') {
            this.setState({
                error_phone_number: true,
            })
        } else {
            this.setState({
                error_phone_number: false,
            })
        }

        //
        if (this.props.description_value == '') {
            this.setState({
                error_description: true,
            })
        } else {
            this.setState({
                error_description: false,
            })
        }

        //
        if (this.props.status_value == '') {
            this.setState({
                error_satus: true,
            })
        } else {
            this.setState({
                error_satus: false,
            })
        }

        //
        if (this.props.author_value == '') {
            this.setState({
                error_author: true,
            })
        } else {
            this.setState({
                error_author: false,
            })
        }

        //
        if (this.props.type_of_book_value == '') {
            this.setState({
                error_type_of_book: true,
            })
        } else {
            this.setState({
                error_type_of_book: false,
            })
        }

        // Truyền giá trị các lỗi lên cho component cha NewBookScreen
        this.props.get_error(
            this.state.error_img,
            this.state.error_title,
            this.state.error_price,
            this.state.error_satus,
            this.state.error_phone_number,
            this.state.error_description,
            this.state.error_author,
            this.state.error_type_of_book);
    }

    render() {
        
        return (
            <View style={styles.box_header}>
                <View style={{ flex: 1 }}></View>
                <Text style={[styles.header_text, { textAlign: 'center' }]}>Đăng bài</Text>
                <TouchableWithoutFeedback onPress={this.onPressSubmitBtn}>
                    <Text style={[styles.header_text, { textAlign: 'right' }]}>Xong</Text>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

/* Khung input hình ảnh sách */
class InputBookImages extends React.Component {

    render() {
        return (
            <View style={styles.box_option_input} >
                <View style={[styles.box_input_text,
                { width: 70, height: 70, padding: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f1f1' }
                ]}>
                    <Icon name='camera' color='#6b6b6b' size={20} />
                    <Text style={{ color: '#6b6b6b' }}>1/10</Text>
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

    onChangePhoneNumberInput = (value) => {
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
                        onChangeText={this.onChangePhoneNumberInput}></TextInput>
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

            img_value: '',
            title_value: '',
            price_value: '',
            status_value: '',
            phone_number_value: '',
            description_value: '',
            author_value: '',
            type_of_book_value: ''
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

    // Lấy giá trị các lỗi từ component con NewBookHeader
    get_error = (err_img, err_title, err_price, err_status, err_phone_number, err_description, err_author, err_type_of_book) => {
        this.setState({
            error_img: err_img,
            error_title: err_title,
            error_price: err_price,
            error_status: err_status,
            error_phone_number: err_phone_number,
            error_description: err_description,
            error_author: err_author,
            error_type_of_book: err_type_of_book
        })
    }


    render() {
        return (
            <View style={styles.box_screen}>
                <NewBookHeader
                    img_value={this.state.img_value}
                    title_value={this.state.title_value}
                    price_value={this.state.price_value}
                    status_value={this.state.status_value}
                    phone_number_value={this.state.phone_number_value}
                    description_value={this.state.description_value}
                    author_value={this.state.author_value}
                    type_of_book_value={this.state.type_of_book_value}

                    get_error={this.get_error}
                />
                <ScrollView style={styles.box_content}>
                    <InputBookImages error_input={this.state.error_img} get_value={this.get_img_value} />

                    <InputBookTitle error_input={this.state.error_title} get_value={this.get_title_value} />

                    <InputBookPrice error_input={this.state.error_price} get_value={this.get_price_value} />

                    <InputBookStatus error_input={this.state.error_status} get_value={this.get_status_value} />

                    <InputTypeOfBook error_input={this.state.error_type_of_book} get_value={this.get_type_of_book_value} />

                    <InputBookAuthor error_input={this.state.error_author} get_value={this.get_author_value} />

                    <InputPhoneNumber error_input={this.state.error_phone_number} get_value={this.get_phone_number_value} />

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


