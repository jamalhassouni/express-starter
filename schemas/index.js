const Joi = require("joi");
const { phoneRegex } = require("../helpers");
const userSchemas = {
  login: Joi.object().keys({
    email: Joi.string().required().messages({
      "string.base": `field_should_be_string`,
      "any.required": `field_is_required`,
    }),
    password: Joi.string().required().messages({
      "string.base": `field_should_be_string`,
      "any.required": `field_is_required`,
    }),
  }),
  register: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
    addresses: Joi.array()
      .items(
        Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().required(),
          location: Joi.object()
            .keys({
              type: Joi.string(),
              coordinates: Joi.array().length(2),
            })
            .required(),
          is_selected: Joi.boolean(),
        })
      )
      .min(1),
  }),
  sociaLogin: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string(),
    email: Joi.string().email().required(),
    provider: Joi.string().required(),
    providerId: Joi.string().required(),
    addresses: Joi.array()
      .items(
        Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().required(),
          location: Joi.object()
            .keys({
              type: Joi.string(),
              coordinates: Joi.array().length(2),
            })
            .required(),
          is_selected: Joi.boolean(),
        })
      )
      .min(1),
  }),
  getUser: Joi.object().keys({
    email: Joi.string().min(5).required(),
  }),
  setAvatar: Joi.object().keys({
    image: Joi.string().required(),
  }),
  setPhone: Joi.object().keys({
    phone_number: Joi.string().regex(phoneRegex).required(),
  }),
  sendPhoneCode: Joi.object().keys({
    phone: Joi.string().regex(phoneRegex).required(),
  }),
  verifyPhoneCode: Joi.object().keys({
    phone: Joi.string().regex(phoneRegex).required(),
    code: Joi.string().required(),
  }),
  selectAddress: Joi.object().keys({
    id: Joi.string().required(),
  }),
  addNewAddress: Joi.object().keys({
    address: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      location: Joi.object()
        .keys({
          type: Joi.string(),
          coordinates: Joi.array().length(2),
        })
        .required(),
      is_selected: Joi.boolean(),
    }),
  }),
  updateAddress: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.object()
      .keys({
        type: Joi.string(),
        coordinates: Joi.array().length(2),
      })
      .required(),
  }),
  updateInfos: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
  setReview: Joi.object().keys({
    content: Joi.string().required(),
    rate: Joi.number().required(),
    restaurant: Joi.string().required(),
    order: Joi.string().required(),
  }),
  resetPassword: Joi.object().keys({
    token: Joi.string().required(),
    expireDate: Joi.string().required(),
    password: Joi.string().required(),
    confirm_password: Joi.any().valid(Joi.ref("password")).required(),
  }),
  logout: Joi.object().keys({
    token: Joi.string().required(),
  }),
  updataAddress: Joi.object().keys({
    address: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
  }),
  deleteAddress: Joi.object().keys({
    address: Joi.string().required(),
  }),
  handleFavoriteRestaurants: Joi.object().keys({
    restaurant: Joi.string().required(),
  }),
};

const restaurantSchemas = {
  create: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    // description: Joi.string().required(),
    address: Joi.string().required(),
    logo: Joi.string().required(),
    cover: Joi.string(),
    location: Joi.object().keys({
      type: Joi.string(),
      coordinates: Joi.array().length(2),
    }),
    // locations: Joi.array().items(
    //     Joi.object().keys({
    //         location: Joi.object().keys({
    //             type: Joi.string(),
    //             coordinates: Joi.array().length(2)
    //         })
    //     })
    // ),
    work_time: Joi.string().required(),
    delivery: Joi.number().required(),
    delivery_time_avg: Joi.string().required(),
    minShippingConditions: Joi.number().required(),
    additional_fees: Joi.number().required(),
    tags: Joi.array(),
    pricePercentOverAllDishes: Joi.number().required(),
    isPriceOverAllPercent: Joi.boolean().required(),
    city: Joi.string().required(),
    isRevenuePercent: Joi.boolean().required(),
    riderRevenue: Joi.number().required(),
    affectedRider: Joi.string().allow(null).allow(""),
    // categories: Joi.array().items(
    //     Joi.object().keys({
    //         category: Joi.string().required(),
    //         dishes: Joi.array().items(
    //             Joi.object().keys({
    //                 name: Joi.string().required(),
    //                 description: Joi.string().required(),
    //                 price: Joi.string().required(),
    //                 is_popular: Joi.boolean().required(),
    //                 supp_categories: Joi.array().items(
    //                     Joi.object().keys({
    //                         name: Joi.string().required(),
    //                         min: Joi.number().required(),
    //                         max: Joi.number().required(),
    //                         supplements: Joi.array().items(
    //                             Joi.object().keys({
    //                                 name: Joi.string().required(),
    //                                 price: Joi.string().required()
    //                             })
    //                         )
    //                     })
    //                 )
    //             })
    //         )
    //     })
    // )
  }),
  updateRestaurant: Joi.object().keys({
    name: Joi.string().required(),
    // description: Joi.string().required(),
    description: Joi.string().optional(),
    address: Joi.string().required(),
    logo: Joi.string(),
    cover: Joi.string(),
    location: Joi.object().keys({
      type: Joi.string(),
      coordinates: Joi.array().length(2),
    }),
    work_time: Joi.string().required(),
    delivery: Joi.number().required(),
    delivery_time_avg: Joi.string().required(),
    minShippingConditions: Joi.number().required(),
    additional_fees: Joi.number().required(),
    tags: Joi.array(),
    pricePercentOverAllDishes: Joi.number().required(),
    isPriceOverAllPercent: Joi.boolean().required(),
    city: Joi.string().required(),
    isRevenuePercent: Joi.boolean().required(),
    riderRevenue: Joi.number().required(),
    affectedRider: Joi.string().allow(null).allow(""),
  }),
  removeRestaurant: Joi.object().keys({
    id: Joi.string().required(),
  }),
  getRestaurant: Joi.object().keys({
    id: Joi.string().required(),
  }),
  getNearRestaurants: Joi.object().keys({
    lat: Joi.number().required(),
    long: Joi.number().required(),
  }),
  getNearRestaurantsWithoutDishesPaginate: Joi.object().keys({
    lat: Joi.number().required(),
    long: Joi.number().required(),
    page: Joi.number().required(),
  }),
  searchRestaurants: Joi.object().keys({
    lat: Joi.number().required(),
    long: Joi.number().required(),
    name: Joi.string(),
  }),
  addNewDish: Joi.object().keys({
    name: Joi.string().required(),
    // description: Joi.string().required(),
    description: Joi.string(),
    price: Joi.string().required(),
    is_popular: Joi.boolean().required(),
    image: Joi.string(),
    category: Joi.string().required(),
    restaurant: Joi.string().required(),
  }),
  updateDish: Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string().required(),
    // description: Joi.string().required(),
    description: Joi.string(),
    price: Joi.string().required(),
    is_popular: Joi.boolean().required(),
    image: Joi.string(),
    category: Joi.string().required(),
    restaurant: Joi.string().required(),
  }),
  removeDish: Joi.object().keys({
    id: Joi.string().required(),
    category: Joi.string().required(),
    restaurant: Joi.string().required(),
  }),
  // updateRestaurant: Joi.object().keys({
  //   name: Joi.string().required(),
  //   description: Joi.string().required(),
  //   address: Joi.string().required(),
  //   logo: Joi.string(),
  //   cover: Joi.string(),
  //   location: Joi.object().keys({
  //     type: Joi.string(),
  //     coordinates: Joi.array().length(2)
  //   }),
  //   work_time: Joi.string().required(),
  //   delivery: Joi.number().required(),
  //   delivery_time_avg: Joi.string().required(),
  //   minShippingConditions: Joi.number().required(),
  //   additional_fees: Joi.number().required()
  // }),
  // removeRestaurant: Joi.object().keys({
  //   id: Joi.string().required()
  // }),
  // getRestaurant: Joi.object().keys({
  //   id: Joi.string().required()
  // }),
  // getNearRestaurants: Joi.object().keys({
  //   lat: Joi.number().required(),
  //   long: Joi.number().required()
  // }),
  // searchRestaurants: Joi.object().keys({
  //   lat: Joi.number().required(),
  //   long: Joi.number().required(),
  //   name: Joi.string()
  // }),
  // addNewDish: Joi.object().keys({
  //   name: Joi.string().required(),
  //   description: Joi.string().required(),
  //   price: Joi.string().required(),
  //   is_popular: Joi.boolean().required(),
  //   image: Joi.string(),
  //   category: Joi.string().required(),
  //   restaurant: Joi.string().required()
  // }),
  // updateDish: Joi.object().keys({
  //   id: Joi.string().required(),
  //   name: Joi.string().required(),
  //   description: Joi.string().required(),
  //   price: Joi.string().required(),
  //   is_popular: Joi.boolean().required(),
  //   image: Joi.string(),
  //   category: Joi.string().required(),
  //   restaurant: Joi.string().required()
  // }),
  // removeDish: Joi.object().keys({
  //   id: Joi.string().required(),
  //   category: Joi.string().required(),
  //   restaurant: Joi.string().required()
  // }),
  removeSuppCatgory: Joi.object().keys({
    id: Joi.string().required(),
    dish: Joi.string().required(),
    category: Joi.string().required(),
    restaurant: Joi.string().required(),
  }),
  addNewSuppCategory: Joi.object().keys({
    id: Joi.string(),
    name: Joi.string().required(),
    min: Joi.number().required(),
    max: Joi.number().required(),
    dish: Joi.string().required(),
    category: Joi.string().required(),
    restaurant: Joi.string().required(),
  }),
  addNewSupplement: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.string().required(),
    restaurant: Joi.string().required(),
    category: Joi.string().required(),
    dish: Joi.string().required(),
    suppCat: Joi.string().required(),
  }),
  updateSupplement: Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.string().required(),
    restaurant: Joi.string().required(),
    category: Joi.string().required(),
    dish: Joi.string().required(),
    suppCat: Joi.string().required(),
  }),
  removeSupplement: Joi.object().keys({
    id: Joi.string().required(),
    restaurant: Joi.string().required(),
    category: Joi.string().required(),
    dish: Joi.string().required(),
    suppCat: Joi.string().required(),
  }),
  getRestaurantByName: Joi.object().keys({
    name: Joi.string().required(),
  }),
  removeRestaurantCategory: Joi.object().keys({
    id: Joi.string().required(),
    restaurant: Joi.string().required(),
  }),
  getRestaurants: Joi.object().keys({
    page: Joi.number().required(),
    name: Joi.string(),
  }),
  searchRestaurantsV2: Joi.object().keys({
    lat: Joi.number().required(),
    long: Joi.number().required(),
    name: Joi.string(),
    categoryName: Joi.string(),
    rating: Joi.number(),
    orderByShipping: Joi.boolean(),
    withPromotion: Joi.boolean(),
  }),
  changeRestaurantWorkDays: Joi.object().keys({
    id: Joi.string().required(),
    work_days: Joi.object()
      .keys({
        monday: Joi.array().min(1).max(2).required(),
        tuesday: Joi.array().min(1).max(2).required(),
        wednesday: Joi.array().min(1).max(2).required(),
        thursday: Joi.array().min(1).max(2).required(),
        friday: Joi.array().min(1).max(2).required(),
        saturday: Joi.array().min(1).max(2).required(),
        sunday: Joi.array().min(1).max(2).required(),
      })
      .required(),
  }),
  login: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const adminSchemas = {
  login: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  register: Joi.object().keys({
    full_name: Joi.string().required(),
    username: Joi.string().required().min(5),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
    country: Joi.string().required(),
  }),
  createCoupon: Joi.object().keys({
    description: Joi.string().required(),
    restaurant: Joi.string(),
    code: Joi.string().required(),
    is_percent: Joi.boolean(),
    amount: Joi.string().required(),
    is_for_shipping: Joi.boolean(),
    condition: Joi.string(),
    expire_date: Joi.date().required(),
    dishes: Joi.array(),
  }),
  createDeal: Joi.object().keys({
    restaurant: Joi.string().messages({
      "string.base": `field_should_be_string`,
      "any.required": `field_is_required`,
    }),
    dish: Joi.object().required(),
    expiration_date: Joi.date().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    dealPrice: Joi.number().required(),
    dishQuantity: Joi.number().required(),
    discounted_percent: Joi.number(),
    image: Joi.string(),
    isVisible: Joi.boolean().required(),
    isQuantityLimitActive: Joi.boolean().required(),
    quantityLimit: Joi.number().required(),
    isOneTimeOrder: Joi.boolean().required(),
    isCompanyDeal: Joi.boolean().required(),
    // conditions: Joi.object()
    //   .keys({
    //     free_shipping: Joi.object().keys({
    //       active: Joi.boolean().messages({
    //         "bool.base": `field_should_be_boolean`
    //       }),
    //       amount: Joi.number().messages({
    //         "number.base": `field_should_be_number`
    //       })
    //     }),
    //     free_dish: Joi.object().keys({
    //       active: Joi.boolean().messages({
    //         "bool.base": `field_should_be_boolean`
    //       }),
    //       dishId: Joi.string().messages({
    //         "string.base": `field_should_be_number`
    //       })
    //     }),
    //     discount_on_second: Joi.object().keys({
    //       active: Joi.boolean().messages({
    //         "bool.base": `field_should_be_boolean`
    //       }),
    //       discount: Joi.number().messages({
    //         "number.base": `field_should_be_number`
    //       })
    //     })
    //   })
    //   .min(1)
    //   .messages({
    //     "any.min": "field_should_have_a_minimum_of_{#limit}"
    //   })
  }),
  updateAdmin: Joi.object().keys({
    id: Joi.string().required(),
    full_name: Joi.string().required(),
    username: Joi.string().required().min(5),
    email: Joi.string().email().required(),
    newPassword: Joi.string(),
    confirmPassword: Joi.any().valid(Joi.ref("newPassword")),
    country: Joi.string().required(),
  }),
  removeAdmin: Joi.object().keys({
    id: Joi.string().required(),
  }),
  getCoupons: Joi.object().keys({
    restaurantID: Joi.string().required(),
  }),
  getUsers: Joi.object().keys({
    page: Joi.number().required(),
  }),
  getAllCoupons: Joi.object().keys({
    page: Joi.number().required(),
  }),
  createNewUser: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
    phone_number: Joi.string().regex(phoneRegex).required(),
    is_phone_verified: Joi.boolean().required(),
  }),
  updateUser: Joi.object().keys({
    id: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string(),
    confirmPassword: Joi.any().valid(Joi.ref("password")),
    phone_number: Joi.string().regex(phoneRegex).required(),
    is_phone_verified: Joi.boolean().required(),
  }),
  updateCoupon: Joi.object().keys({
    id: Joi.string().required(),
    description: Joi.string().required(),
    restaurant: Joi.string(),
    code: Joi.string().required(),
    is_percent: Joi.boolean(),
    amount: Joi.string().required(),
    is_for_shipping: Joi.boolean(),
    condition: Joi.string(),
    expire_date: Joi.date().required(),
    dishes: Joi.array(),
  }),
  updateDeal: Joi.object().keys({
    id: Joi.string().required(),
    restaurant: Joi.string().messages({
      "string.base": `field_should_be_string`,
      "any.required": `field_is_required`,
    }),
    dish: Joi.object().required(),
    expiration_date: Joi.date().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    dealPrice: Joi.number().required(),
    dishQuantity: Joi.number().required(),
    discounted_percent: Joi.number().required(),
    image: Joi.string(),
    isVisible: Joi.boolean().required(),
    isQuantityLimitActive: Joi.boolean().required(),
    quantityLimit: Joi.number().required(),
    isOneTimeOrder: Joi.boolean().required(),
    isCompanyDeal: Joi.boolean().required(),
  }),
  getRiders: Joi.object().keys({
    page: Joi.number().required(),
  }),
  createNewRider: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
    phone: Joi.string().required(),
    country_code: Joi.string().required(),
    avatar: Joi.string().required(),
    city: Joi.string().required(),
    revenuePerOrder: Joi.object().keys({
      isPercent: Joi.boolean().required(),
      amount: Joi.number().required(),
    }),
  }),
  updateRider: Joi.object().keys({
    id: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    country_code: Joi.string().required(),
    avatar: Joi.string(),
    isActive: Joi.boolean(),
    city: Joi.string().required(),
    revenuePerOrder: Joi.object().keys({
      isPercent: Joi.boolean().required(),
      amount: Joi.number().required(),
    }),
  }),
  changeRiderPassword: Joi.object().keys({
    id: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
  }),
  getRequests: Joi.object().keys({
    page: Joi.number().required(),
  }),
  acceptRequests: Joi.object().keys({
    id: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
    city: Joi.string().required(),
    revenuePerOrder: Joi.object().keys({
      isPercent: Joi.boolean().required(),
      amount: Joi.number().required(),
    }),
  }),
  createTag: Joi.object().keys({
    name: Joi.string().required(),
  }),
  updateTag: Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string().required(),
  }),
  getRidersByName: Joi.object().keys({
    name: Joi.string().required(),
  }),
  affectRiderToOrder: Joi.object().keys({
    orderId: Joi.string().required(),
    riderId: Joi.string().required(),
  }),
  updateSettings: Joi.object().keys({
    distance: Joi.number().required(),
    is_sms_enable: Joi.boolean().required(),
    is_deals_enable: Joi.boolean().required(),
    deactivateOrders: Joi.boolean().required(),
  }),
  getRidersStats: Joi.object().keys({
    id: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  }),
  addPartnerRequest: Joi.object().keys({
    full_name: Joi.string().required(),
    email: Joi.string().email().required(),
    restaurant_name: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    delivery_option: Joi.string().required(),
    phone: Joi.string().required(),
  }),
  getPartnersRequests: Joi.object().keys({
    page: Joi.number().required(),
  }),
  removeCategory: Joi.object().keys({
    id: Joi.string().required(),
  }),
  removeRestaurantTag: Joi.object().keys({
    id: Joi.string().required(),
  }),
  adminSearchRestaurants: Joi.object().keys({
    name: Joi.string().required(),
  }),
  updatePriceOverAllForSpecificRestaurants: Joi.object().keys({
    restaurantsId: Joi.array().required(),
    isPercent: Joi.boolean().required(),
    amount: Joi.number().required(),
  }),
  createCountry: Joi.object().keys({
    name: Joi.string().required(),
  }),
  updateCountry: Joi.object().keys({
    name: Joi.string().required(),
    id: Joi.string().required(),
  }),
  getCities: Joi.object().keys({
    page: Joi.number().required(),
  }),
  createCity: Joi.object().keys({
    name: Joi.string().required(),
    country: Joi.string().required(),
  }),
  updateCity: Joi.object().keys({
    name: Joi.string().required(),
    id: Joi.string().required(),
    country: Joi.string().required(),
  }),
  updateRidersRevenueInfo: Joi.object().keys({
    isRevenuePercent: Joi.boolean().required(),
    revenueAmount: Joi.number().required(),
  }),
  updateRevenuePerOrderForSpecificRestaurants: Joi.object().keys({
    restaurantsId: Joi.array().required(),
    isPercent: Joi.boolean().required(),
    amount: Joi.number().required(),
    affectedRider: Joi.string().allow(null).allow(""),
  }),
  getRiderRevenues: Joi.object().keys({
    id: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  }),
  markRiderRevenueAsPaid: Joi.object().keys({
    revenueIds: Joi.array().required(),
    rider: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  }),
  getDealswithPaginate: Joi.object().keys({
    page: Joi.number().required(),
  }),
  updateRestaurantsDeliveryFees: Joi.object().keys({
    amount: Joi.number().required(),
  }),
  setRestaurantEmailPassword: Joi.object().keys({
    id: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const orderSchemas = {
  create: Joi.object().keys({
    dishes: Joi.array(),
    deals: Joi.array(),
    rider: Joi.string(),
    //user: Joi.string().required(),
    restaurant: Joi.string().required(),
    totalPrice: Joi.number().required(),
    shippingFee: Joi.number().required(),
    coupon: Joi.string(),
    address: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      location: Joi.object()
        .keys({
          type: Joi.string(),
          coordinates: Joi.array().length(2),
        })
        .required(),
      is_selected: Joi.boolean(),
    }),
  }),
  getOrders: Joi.object().keys({
    id: Joi.string(),
  }),
  changeOrderStatus: Joi.object().keys({
    id: Joi.string().required(),
    status: Joi.number().required().min(-1).max(5),
  }),
  getAndValidateCoupon: Joi.object().keys({
    restaurant: Joi.string().required(),
    code: Joi.string().required(),
    totalPrice: Joi.number().required(),
    user: Joi.string().allow(""),
    dishes: Joi.array(),
    deals: Joi.array(),
  }),
  getAllOrdersWithPaginate: Joi.object().keys({
    page: Joi.number().required(),
    name: Joi.string().optional(),
  }),
  confirmOrder: Joi.object().keys({
    id: Joi.string().required(),
    rider: Joi.string(),
  }),
  deleteOrder: Joi.object().keys({
    orderID: Joi.string().required(),
  }),
  markOrderAdCancelled: Joi.object().keys({
    orderID: Joi.string().required(),
  }),
  removeRiderFromOrder: Joi.object().keys({
    orderID: Joi.string().required(),
  }),
};

const categorySchemas = {
  createCategory: Joi.object().keys({
    name: Joi.string().required(),
    logo: Joi.string(),
    restaurant: Joi.string(),
    isVisible: Joi.boolean(),
  }),
  updateCategory: Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string().required(),
    logo: Joi.string(),
    restaurant: Joi.string(),
    isVisible: Joi.boolean(),
  }),
  getCategoryRestaurants: Joi.object().keys({
    category: Joi.string().required().messages({
      "string.base": `field_should_be_string`,
      "any.required": `field_is_required`,
    }),
    lat: Joi.number().required().messages({
      "number.base": `field_should_be_number`,
      "any.required": `field_is_required`,
    }),
    long: Joi.number().required().messages({
      "number.base": `field_should_be_number`,
      "any.required": `field_is_required`,
    }),
  }),
  getCategories: Joi.object().keys({
    isAdmin: Joi.boolean(),
    page: Joi.number(),
    name: Joi.string(),
  }),
  getRestaurantCategories: Joi.object().keys({
    restaurant: Joi.string().required(),
  }),
};

const riderSchemas = {
  login: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  addRequest: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    country_code: Joi.string().required(),
  }),
  changePasswordRider: Joi.object().keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
    confirmPassword: Joi.any().valid(Joi.ref("newPassword")).required(),
  }),
  changeDisponibility: Joi.object().keys({
    id: Joi.string().required(),
  }),
  setRiderLocation: Joi.object().keys({
    lat: Joi.number().required(),
    long: Joi.number().required(),
  }),
  getRiderOrdersWithPaginate: Joi.object().keys({
    page: Joi.number().required(),
  }),
  getOrderForRider: Joi.object().keys({
    id: Joi.string().required(),
  }),
  saveRiderDirection: Joi.object().keys({
    id: Joi.string().required(),
    direction: Joi.array().required(),
  }),
  getOrderMapDirection: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const emailSchema = {
  sendPasswordResetEmail: Joi.object().keys({
    role: Joi.string().required(),
    email: Joi.string().required(),
  }),
};

const notificationSchemas = {
  handlePushTokens: Joi.object().keys({
    id: Joi.string().allow(""),
    role: Joi.string().allow(""),
    title: Joi.string().required(),
    body: Joi.string().required(),
  }),
  saveToken: Joi.object().keys({
    token: Joi.string().allow(""),
    id: Joi.string().allow(""),
    role: Joi.string().allow(""),
    platform: Joi.string().allow(""),
    deviceToken: Joi.string().allow(""),
  }),
};

const vendorSchemas = {
  cancelOrder: Joi.object().keys({
    orderID: Joi.string().required(),
  }),
  getOrders: Joi.object().keys({
    page: Joi.number().required(),
  }),
};

module.exports = {
  userSchemas,
  restaurantSchemas,
  adminSchemas,
  orderSchemas,
  categorySchemas,
  riderSchemas,
  emailSchema,
  notificationSchemas,
  vendorSchemas,
};
