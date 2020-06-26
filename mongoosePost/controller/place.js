const place = require('../model/place');
const user = {
    userName: "최영훈",
    email: "yeonghun0327@gmail.com",
    profileImage: "https://avatars1.githubusercontent.com/u/40652160?s=400&u=9cd767fc9ae0adc0948fec0fb7c4fe126a64ffae&v=4",
    ranking: 1,
    posts: 24
}
const dummyPlace = {
    placeName: "엽기떡볶이",
    category: [
        "맛집"
    ],
    location: {
        latitude: "63.23562123",
        longitude: "12.2346641"
    },
    stations: [
        {
            lineNumber:"1",
            stationName:"동대문역"
        }
    ],
    tagList: [
        "맛있는",
        "저렴한"
    ],
    description: "맛집이에요~"
}
module.exports = {
    uploadPlace: async (req, res) => {
        const {
            userName,
            email,
            profileImage,
            ranking,
            posts
        } = user;
        const {
            placeName,
            category,
            location,
            stations,
            tagList,
            description
        } = dummyPlace;
        const imageFiles = req.files;

        if (imageFiles === undefined || imageFiles.length === 0) {
            return res.status(400).json({
                message: "이미지를 첨부해주세요"
            });
        }

        const imageUrl = imageFiles.map(img => img.location);
        console.log(imageUrl);
        try {
            let placeModel = new place();
            placeModel.placeName = placeName;
            placeModel.category = category;
            placeModel.imageUrl = imageUrl;
            placeModel.location = location;
            placeModel.stations = stations;
            placeModel.tagList = tagList;
            placeModel.description = description;
            placeModel.upLoader = userName;
            placeModel.save()
                .then((result) => {
                    return res.status(200).json({
                        message: "플레이스 업로드 완료",
                        result: result
                    })
                })
                .catch((err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            message: "서버 에러"
                        })
                    }
                })
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: `서버 에러: ${err}`
            })
        }
    },
    readPlace: async (req, res) => {
        //이미지, 장소, 태그
        try {
            const getPlaceData = await place.find().select({
                _id: 0,
                imageUrl: 1,
                placeName: 1,
                tagList: 1
            });
            res.status(200).json({
                message: "전체 장소 조회 성공",
                data: {
                    place: getPlaceData
                }
            })
        } catch{
            res.status(500).json({
                message:"서버 에러"
            })
        }
    }
}