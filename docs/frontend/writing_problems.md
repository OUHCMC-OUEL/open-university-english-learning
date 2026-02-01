- Các vấn đề chưa hoàn thiện:
+ Prompt: hiện tại chưa được xây dựng và tối ưu đầy đủ.
+ Cấu trúc nội dung: chưa biết có chính xác chưa? nhờ gd xem và góp ý, nếu gì sai sót thì hỗ trợ reformat lại giúp t nha.

- Chia giao diện làm 2:
+ Bên trái: khu vực nhập và chỉnh sửa nội dung văn bản.
+ Bên phải: khu vực hiển thị các gợi ý sửa lỗi (review / AI suggestions). Ở review thì chia ra làm 4 tab, mỗi tab có 3 phần: correct result(trả về câu chính xác, ở đây người dùng có thể apply nếu không muốn apply lẻ tẻ các lỗi ở issue), explantion(trả về giải thích cho kết quả), issue(trả về chi tiết các lỗi)

- Bổ sung chức năng: 
+ Cho phép người dùng xem lại và quay lại các lần chỉnh sửa / apply trước đó, nhằm tránh mất nội dung mong muốn. Chức năng này được tham khảo và xây dựng dựa trên các tài liệu:
https://usehooks.com/usehistorystate
https://gist.github.com/KristofferEriksson/9ce429cbc33a9accb28bb1abdfecc775

- Đề xuất:
 + Chức năng “Khôi phục bản gốc”: Cho phép người dùng quay lại nội dung ban đầu trước khi áp dụng bất kỳ gợi ý nào. Giúp người dùng dễ so sánh giữa bản gốc và các phiên bản đã chỉnh sửa
