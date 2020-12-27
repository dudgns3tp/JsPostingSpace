const data = require('./data.json');

let result = new Map();

data
.forEach(ele => {
      result.set(ele.part, {
        name: ele.userName
      })
});

console.log([...result.values()]);

const getPlacesWithBookmark = async(userIdx, groupIdx) => {
  const tagTable = tableModule.getTag();
  const categoryTable = tableModule.getCategory();
  const subwayTable = tableModule.getSubwayGroup();
  try {
      const bookmarkQuery = `SELECT * FROM (SELECT * FROM ${table} WHERE placeIdx IN (SELECT placeIdx FROM ${bookmarkTB} WHERE userIdx=${userIdx}) AND groupIdx=${groupIdx}) as PLACE natural join USER_TB`;
      const placeResult = await pool.queryParam(bookmarkQuery);

      if(placeResult.length === 0) return [];
      const placeIdxs = new Set(placeResult.map(p => p.placeIdx));
      
      const likeResult = await pool.queryParam(`SELECT placeIdx, count(*) as likeCount FROM LIKE_TB WHERE placeIdx IN (${[...placeIdxs].join(', ')}) GROUP BY placeIdx`);
      console.log(likeResult);
      const result = new Map();
      placeResult.forEach(ele => result.set(ele.placeIdx, {
          placeIdx: ele.placeIdx,
          placeName: ele.placeName,
          placeAddress: ele.placeAddress,
          placeRoadAddress: ele.placeRoadAddress,
          placeMapX: ele.placeMapX,
          placeMapY: ele.placeMapY,
          placeCreatedAt: ele.placeCreatedAt,
          placeUpdatedAt: ele.placeUpdatedAt,
          
          placeReview: ele.placeReview,
          category: categoryTable.find(category => category.categoryIdx === ele.categoryIdx),
          groupIdx: ele.groupIdx,
          placeViews: ele.placeViews,
          tag: [],
          subway: [],
          user: {
              userIdx: ele.userIdx,
              userName: ele.userName ? ele.userName : '',
              email: ele.email ? ele.email : '',
              profileURL: ele.userProfileImageUrl ? ele.userProfileImageUrl : ''
          },
          imageUrl: [],
          likeCount: _.findIndex(likeResult, like => like.placeIdx === ele.placeIdx) !== -1 ? _.find(likeResult, like => like.placeIdx === ele.placeIdx).likeCount : 0
      }));

      const imageResult = await pool.queryParam(`SELECT placeIdx, placeImageUrl, thumbnailImage FROM PLACEIMAGE_TB WHERE placeIdx IN (${[...placeIdxs].join(', ')})`);

      imageResult.forEach(ele => {
          if (result.has(ele.placeIdx)) result.get(ele.placeIdx).imageUrl.push(ele.placeImageUrl);
      });
      const subwayResult = await pool.queryParam(`SELECT subwayIdx, placeIdx FROM SUBWAY_PLACE_RELATION_TB WHERE placeIdx IN (${[...placeIdxs].join(', ')})`);
      subwayResult.forEach(ele => {
          if (result.has(ele.placeIdx)) result.get(ele.placeIdx).subway.push(subwayTable.find(sub => sub.subwayIdx === ele.subwayIdx));
      });

      const tagResult = await pool.queryParam(`SELECT tagIdx, placeIdx FROM PLACE_TAG_RELATION_TB WHERE placeIdx IN (${[...placeIdxs].join(', ')})`);
      tagResult.forEach(ele => {
          if (result.has(ele.placeIdx)) result.get(ele.placeIdx).tag.push(tagTable.find(tag => tag.tagIdx === ele.tagIdx));
      });
      return [...result.values()];
  } catch(e) {
      throw e;
  }
  
},