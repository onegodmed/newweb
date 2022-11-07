import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  ///User.php////
  SEND_OTP = 'User/sendotp';
  VERIFY_OTP = 'User/verifyotp';
  LOGOUT = 'User/logOut';

  ///Astrologer.php////
  HOME_ASTROL_IST = 'Astrologer/getHomeAstrologerList';
  ALL_ASTROL_IST = 'Astrologer/getAstrologerList';
  ASTRO_DETAILS = 'Astrologer/astroDetails';
  RATINGS_ALL = 'Astrologer/AstroRating';
  AVAILABILITY = 'Astrologer/AstroAvl';
  CHECK_USER_BALANCE = 'Astrologer/checkUserBalance';
  GET_CITY = 'Astrologer/searchCity';
  ADD_CALL = 'Astrologer/addCall';
  ADD_CHAT = 'Astrologer/addChat';
  CANCEL_CHAT_URL = 'Astrologer/cancelOrder';
  END_CHAT_URL    = 'Astrologer/endChat';

  ///Blog.php////
  BLOG_LIST_HOME = 'Blog/blogList';
  BLOG_DETAILS = 'Blog/blogDetails';

  ///Users.php////
  FOLLOW = 'User/follow';
  UNFOLLOW = 'User/unfollow';
  CHECKFOLLOWUNFOLLOW = 'User/getUserfollowingAstrologer';
  ADD_REVIEW_RATING = 'User/addreviewRating';
  TESTIMONIAL = 'User/getTestimonial';
  USER_CURRENT_BALANCE = 'User/userWalletdetails';
  USER_PROFILE_DETAILS = 'User/userprofiledetails';
  UPDATE_USER_PROFILE = 'User/updateprofile';
  ADD_RATING_REVIEWS = 'User/addreviewRating';

  ///Package.php///
  PACKAGE_LIST = 'Package/offerPackage';
  PACKAGE_CALCULATION = 'Package/packageCalculation';

  ///Common.php////
  ASTROLOGY_LIST= 'common/getSubCategoriesListByCategories';
  SUBCATEGORY ='Common/subCategoryDetails';
  GETCOUNTRY ='Common/getCountryList';
  GETSTATE ='Common/getStateListByCountry';
  GETCITY ='Common/getCityListByState';

  ///Transaction.php////
  CREATE_ORDER= 'Transaction/insertTransaction';
  PAYMENT_SUCCESS= 'Transaction/paymentStatusUpdate';
  TRANSACTION_LIST = 'Transaction/transactionList';

  ///Order.php///
  MY_BOOKING = 'Order/orderList';
  ORDER_INFO_URL = 'Order/orderDetail';
  CHECK_CALL_STATUS = 'Order/checkCallstatus';
  CALL_MISSED = 'Order/updatemissedCallstatus';


  constructor() { }
}
