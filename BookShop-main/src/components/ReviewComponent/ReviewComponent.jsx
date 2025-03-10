import React, { useState } from "react";
import { Rate, Input, Button, Avatar, List } from "antd";
import { WrapperReviewContainer, CommentInputWrapper, CommentItem } from "./style";

const ReviewComponent = () => {
    const [rating, setRating] = useState(5); // Giá trị sao mặc định
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([
        { author: "Trần Minh Hiếu", text: "hay", avatar: "https://i.pravatar.cc/50" }
    ]);

    const handleSendComment = () => {
        if (comment.trim()) {
            setComments([...comments, { author: "Bạn", text: comment, avatar: "https://i.pravatar.cc/50" }]);
            setComment(""); // Xóa nội dung ô nhập sau khi gửi
        }
    };

    return (
        <WrapperReviewContainer>
            <h2>ĐÁNH GIÁ & BÌNH LUẬN</h2>
            <Rate allowHalf defaultValue={rating} onChange={setRating} />
            <CommentInputWrapper>
                <Input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Thêm bình luận của bạn"
                />
                <Button type="primary" onClick={handleSendComment} icon={<i className="comment">gửi</i>} />
            </CommentInputWrapper>
            <List
                dataSource={comments}
                renderItem={(item) => (
                    <CommentItem>
                        <Avatar src={item.avatar} />
                        <div>
                            <strong>{item.author}</strong>
                            <p>{item.text}</p>
                        </div>
                    </CommentItem>
                )}
            />
        </WrapperReviewContainer>
    );
};

export default ReviewComponent;
