export default {
  terms: {
    acceptTerms:
      'I accept the Terms and Conditions and the Privacy Policy of Gatto Rosa.',
    importantAlert: 'Important Alert',
    termsOfUse: 'TERMS OF USE: ',
    exclusiveUse: '1 - EXCLUSIVE USE FOR LICENSED PROFESSIONALS',
    useGlovesToProcedure: '2 - USE GLOVES DURING THE PROCEDURE',
    notApplySkin: '3 - DO NOT APPLY TO SKIN, PRODUCT DEVELOPED FOR HAIR',
    doTestBeforeUse: '4 - PERFORM A STRAND TEST BEFORE USE',
    notAdviseHouseHoldUse: '5 - NOT RECOMMENDED FOR HOME USE',
    buyPurchasing: '* BY PURCHASING, I CONFIRM I AM A PROFESSIONAL HAIRDRESSER',
    close: 'Close',
  },
  address:
    'Brazilian Beauty Academy Hair School - CNPJ: 09.675.354/0001-00 © All rights reserved. 2023',
  navigation: {
    news: 'News',
    latest: 'Latest',
    categories: 'Categories',
    kits: 'Combos',
    naturalCompound: 'Capsules (Natural Compound)',
    accessories: 'Accessories',
    sales: 'Sales',
    celebrity: 'Blondes',
    diammontLiss: 'Straightening and Sealing',
    hairSpray: 'Hairdos',
    helpTherapy: 'Treatments',
    shower: 'Shampoo Area',
    overdoseColor: 'Colored',
    vibranceCurls: 'Curls',
    wonderLiss: 'Home Care',
    trainningDoll: 'Training Doll',
    books: 'Books',
    scissors: 'Aluminum Foil Roll',
    fiber: 'Fiber',
    test: 'Test',
    diamonds: 'Diamonds',
  },

  footer: {
    contact: {
      title: 'Contact us via WHATSAPP button, or leave your email',
      placeholder: 'Enter your email',
      subscribe: 'Subscribe',
    },
  },

  productItem: {
    buy: 'Buy',
    outOfStock: 'Out of stock',
  },

  profilePage: {
    myOrders: 'My Orders',
    profile: 'Profile',
    out: 'Sign out',
    noOrdersTitle: "You don't have any orders",
    buyNow: 'Buy now',
    order: 'Order',
    status: 'Status',
    unitPrice: 'Unit price',
    quantity: 'Quantity',
    date: 'Date',
  },

  pageNotFound: {
    notFound:
      'The product you entered does not exist or the provided URL is incorrect',
    tryAgain: 'visit our home page',
    home: 'Back to homepage',
  },

  home: {
    news: {
      title: 'News',
    },

    features: {
      treatments: 'Treatments',
    },
  },

  productPage: {
    installments: 'up to {count} of {amount} interest-free',
    variants: 'Select an option:',
  },

  profile: {
    notification: {
      error: {
        title: 'Error',
        content: 'Error fetching user, please try again',
      },
    },
  },

  cart: {
    title: 'My Cart',
    empty: 'Your cart is empty',
    total: 'Total',
    finish: 'Checkout',
    continue: 'Continue Shopping',
    products: {
      title: 'Product',
      quantity: 'Quantity',
      unitPrice: 'Unit Price',
      error: 'Requested quantity is not available in stock.',
    },
    summary: {
      products: 'Products',
      shipping: 'Shipping',
      discount: 'Discount',
      total: 'Total',
    },
    inputs: {
      shipping: {
        title: 'Enter your ZIP code to calculate shipping and delivery time',
        buttonText: 'Calculate',
      },
      discount: {
        title: 'Discount coupon',
        buttonText: 'Add',
      },
    },
    freight: {
      part1: 'Delivery - up to',
      part2: 'business days',
      error:
        'An error occurred while calculating shipping. Please try again later.',
      shippingNationwide: 'Shipping nationwide',
    },

    coupon: {
      invalid: 'Invalid Coupon',
    },
  },

  login: {
    title: 'Login',
    username: 'CPF',
    passLabel: 'Password',
    forgotPassword: 'Forgot my Passcode',
    submit: 'Login',
    register: 'Not a customer yet',
    formValidation: {
      invalidCredentials: 'Invalid username or Passcode',
      serverError: 'Login error',
      requiredUsername: 'CPF is required',
      requiredPassword: 'Password is required',
    },
    requestResetPassword: {
      error: 'Could not send request. Check if the CPF is correct.',
      success: {
        title: 'Request sent successfully',
        content:
          'You will soon receive an email with instructions to reset your Passcode',
      },
    },
  },

  resetPassword: {
    title: 'Recover password',
    document: 'CPF',
    newPassword: 'New password',
    confirmPassword: 'Confirm new password',
    submit: 'Change password',
    formValidation: {
      documentRequired: 'CPF is required',
      requiredNewPassword: 'New password is required',
      requiredConfirmPassword: 'Password confirmation is required',
      passMismatchLabel: 'passwords do not match',
      serverError: 'Error changing password',
    },
    message: {
      error: {
        title: 'Error',
        content: 'Could not reset password. Request a new recovery link.',
      },
      success: {
        title: 'Password changed successfully',
        content: 'You can now log in',
      },
    },
    return: 'Back',
  },

  register: {
    title: 'Sign up',
    username: 'Username',
    name: 'Name',
    email: 'Email',
    document: 'CPF',
    passLabel: 'Password',
    confirmPassword: 'Confirm password',
    phone: 'Phone number',
    submit: 'Register',
    formValidation: {
      requiredUsername: 'Username is required',
      requiredName: 'Name is required',
      requiredEmail: 'Email is required',
      requiredDocument: 'CPF is required',
      requiredPassword: 'password is required',
      passMinLengthLabel: 'password must be at least 6 characters',
      requiredConfirmPassword: 'Password confirmation is required',
      requiredPhone: 'Phone is required',
      invalidDocument: 'Invalid CPF',
      invalidPhone: 'Enter a valid phone number',
      invalidEmail: 'Enter a valid email',
      invalidUsername:
        'Only lowercase letters and numbers, no spaces or special characters',
      passMismatchLabel: 'Passwords do not match',
      serverError: 'Error signing up',
      acceptTerms: 'User must accept the terms and conditions',
    },
    notification: {
      success: {
        title: 'Successfully registered',
        content: 'You can now log in',
      },

      error: {
        title: 'Registration error',
        content: 'Could not register, please check the data and try again',
      },

      validationCoupon: {
        error: {
          title: 'Error',
          contentCoupon:
            'Something went wrong while adding the coupon. Try again',
        },
      },

      validationCep: {
        error: {
          title: 'Error',
          contentFreight:
            'Something went wrong while calculating shipping. Try again later',
          contentStock: 'Requested quantity is not available in stock.',
        },
      },
    },
  },

  userMenu: {
    welcome: 'Hello, {user}',
    visitor: 'visitor',
    myAccount: 'Access my account',
    placeholder: "Type what you're looking for",
    login: 'Login',
    logout: 'Logout',
    or: 'or',
    register: 'Sign up',
  },

  categoryPage: {
    empty: 'No products found',
    totalProducts: '{num} products',
    singleProduct: '01 product',
  },

  search: {
    title: 'Results for: {search}',
    empty: 'No products found',
  },

  checkout: {
    steps: {
      login: 'Login',
      shipping: 'Shipping',
      payment: 'Payment',
      resume: 'Confirmation',
    },
    user: {
      title: 'Personal Information',
      name: 'Name',
      document: 'Document',
      zipcode: 'ZIP Code',
      buttons: {
        edit: 'Edit',
        save: 'Save',
      },
      email: 'Email',
      chooseLanguage: 'Choose the language',
      phone: 'Phone',
      login: {
        part1: 'Please',
        part2: 'log in',
        part3: 'or',
        part4: 'sign up',
        part5: 'to continue',
      },
    },
    shipping: {
      title: 'Shipping Address',
      payment_title: 'Billing Address',
      shipping_is_payment: 'Is billing address same as shipping?',
      shipping_is_payment_yes: 'Yes, it is the same address',
      shipping_is_payment_no: 'Use a different address',
      select_option: 'Select an option',
      form: {
        zipcode: 'ZIP Code',
        search: 'Search',
        country: 'Country',
        state: 'State',
        city: 'City',
        neighborhood: 'Neighborhood',
        street: 'Street',
        number: 'Number',
        complement: 'Complement',
        zipcodeInvalid: 'ZIP Code is empty or invalid.',
        zipcodeRequired: 'ZIP Code is required',
        cepError: 'error',
        couponError: 'error',
        invalidCoupon: 'Invalid coupon',
        countryRequired: 'Country is required',
        stateRequired: 'State is required',
        cityRequired: 'City is required',
        neighborhoodRequired: 'Neighborhood is required',
        streetRequired: 'Street is required',
        numberRequired: 'Number is required',
      },
    },
    payment: {
      title: 'Payment Method',
      credit_card: 'Credit Card',
      credit_card_number: 'Card Number',
      credit_card_name: 'Name on Card',
      credit_card_validate: 'Expiration Date',
      credit_card_cvv: 'CVV',
      installments: 'Installments',
      form: {
        credit_card_number_invalid: 'Invalid card number',
        credit_card_name_invalid: 'Invalid cardholder name',
        credit_card_validateRequired: 'Expiration date is required',
        credit_card_cvv_invalid: 'CVV is required',
        installmentsRequired: 'Installments are required',
        type_document_invalid: 'Document type is required',
        document_number_invalid: 'Document number is required',
      },
    },
    finally: {
      title: 'Order Confirmation',
      quantity: 'Quantity',
    },
    actions: {
      next: 'Next',
      back: 'Back',
      finish: 'Confirm Order',
      home: 'Home',
      change_payment_method: 'Change Payment Method',
    },
  },

  finishCheckout: {
    pending: 'Please wait...',
    pendingDescription: 'Please wait, do not close or refresh the page!',
    description: 'You will soon receive an email with the order details',
    button: 'Back to homepage',
    titleError: 'Error placing the order',
    descriptionError:
      'There was an issue placing your order, check your email and try again shortly',
    buttonError: 'Back to cart',
    pixTitle: 'Your payment is complete',
    cardTitle: 'Your payment is being processed',
  },

  bannerCookies: {
    accept: 'Accept and close',
    message:
      'This website uses cookies to enhance your browsing experience. By continuing to browse the site, you agree to our use of cookies.',
  },

  config: {
    free: 'Free',
  },
}
