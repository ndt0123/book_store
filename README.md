# book_store
A community that connect everyone who love book
### Sửa lỗi undefined is not an object (evaluating '_react.PropsTypes.Objects')

Install prop-types: npm install --save prop-types <br/>
Trong file '/node_modules/react-native-slideShow/slideShow.js':
  - Xóa PropsType trong phần import của 'React'
  - Thêm dòng: import PropTypes from 'prop-types';
