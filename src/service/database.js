import posData from './data.json';

export default class Database {
  constructor() {
    this.menu = posData.menu;
    this.category = posData.category;
    this.option = posData.option;
    this.review = posData.review;
    /*console.log(`menu :`, this.menu);
    console.log(`category :`, this.category);
    console.log(`option :`, this.option);
    console.log(`review :`, this.review);*/
    console.log('Database constructor : ', posData);
  }

  // 카테고리 정보 반환
  getCategoryList() {
    return this.category;
  }

  // 카테고리별 메뉴 정보 반환
  getMenuList(categoryId) {
    return this.menu.filter((data) => data.category === categoryId);
  }

  // menu id 별 메뉴 정보 반환
  getMenuInfo(menuId) {
    return this.menu.find((data) => data.id === menuId);
  }

  // 선택 메뉴의 옵션 정보 반환
  getMenuOption(menuId) {
    const optionIdList = this.menu.find((data) => data.id === menuId).option;
    if(optionIdList === null) {
      return [];
    }
    
    let retOptions = [];
    optionIdList.forEach((optionId) => {
      retOptions.push(this.option.find((data) => data.id === optionId));
    }); 

    return retOptions;
  }

  // 선택 메뉴의 리뷰 정보 반환
  getMenuReview(menuId) {
    let retReviews = [];

    this.review.forEach((data, index) => {
      if(index >= 3) return;
      const idx = data.order_list.indexOf(menuId);
      if(idx !== -1) {
        retReviews.push(data);
      }
    });

    return retReviews;
  }
}