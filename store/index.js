import Vue from 'vue'
import Vuex from 'vuex'
import currencyFormatter from 'currency-formatter'
import setPageAndSidebarHeights from '@/assets/js/functions.js';

function compareValues(key, order = "asc") {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function arrayToParam(object) {
  let parameters = [];

  for (let property in object) {
    if (object.hasOwnProperty(property)) {
      parameters.push(encodeURI(property + "=" + object[property]));
    }
  }

  return parameters.join("&");
}

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV === "development" ? true : false,
  state: {
    userIP: "0",
    minQty: 50,
    countSteps: 3,
    currentStep: 0,
    currencyChanging: false,
    loadingStatus: {
      cart: true,
      price: true
    },
    ids: [
      {
        category: 'products',
        business: [224981],
        edu:      [226543]
      },
      {
        category: 'subscriptions',
        business: [224981, 225806, 225805],
        edu:      [226543, 226544, 226545]
      }
    ],
    priceRules: [
      {
        industry: ["K12", "HigherEducation"], // must be and array even when has single industry
        rules: [
          {
            name: "jamfconnectedu1to9999",
            from: 1,
            to: 9999
          },
          {
            name: "jamfconnectedu10000",
            from: 10000,
            to: null
          }
        ]
      },
      {
        industry: null, // default value
        rules: [
          {
            name: "jamfpro51to249",
            from: 0,
            to: 249
          },
          {
            name: "jamfpro250to1000",
            from: 250,
            to: 1000
          },
          {
            name: "jamfpro1001to2499",
            from: 1001,
            to: 2499
          },
          {
            name: "jamfpro2500to5000",
            from: 2500,
            to: 5000
          },
          {
            name: "jamfpro5001to9999",
            from: 5001,
            to: 9999
          },
          {
            name: "jamfpro10000",
            from: 10000,
            to: null
          }
        ]
      }
    ],
    products: [
      {
        id: 224981,
        name: "macOS",
        price: 0,
        qty: 50,
        pricing: []
      }
    ],
    implementation_services: {
      default_value: null,
      value: null,
      products: [
        {
          //id: 222668,
          //name: "Jamf Connect 1/2-Day Onboarding Service",
          //value: "jamf-connect-1-2-day",
          //statement:
           // "https://resources.jamf.com/documents/ecommerce/jamf-connect-macos-implementation-services-sow.pdf",
          //price: 0,
          //price_text: ""
        }
      ]
    },
    support_packages: {
      default_value: "standard",
      value: null,
      products: [
        {
          id: 222682,
          name: "Jamf Premium Support",
          value: "premium-support",
					price:10000,
          price_text: "",
          description:
            "Help within four hours from a dedicated Jamf Expert during the business day. Recommended for complex environments and larger deployments of Jamf Protect (250+ licenses)."
        },
        {
          id: "standard",
          name: "Standard Support",
          value: "standard-support",
          price: 0,
          price_text: "<strong>Included</strong> with Jamf Protect",
          description:
            "When you join our customer community, you have access to our team of experts, versed in Jamf and Apple technology. Support via chat, email or phone during business hours. No max on the number of support cases you can create."
        },
        {
          id: "discuss",
          name: "I’d like to discuss my needs after purchase.",
          value: "discuss",
          price: 0,
          price_text: "",
          description:
            "Not sure what you need? You can still purchase Jamf Protect and one of our Jamf sales representatives will reach out to discuss your needs and recommend options."
        }
      ]
    },
    cloud_hostings: {
      default_value: 222681,
      value: null,
      instance_name: "",
      products: [
        {
          id: 222681,
          name: "Premium Cloud",
          value: "premium-cloud",
          price: 0,
          price_text: "",
          description:
            "Jamf Premium Cloud is an add-on for Jamf Pro cloud hosting that provides you with flexibility and control over your server. Available in US, UK, Germany, Japan, Australia."
        },
        {
          id: 222665,
          name: "Government Cloud",
          value: "government-cloud",
          price: 0,
          price_text: "",
          description:
            "Available to entities in the United States, Jamf Government Cloud is the most secure way to deploy Jamf Pro. Jamf Government Cloud enables you to manage Apple devices at scale with the world’s leading device management solution while still hosting it in a protected cloud environment that meets your organization’s compliance needs."
        },
        {
          id: "standard",
          name: "Standard Cloud",
          value: "standard-cloud",
          price: 0,
          price_text: "<strong>Free</strong> with Jamf Pro subscription",
          description: "Included with Jamf Pro subscription."
        },
        {
          id: "discuss",
          name: "I’d like to discuss my needs after purchase.",
          value: "discuss",
          price: 0,
          price_text: "",
          description:
            "Not sure what you need? You can still purchase Jamf Pro and one of our Jamf sales reps will reach out to help discuss your needs and recommend options."
        }
      ]
    },
    subscriptions: {
      default_value: 224981,
      value: 224981,
      products: [
        {
          id: 224981,
          name: "1-Year Subscription",
          value: "1-year",
          description:
            "You’ll be billed for one year on all subscription licenses.",
          price: 0,
          price_text: "per license/per term",
        },
        {
          id: 225806,
          name: "2-Year Subscription",
          value: "2-year",
          description:
            "You’ll be billed for two years on all subscription licenses.",
          price: 0,
          price_text: "per license/per term",
        },
        {
          id: 225805,
          name: "3-Year Subscription",
          value: "3-year",
          description:
            "You’ll be billed for three years on all subscription licenses.",
          price: 0,
          price_text: "per license/per term",
        }
      ]
    },
    training_passes: {
      default_value: 222670,
      value: null,
      products: [
        {
          id: 222670,
          name: "Individual Training Pass",
          value: "individual",
          price: 0,
          description:
            "A Training Pass is a yearly subscription that offers a flexible and cost-conscious way to train IT professionals who are interested in becoming certified in Jamf Pro. Registered to one individual."
        },
        {
          id: 222671,
          name: "Organization Training Pass",
          value: "organization",
          price: 0,
          description:
            "A Training Pass is a yearly subscription that offers a flexible and cost-conscious way to train IT professionals who are interested in becoming certified in Jamf Pro. Limited to organizations. Limited to five (5) employees within one organization."
        },
        {
          id: "standard",
          name: "No thanks",
          value: "no-thanks",
          price: 0,
          price_text: "",
          description: ""
        }
      ]
    },
    cart: {
      priceRule: "jamfpro51to249",
      items: [],
      summary: {
        net: 0,
        vat: 0,
        gross: 0
      }
    },
    currency: {
      value: "USD",
      options: {
        ARS: {
          label: "Argentine Peso"
        },
        AUD: {
          label: "Australian Dollar"
        },
        PAB: {
          label: "Balboa"
        },
        BBD: {
          label: "Barbadian Dollar"
        },
        BMD: {
          label: "Bermudian Dollar"
        },
        BOB: {
          label: "Bolivian Boliviano"
        },
        BRL: {
          label: "Brazilian Real"
        },
        GBP: {
          label: "British Pound"
        },
        CAD: {
          label: "Canadian Dollar"
        },
        CLP: {
          label: "Chilean Peso"
        },
        CNY: {
          label: "Chinese Yuan"
        },
        COP: {
          label: "Colombian Peso"
        },
        HRK: {
          label: "Croatian Kuna"
        },
        CZK: {
          label: "Czech Koruna"
        },
        DKK: {
          label: "Danish Krone"
        },
        DOP: {
          label: "Dominican Peso"
        },
        EGP: {
          label: "Egyptian Pound"
        },
        EUR: {
          label: "Euro"
        },
        PYG: {
          label: "Guarani"
        },
        HTG: {
          label: "Haitian Gourde"
        },
        HKD: {
          label: "Hong Kong Dollar"
        },
        UAH: {
          label: "Hryvnia"
        },
        HUF: {
          label: "Hungarian Forint"
        },
        ISK: {
          label: "Icelandic Krona"
        },
        INR: {
          label: "Indian Rupee"
        },
        IDR: {
          label: "Indonesian Rupiah"
        },
        ILS: {
          label: "Israeli Shekel"
        },
        JMD: {
          label: "Jamaican Dollar"
        },
        JPY: {
          label: "Japanese Yen"
        },
        KZT: {
          label: "Kazakhstani Tenge"
        },
        KES: {
          label: "Kenyan Shilling"
        },
        KRW: {
          label: "Korean Won"
        },
        KWD: {
          label: "Kuwaiti Dinar"
        },
        LBP: {
          label: "Lebanese Pound"
        },
        HNL: {
          label: "Lempira"
        },
        LTL: {
          label: "Lithuanian Litas"
        },
        MYR: {
          label: "Malaysian Ringgit"
        },
        MUR: {
          label: "Mauritian Rupee"
        },
        MXN: {
          label: "Mexican Peso"
        },
        MAD: {
          label: "Moroccan Dirham"
        },
        NAD: {
          label: "Namibian Dollar"
        },
        NZD: {
          label: "New Zealand Dollar"
        },
        NOK: {
          label: "Norwegian Krone"
        },
        PEN: {
          label: "Peruvian Nuevo Sol"
        },
        PLN: {
          label: "Polish Zloty"
        },
        QAR: {
          label: "Qatari Rial"
        },
        GTQ: {
          label: "Quetzal"
        },
        RUB: {
          label: "Russian Rouble"
        },
        SAR: {
          label: "Saudi Riyal"
        },
        SGD: {
          label: "Singapore dollar"
        },
        ZAR: {
          label: "South African Rand"
        },
        LKR: {
          label: "Sri Lankan Rupee"
        },
        SEK: {
          label: "Swedish Krona"
        },
        CHF: {
          label: "Swiss Franc"
        },
        TWD: {
          label: "Taiwan Dollar"
        },
        THB: {
          label: "Thai Baht"
        },
        TRY: {
          label: "Turkish Lira"
        },
        AED: {
          label: "UAE Dirham"
        },
        UYU: {
          label: "Uruguayan Peso"
        },
        USD: {
          label: "US Dollar"
        },
        VND: {
          label: "Vietnamese Dong"
        }
      }
    },
    company: {
      industry: {
        value: null,
        blocked: false,
        valid: true,
        required: false,
        options: {
          AccommodationsServices: "Accommodations & Services",
          Construction: "Construction",
          FinancialServicesInsurance: "Financial Services & Insurance",
          Government: "Government",
          Healthcare: "Healthcare",
          HigherEducation: "Higher Education (Colleges/Universities)",
          K12: "K-12 Education",
          InformationCommunications: "Information & Communications",
          Manufacturing: "Manufacturing",
          PowerProductionSupply: "Power Production & Supply",
          ProfessionalServices: "Professional Services",
          RetailWholesale: "Retail & Wholesale",
          Other: "Other"
        }
      },
      employees: {
        value: null,
        blocked: false,
        valid: true,
        required: false,
        options: {
          "1_999": "1 - 999",
          "1000_2499": "1,000 - 2,499",
          "2500_4999": "2,500 - 4,999",
          "5000_7499": "5,000 - 7,499",
          "7500_9999": "7,500 - 9,999",
          "_10000": "10,000+"
        }
      },
      support: {
        value: null,
        blocked: false,
        valid: true,
        required: false,
        options: {
          starting_out: "Starting out managing and securing our Macs",
          new_to_security: "Well managed Macs and ready to deploy good security solutions to all our devices",
          new_to_mac_security: "Great security program but minimal coverage for Macs today",
          upgrading_mac_security: "Well managed and secured Macs; Ready to upgrade to best of breed solutions for Macs",
        },
        // disabledOptions: ["no_IT_Support"]
      },
     providers: {
        value: "N/A",
        blocked: false,
        valid: true,
        required: false,
      options: {
          azure: "Azure",
          //google: "Google",
          //okta: "Okta",
          //ibm: "IBM",
          //onelogin: "OneLogin",
          //ping: "Ping",
         // other: "Other"
        },
       // disabledOptions: ["other"]
     },
      mdm: {
        value: null,
        blocked: false,
        valid: true,
        required: false,
        options: {
          jamf_pro: "Jamf Pro",
          jamf_now: "Jamf Now",
          jamf_school: "Jamf School",
          other: "Other MDM",
          no: "No MDM"
        },
        disabledOptions: ["jamf_pro", "jamf_now", "jamf_school"]
      }
    }
  },
  mutations: {
    cartUpdate(state, cart) {
      /* ------------------------------- clear cart ------------------------------- */

      state.cart.items = [];

      /* ----------------------------- update summary ----------------------------- */

      state.cart.summary = {
        net: cart.TotalPrice.Net,
        vat: cart.TotalPrice.Vat,
        gross: cart.TotalPrice.Gross
      };

      /* ---------------------------- update cart items --------------------------- */

      cart.CartItems.forEach(cartItem => {
        let itemName = cartItem.Name.replace("Jamf Premium for ", "");
        itemName = cartItem.Name.replace("Jamf Pro for ", itemName);

        let position = 0;

        // jamf connect on top
        if (itemName === "Jamf Premium" || itemName.includes('Jamf Premium -')) {
          position = 3;
        }
				// This should set the correct price on currency change, as  you can see it's hack not a solution :/
      
  
        console.log(state.products[0].qty);
        console.log(state.support_packages.default_value);
        console.log(state.company.mdm.value);

        if ((state.products[0].qty > 249) || (state.company.mdm.value=="jamf_pro"))
        {
          let value = 222682;
          state.support_packages.default_value  = value;     
          //state.support_packages.products.id  = "222682";     

        }
            
        
        if (cartItem.ProductId === 222682) {
					state.support_packages.products[0].price = cartItem.TotalPrice.Net
        }
        


        state.cart.items.push({
          name: cartItem.Name,
          price: cartItem.TotalPrice.Net,
          qty: cartItem.Quantity,
          position: position
        });
      });

      state.cart.items.sort((a, b) => {
        return a.position > b.position ? -1 : 1;
      });

      setPageAndSidebarHeights();
    },
    SET_USER_IP(state, ip) {
      state.userIP = ip;
    },
    UPDATE_CART_STATUS(state, status) {
      state.loadingStatus.cart = status;
    },
    UPDATE_PRICE_STATUS(state, status) {
      state.loadingStatus.price = status;
    },
    UPDATE_PRICE_RULE(state, payload) {
      const totalQty = payload.totalQty;
      const isEdu = payload.isEdu;
      let ruleName = null;

      if (isEdu) {
        if (totalQty <= 9999) ruleName = "jamfconnectedu1to9999";
        else if (totalQty >= 10000) ruleName = "jamfconnectedu10000";
      } else {
        if (totalQty <= 249) ruleName = "jamfpro51to249";
        else if (totalQty <= 1000) ruleName = "jamfpro250to1000";
        else if (totalQty <= 2499) ruleName = "jamfpro1001to2499";
        else if (totalQty <= 5000) ruleName = "jamfpro2500to5000";
        else if (totalQty <= 9999) ruleName = "jamfpro5001to9999";
        else if (totalQty >= 10000) ruleName = "jamfpro10000";
      }

      state.cart.priceRule = ruleName;
    },
    RESET_PRICING_RULES(state, payload) {
      let product = state.products.find(el => {
        return payload.id === el.id;
      });

      product.pricing = [];
    },
    UPDATE_PRICING_RULES(state, payload) {
      const price = payload.value;
      const productID = payload.id;
      const rule = payload.rule;
      let from = payload.from <= 0 ? payload.from + 1 : payload.from;
      let to = payload.to;
      let label = "";

      

      if (isNaN(parseInt(to))) {
        from = formatNumber(from);
        to = to != null ? formatNumber(to) : `+`;

        label = `${from + to}`;
      } else {
        from = formatNumber(from);
        to = to != null ? formatNumber(to) : `+`;

        label = `${from} - ${to}`;
      }

      let product = state.products.find(el => {
        return productID === el.id;
      });

      const pricingObj = {
        name: payload.rule,
        from: payload.from,
        label: label,
        value: price
      };

      if(product) {
				product.pricing.push(pricingObj);
				product.pricing = product.pricing.sort(compareValues("from", "asc"));
			}
    },
    UPDATE_CURRENT_STEP(state, stepId) {
      state.currentStep = parseInt(stepId);
    },
    UPDATE_CURRENCY(state, value) {
      state.currency.value = value;
    },

    
    PRODUCT_UPDATE(state, payload) {
      const product = payload.product;
      product.name = payload.name;
      product.price = payload.price;
    },
    UPDATE_PRODUCT_QTY(state, payload) {
      const absVal = Math.abs(parseInt(payload.qty));
      payload.product.qty = Math.max(absVal, 0) || 0;
    },
    SET_COMPANY_FIELD(state, payload) {
      let value = payload.value;
      const fieldName = payload.fieldName;
      const field = state.company[fieldName];

      if(fieldName === 'employees' && value.charAt(0) === "_") {
        value = value.slice(1, value.length);
      }

      field.value = value;

      if (field.disabledOptions) {
        let isValid = false;
        if (field.disabledOptions.indexOf(field.value) < 0) {
          isValid = true;
        }

        field.valid = isValid;
        if (!isValid) {
          if (field.required) {
            field.blocked = true;
          }
        } else {
          field.blocked = false;
        }
      }
    },
    UPDATE_PRODUCT_IDS(state, ids) {
      for (let index = 0; index < ids.length; index++) {
        const id = ids[index];
        state.products[ index ].id = id;
      }
    },
    UPDATE_SUBSCRIPTIONS_IDS(state, ids) {
      for (let index = 0; index < ids.length; index++) {
        const id = ids[index];
        state.subscriptions.products[ index ].id = id;

        if (index === 0) {
          state.subscriptions.default_value = id;
          state.subscriptions.value = id;
        }
      }
    },
    UPDATE_MIN_QTY(state, isEdu) {
      if (isEdu) {
        // change default qty
        if (state.products[0].qty === state.minQty || state.products[0].qty < 50) {
          state.products[0].qty = 50;
          state.products[0].id=226543;
        }
        // change minimal quantity
        state.minQty = 50;
      } else {
        // change default qty
        if (state.products[0].qty === state.minQty) {
          state.products[0].qty = 50;
        }
        // change minimal quantity
        state.minQty = 50;
      }
    },
    // steps
    SELECT_IMPLEMENTATION_SERVICE(state, payload) {
      state.implementation_services.value = payload.product.id;
    },
    SELECT_SUPPORT_PACKAGE(state, payload) {
      state.support_packages.value = payload.product.id;
    },
    SELECT_CLOUD_HOSTING(state, payload) {
      state.cloud_hostings.value = payload.product.id;
    },
    SELECT_SUBSCRIPTION_LENGTH(state, payload) {
      state.products[0].id = payload.product.id;
    },
    SELECT_TRAINING_PASS(state, payload) {
      state.training_passes.value = payload.product.id;
    },
    // cloud instance name
    updateCloudInstanceName(state, value) {
      state.cloud_hostings.instance_name = value;
    }
  },
  actions: {
    ipLocationAsync: ({ commit }) => {
      fetch("https://extreme-ip-lookup.com/json")
        .then(res => res.json())
        .then(data => {
          commit("SET_USER_IP", data.query);
        });
    },
    changePriceRule: ({ commit, getters, dispatch, state }) => {
      commit("UPDATE_PRICE_RULE", {
        totalQty: getters.totalQty,
        isEdu: getters.isEducation
      });


      
      dispatch("getProduct", state.products);
      //dispatch("getProduct", state.implementation_services.products);
      // dispatch("getProduct", state.support_services.products);
      dispatch("getProduct", state.subscriptions.products);
    },
    changeCurrentStep: ({ commit, state }, stepId) => {
      commit("UPDATE_CURRENT_STEP", stepId);
    },
    changeCurrency: ({ commit, dispatch, state }, newVal) => {
      commit("UPDATE_PRICE_STATUS", false);
      commit("UPDATE_CURRENCY", newVal);

      dispatch("getProduct", state.products);
      //dispatch("getProduct", state.implementation_services.products);
      dispatch("getProduct", state.support_packages.products);
      dispatch("getProduct", state.subscriptions.products);

      dispatch("updateProductPriceList");

      dispatch("getCart");
    },
    selectImplementationService: ({ commit, getters, dispatch }, params) => {
      commit("SELECT_IMPLEMENTATION_SERVICE", {
        product: getters.getImplementationServiceById(params.id)
      });
      dispatch("getCart");
    },
    selectSupportPackage: ({ commit, getters, dispatch }, params) => {
      commit("SELECT_SUPPORT_PACKAGE", {
        product: getters.getSupportPackageById(params.id)
      });
      dispatch("getCart");
    },
    selectCloudHosting: ({ commit, getters, dispatch }, params) => {
      commit("SELECT_CLOUD_HOSTING", {
        product: getters.getCloudHostingById(params.id)
      });
      dispatch("getCart");
    },
    selectSubscriptionLength: ({ commit, getters, dispatch }, params) => {
      commit("SELECT_SUBSCRIPTION_LENGTH", {
        product: getters.getSubscriptionLengthById(params.id)
      });
      dispatch("getCart");
    },
    selectTrainingPass: ({ commit, getters, dispatch }, params) => {
      commit("SELECT_TRAINING_PASS", {
        product: getters.getTrainingPassById(params.id)
      });
      dispatch("getCart");
    },
    updateCompanyField: ({ commit, getters }, params) => {
      commit("SET_COMPANY_FIELD", params);

      commit('UPDATE_PRODUCT_IDS', getters.getIds('products'))
      commit('UPDATE_SUBSCRIPTIONS_IDS', getters.getIds('subscriptions'))
      commit('UPDATE_MIN_QTY', getters.isEducation)
    },
    updateProductQty: ({ commit, getters, dispatch }, params) => {
      commit("UPDATE_PRODUCT_QTY", {
        product: getters.getProductById(params.id),
        qty: params.qty
      });
      dispatch("getCart");
    },
    decreaseProductQty: ({ commit, getters, dispatch }, productId) => {
      const product = getters.getProductById(productId);

      if (product.qty > 0) {
        commit("UPDATE_PRODUCT_QTY", {
          product: product,
          qty: product.qty - 1
        });
        dispatch("getCart");
      }
    },
    increaseProductQty: ({ commit, getters, dispatch }, productId) => {
      const product = getters.getProductById(productId);
      commit("UPDATE_PRODUCT_QTY", {
        product: product,
        qty: product.qty + 1
      });
      dispatch("getCart");
    },
    getCart({ commit, state, getters }) {
      /* -------------------------------- variables ------------------------------- */

      let productsId = [];

      state.products.forEach((product, index) => {
        productsId.push(product.id);
      });

      if (
        state.implementation_services.value !== "standard" &&
        state.implementation_services.value !== "discuss" &&
        state.implementation_services.value !== null
      )
        productsId.push(state.implementation_services.value);

      if (
        state.support_packages.value !== "standard" &&
        state.support_packages.value !== "discuss" &&
        state.support_packages.value !== null
      )
        productsId.push(state.support_packages.value);

      if (
        state.cloud_hostings.value !== "standard" &&
        state.cloud_hostings.value !== "discuss" &&
        state.cloud_hostings.value !== null
      )
        productsId.push(state.cloud_hostings.value);

      if (
        state.training_passes.value !== "standard" &&
        state.training_passes.value !== "discuss" &&
        state.training_passes.value !== null
      )
        productsId.push(state.training_passes.value);

      const targetUrlData = {
        // scope: "cart",
        cart: productsId.join(),
        // cfg: "jamf2019_staging",
        pricerule: state.cart.priceRule,
        currency: state.currency.value
      };

      state.products.forEach((product, index) => {
        targetUrlData["quantity_" + product.id] = product.qty;
      });

      const bodyData = {
        GenerateSessionUrl: false,
        RemoteAddress: getters.userIP,
        ShoppingCartUrl:
          "https://store.jamf.com/1594/purl-protect_checkout?" + arrayToParam(targetUrlData)
      };

      /* -------------------------- get cart url via API -------------------------- */

      commit("UPDATE_CART_STATUS", false);

      fetch("https://ci.cleverbridge.com/jamf/cartpreview.php", {
        method: "POST",
        headers: getters.APIHeaders(true),
        body: JSON.stringify(bodyData)
      })
        .then(res => res.json())
        .then(res => {
          if (res.ResultMessage === "OK") {
            commit("cartUpdate", res.Cart);
            commit("UPDATE_CART_STATUS", true);
          } else {
            alert("Something went wrong!");
          }
        })
        .catch(rejected => {
          console.log(rejected);
        });
    },
    generateCartUrl({ commit, state, getters }, scope) {
      /* -------------------------------- variables ------------------------------- */

      let productsId = [];

      state.products.forEach((product, index) => {
        productsId.push(product.id);
      });

      if (
        state.implementation_services.value !== "standard" &&
        state.implementation_services.value !== "discuss" &&
        state.implementation_services.value !== null
      )
        productsId.push(state.implementation_services.value);

      if (
        state.support_packages.value !== "standard" &&
        state.support_packages.value !== "discuss" &&
        state.support_packages.value !== null
      )
        productsId.push(state.support_packages.value);

      if (
        state.cloud_hostings.value !== "standard" &&
        state.cloud_hostings.value !== "discuss" &&
        state.cloud_hostings.value !== null
      )
        productsId.push(state.cloud_hostings.value);

      if (
        state.training_passes.value !== "standard" &&
        state.training_passes.value !== "discuss" &&
        state.training_passes.value !== null
      )
        productsId.push(state.training_passes.value);

      let targetUrlData = {
        cart: productsId.join(),
        pricerule: state.cart.priceRule,
        "x-industry_type": state.company.industry.value,
        "x-number_employees": state.company.employees.value,
       // "x-sso": state.company.providers.value,
        "x-mac": state.company.support.value,
        "x-mdm": state.company.mdm.value,  
        "currency": state.currency.value
      };

      if (state.implementation_services.value === "standard")
        targetUrlData["x-jamfpro_self_guided"] = "no_thanks";

      if (state.training_passes.value === "standard")
        targetUrlData["x-implementation_service"] = "nothanks";
      if (state.training_passes.value === "discuss")
        targetUrlData["x-implementation_service"] = "discuss_needs";

      if (state.support_packages.value === "standard")
        targetUrlData["x-support_package"] = "standard";
      if (state.support_packages.value === "discuss")
        targetUrlData["x-support_package"] = "discuss_needs";

      if (state.cloud_hostings.value === "standard")
        targetUrlData["x-cloud_hosting"] = "standard";
      if (state.cloud_hostings.value === "discuss")
        targetUrlData["x-cloud_hosting"] = "discuss_needs";

      state.products.forEach((product, index) => {
        targetUrlData["quantity_" + product.id] = product.qty;
      });

      const storeUrl = ( scope === 'quote' ) ? "https://store.jamf.com/1594/purl-protect_quote?" : "https://store.jamf.com/1594/purl-protect_checkout?";

      const bodyData = {
        AllowToChangeCart: false,
        MaxQuantity: 10,
        TargetUrl:
        storeUrl + arrayToParam(targetUrlData)
      };

      /* -------------------------- get cart url via API -------------------------- */

      commit("UPDATE_CART_STATUS", false);

      

      fetch("https://ci.cleverbridge.com/jamf/generateurl.php", {
        method: "POST",
        headers: getters.APIHeaders(true, "text/plain"),
        body: JSON.stringify(bodyData)
      })
        .then(res => res.text())
        .then(res => {
          window.location.href = res;
        });
    },
    updateProductPriceListItem({ commit, state, getters }, params) {
      const bodyData = {
        client_id: 1594,
        currency: state.currency.value,
        product_id: params.id,
        price_rule: params.rule.name
      };

      fetch("https://pricingapi.cleverbridge.com/prices?" + arrayToParam(bodyData), {
        method: "GET",
        headers: getters.APIHeaders
      })
        .then(res => res.json())
        .then(res => {
          if (res.length > 0) 
          {



            for (const data of res) {
              commit("UPDATE_PRICING_RULES", {
                id: data.product_id,
                rule: data.price_rule,
                value: data.price.net.value,
                from: params.rule.from,
                to: params.rule.to
              });
            }
          }
        })
    },
    updateProductPriceList({ commit, state, getters, dispatch }) {
      const industry = state.company.industry.value;
      const priceRules = getters.getPricerulesByIndustry(industry)

      for (const product of state.products) {
        // clear list
        commit("RESET_PRICING_RULES", {
          id: product.id
        });

        // create new
        for (const rule of priceRules) {
          dispatch('updateProductPriceListItem', {
            'id': product.id,
            'rule': rule
          })
        }
      }
    },
    getProduct({ commit, state, getters }, products) {

      /* -------------------------------- variables ------------------------------- */

      let productsId = [];


      products.forEach(product => {
        if (product.id !== "standard" && product.id !== "discuss") {
          productsId.push(product.id);
        }
      });


      const bodyData = {
        client_id: 1594,
        currency: state.currency.value,
        product_id: productsId.join(),
        price_rule: state.cart.priceRule
      };

      /* -------------------------- get cart url via API -------------------------- */

      commit("UPDATE_PRICE_STATUS", false);

      fetch("https://pricingapi.cleverbridge.com/prices?" + arrayToParam(bodyData), {
        method: "GET",
        headers: getters.APIHeaders
      })
        .then(res => res.json())
        .then(res => {
          if (res.length > 0) {
            for (const data of res) {
              const items = getters.getItemsById(parseInt(data.product_id));
              if (items.length > 0) {
                for (const item of items) {
                  commit("PRODUCT_UPDATE", {
                    product: item,
                    name: data.product.name,
                    id: data.product_id,
                    price: data.price.net.value
                  });
                }
              }
            }
          }
        })
        .then(() => {
          setTimeout(() => {
            commit("UPDATE_PRICE_STATUS", true);
          }, 300);
        });
    }
  },
  modules: {},
  getters: {
    userIP: state => {
      return state.userIP;
    },
    APIHeaders: state => (needAuth, accept) => {
      accept = accept || "application/json";

      let headers = new Headers();
      headers.append("accept", accept);
      headers.append("content-type", "application/json");

      if (needAuth) {
        headers.append(
          "authorization",
          "Basic " + process.env.VUE_APP_API_TOKEN
        );
      }

      return headers;
    },
    currencyChanging: state => {
      return state.currencyChanging;
    },
    isLoading: state => elementName => {
      return state.loadingStatus[elementName];
    },
    currencyForSelectbox: state => {
      const options = {};

      for (const [key, option] of Object.entries(state.currency.options)) {
        options[key] = option.label;
      }

      return {
        value: state.currency.value,
        options: options
      };
    },
    formattedTotalPrice: (state, getters) => {
      const totalPrice = state.cart.summary.gross;
      return getters.formattedPrice(totalPrice);
    },
    formattedPrice: state => val => {
      val = val || 0;
      return currencyFormatter.format(val, { code: state.currency.value });
    },
    minQty: state => parseInt(state.minQty),
    totalQty: state => {
      return state.products
        .map(item => parseInt(item.qty) || 0)
        .reduce((prev, curr) => prev + curr, 0);
    },
    getProductIds: state => {
      return state.products
        .filter(item => (item.qty > 0 ? 1 : 0))
        .map(item => item.id);
    },
    // TODO : this needs improve = temporary solution
    getProductById: state => id => {
      if (state.products.find(item => item.id === id))
        return state.products.find(item => item.id === id);

      if (state.implementation_services.products.find(item => item.id === id))
        return state.implementation_services.products.find(item => item.id === id);

			if (state.subscriptions.products.find(item => item.id === id))
				return state.subscriptions.products.find(item => item.id === id);

			if (state.support_packages.products.find(item => item.id === id))
				return state.support_packages.products.find(item => item.id === id);
    },
    getItemsById: state => id => {
      const found = [];
      if (state.products.find(item => item.id === id))
        found.push(state.products.find(item => item.id === id));

      if (state.implementation_services.products.find(item => item.id === id))
        found.push(state.implementation_services.products.find(item => item.id === id));

      if (state.subscriptions.products.find(item => item.id === id))
        found.push(state.subscriptions.products.find(item => item.id === id));

			if (state.support_packages.products.find(item => item.id === id))
				return state.support_packages.products.find(item => item.id === id);
      return found;
    },
    // implementation services
    getImplementationServiceByValue: state => value => {
      return state.implementation_services.products.find(
        item => item.value === value
      );
    },
    getImplementationServiceById: state => id => {
      return state.implementation_services.products.find(
        item => item.id === id
      );
    },
    getImplementationServiceValue: state => id => {
      return state.implementation_services.value;
    },
    getImplementationServiceDefaultValue: state => id => {
      return state.implementation_services.default_value;
    },
    // support packages
    getSupportPackageByValue: state => value => {
      return state.support_packages.products.find(item => item.value === value);
    },
    getSupportPackageById: state => id => {
      return state.support_packages.products.find(item => item.id === id);
    },
    getSupportPackageValue: state => id => {
      return state.support_packages.value;
    },
    getSupportPackageDefaultValue: state => id => {
      return state.support_packages.default_value;
    },
    // cloud hostings
    getCloudHostingByValue: state => value => {
      return state.cloud_hostings.products.find(item => item.value === value);
    },
    getCloudHostingById: state => id => {
      return state.cloud_hostings.products.find(item => item.id === id);
    },
    getCloudHostingValue: state => id => {
      return state.cloud_hostings.value;
    },
    getCloudHostingDefaultValue: state => id => {
      return state.cloud_hostings.default_value;
    },
    // subscription length
    getSubscriptionLengthByValue: state => value => {
      return state.subscriptions.products.find(item => item.value === value);
    },
    getSubscriptionLengthById: state => id => {
      return state.subscriptions.products.find(item => item.id === id);
    },
    getSubscriptionLengthValue: state => id => {
      return state.subscriptions.value;
    },
    getSubscriptionLengthDefaultValue: state => id => {
      return state.subscriptions.default_value;
    },
    // training passes
    getTrainingPassByValue: state => value => {
      return state.training_passes.products.find(item => item.value === value);
    },
    getTrainingPassById: state => id => {
      return state.training_passes.products.find(item => item.id === id);
    },
    getTrainingPassValue: state => id => {
      return state.training_passes.value;
    },
    getTrainingPassDefaultValue: state => id => {
      return state.training_passes.default_value;
    },
    countEmptyCompanyFields: state => {
      let empty = 0;
      for (const obj in state.company) {
        if (state.company[obj].value == null) {
          empty++;
        } else {
          if (state.company[obj].blocked === true) {
            empty++;
          }
        }
      }
      return empty;
    },
    getPricerulesByIndustry: state => name => {
      const priceRules = state.priceRules
        .filter(item => {
          if (Array.isArray(item.industry)) {
            return item.industry.includes(name) ? 1 : 0;
          }
          return 0;
        });

      if (priceRules.length > 0) {
        return priceRules[0].rules;
      } else {
        const defaultRules = state.priceRules
          .filter(item => {
            return (item.industry == null) ? 1 : 0;
          });

        return defaultRules[0].rules;
      }
    },
    isEducation: state => {
      return ['K12', 'HigherEducation'].includes(state.company.industry.value);
    },
    getIds: (state, getters) => category => {
      const type = (getters.isEducation) ? 'edu' : 'business';
      return state.ids.find(item => item.category === category)[type];
    }
  }
});