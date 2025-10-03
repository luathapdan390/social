document.addEventListener('DOMContentLoaded', () => {
    const timeInput = document.getElementById('time');
    const videosInput = document.getElementById('videos');
    const focusInput = document.getElementById('focus');
    const trendingInput = document.getElementById('trending');
    const qualityInput = document.getElementById('quality');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultElement = document.getElementById('result');

    // Hàm định dạng số để dễ đọc hơn (ví dụ: 12345 -> 12,345)
    const formatNumber = (num) => {
        return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const calculateFollowers = () => {
        // Lấy giá trị từ các trường nhập liệu
        const time = parseFloat(timeInput.value) || 0; // Thời Gian (T - giờ/tuần)
        const videos = parseFloat(videosInput.value) || 0; // Số Videos (V - video/tháng)
        const focus = parseFloat(focusInput.value) || 0; // Nội Dung Tập Trung (N - Thang 1-10)
        const trending = parseFloat(trendingInput.value) || 0; // Trending (R - Thang 1-10)
        const quality = parseFloat(qualityInput.value) || 0; // Chất Lượng (C - Thang 1-10)

        // Công thức tính số lượng Followers (T*V) * (N*R*C/10) * 100
        // T * V: Đại diện cho sự đều đặn và tần suất hoạt động
        // N*R*C / 10: Đại diện cho Chất lượng và mức độ liên quan/phổ biến (lấy trung bình theo thang 10)
        // Nhân 100: Hệ số cơ bản để ra con số followers thực tế
        
        const baseActivity = time * videos; // Ví dụ: 10 giờ/tuần * 4 video/tháng = 40
        
        // Tránh chia cho 0
        const contentScore = (focus * trending * quality) / 10; 
        
        // Hằng số nhân để ra con số followers thực tế
        const constantFactor = 100; 

        let followers = baseActivity * contentScore * constantFactor;

        // Giới hạn giá trị âm (nếu có lỗi nhập liệu)
        if (followers < 0) {
            followers = 0;
        }

        // Cập nhật kết quả lên màn hình
        resultElement.textContent = formatNumber(followers);
    };

    // Gắn sự kiện cho nút Tính Toán
    calculateBtn.addEventListener('click', calculateFollowers);

    // Gắn sự kiện cho các ô input (tính toán ngay khi giá trị thay đổi)
    [timeInput, videosInput, focusInput, trendingInput, qualityInput].forEach(input => {
        input.addEventListener('input', calculateFollowers);
    });

    // Tính toán lần đầu khi tải trang
    calculateFollowers();
});