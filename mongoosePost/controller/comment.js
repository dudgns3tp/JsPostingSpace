const Comment = require('../model/comment');
const Place = require('../model/place');
const dummyComment = {
    content: "test1입니다.",
    writer: "최영훈"
};
module.exports = {
    createComment: async (req, res) => {
        const {
            content,
            writer
        } = dummyComment;
        const {
            post_id
        } = req.body;

        let commentModel = new Comment();
        commentModel.content = content;
        commentModel.writer = writer;
        let newComment = await commentModel.save()

        let placeData = await Place.findOne({
            _id: post_id
        });
        console.log("장소:", placeData);
        console.log("새 댓글 아이디",newComment._id);
        placeData.comments.push(newComment._id)
        placeData.commentsCount += 1;
        let result = await placeData.save()
            .then(t => t.populate('comments').execPopulate())
            .catch((err) => {
                return res.status(500).json({
                    message: "postid에 맞는 게시물이 없습니다."
                })
            })

        return res.status(200).json({
            message: "댓글 달기 성공",
            data: result
        })

    }
}